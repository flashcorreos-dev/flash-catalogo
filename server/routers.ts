import { COOKIE_NAME } from "@shared/const";
import { ORDER_STATUSES } from "../drizzle/schema";
import { z } from "zod";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { protectedProcedure, publicProcedure, router } from "./_core/trpc";
import { createOrder, getAllOrders, getAllUsersForAdmin, getCatalogProducts, getOrderById, getOrderStatusHistory, getOrdersByUserId, getTrashOrders, permanentlyDeleteOrder, PROTECTED_ADMIN_EMAILS, purgeExpiredDeletedOrders, restoreOrder, softDeleteOrder, updateCatalogProduct, updateOrderStatus, updateUserPhone, updateUserRole } from "./db";
import { TRPCError } from "@trpc/server";
import { notifyOwner } from "./_core/notification";
import { buildPriceListExport } from "./price-list-export";
import { storagePut } from "./storage";

const STATUS_LABELS: Record<string, string> = { pending: "Pendiente", confirmed: "Confirmado", dispatched: "Despachado", completed: "Completado", cancelled: "Cancelado" };

const orderItemSchema = z.object({
  slug: z.string().min(1),
  name: z.string().min(1),
  sku: z.string().min(1),
  variant: z.string().min(1),
  quantity: z.number().int().min(1).max(999),
  unitPrice: z.number().int().min(0),
  image: z.string().min(1),
});

const orderStatusSchema = z.enum(ORDER_STATUSES);
const adminProcedure = protectedProcedure.use(({ ctx, next }) => {
  if (ctx.user.role !== "admin") throw new TRPCError({ code: "FORBIDDEN", message: "Solo los administradores pueden realizar esta acción." });
  return next();
});

function withHistory<T extends { id: number; items: string }>(rows: T[], history: Awaited<ReturnType<typeof getOrderStatusHistory>>) {
  return rows.map(order => ({
    ...order,
    items: JSON.parse(order.items) as z.infer<typeof orderItemSchema>[],
    statusHistory: history.filter(entry => entry.orderId === order.id).reverse(),
  }));
}

export const appRouter = router({
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return { success: true } as const;
    }),
  }),
  profile: router({
    updatePhone: protectedProcedure
      .input(z.object({ phone: z.string().trim().min(8, "Ingresá un celular válido.").max(32) }))
      .mutation(({ ctx, input }) => updateUserPhone(ctx.user.id, input.phone)),
  }),
  users: router({
    adminList: adminProcedure.query(async () => {
      const users = await getAllUsersForAdmin();
      return users.map(user => ({ ...user, protectedAdmin: Boolean(user.email && PROTECTED_ADMIN_EMAILS.includes(user.email.trim().toLowerCase() as (typeof PROTECTED_ADMIN_EMAILS)[number])) }));
    }),
    adminSetRole: adminProcedure
      .input(z.object({ userId: z.number().int().positive(), role: z.enum(["user", "admin"]) }))
      .mutation(async ({ ctx, input }) => {
        const users = await getAllUsersForAdmin();
        const target = users.find(user => user.id === input.userId);
        if (!target) throw new TRPCError({ code: "NOT_FOUND", message: "No encontramos esa cuenta." });
        const protectedAdmin = Boolean(target.email && PROTECTED_ADMIN_EMAILS.includes(target.email.trim().toLowerCase() as (typeof PROTECTED_ADMIN_EMAILS)[number]));
        if (protectedAdmin && input.role !== "admin") throw new TRPCError({ code: "FORBIDDEN", message: "Las tres cuentas administradoras protegidas no pueden perder este rol." });
        if (target.id === ctx.user.id && input.role !== "admin") throw new TRPCError({ code: "FORBIDDEN", message: "No podés quitarte tu propio rol administrador." });
        return updateUserRole(input.userId, input.role);
      }),
  }),
  catalog: router({
    list: publicProcedure.query(() => getCatalogProducts()),
    categories: publicProcedure.query(async () => {
      const categories = new Map<string, string>();
      (await getCatalogProducts()).forEach(product => categories.set(product.categorySlug, product.categoryLabel));
      return Array.from(categories, ([slug, name]) => ({ slug, name }));
    }),
    adminList: adminProcedure.query(() => getCatalogProducts()),
    adminUpdate: adminProcedure
      .input(z.object({ slug: z.string().min(1), name: z.string().min(1), description: z.string(), categorySlug: z.string().min(1), categoryLabel: z.string().min(1), brand: z.string().min(1), image: z.string().min(1), variants: z.array(z.object({ sku: z.string().min(1), label: z.string().min(1), price: z.number().int().min(0), inventory: z.boolean() })), featured: z.boolean() }))
      .mutation(({ input }) => updateCatalogProduct(input)),
    uploadImage: adminProcedure
      .input(z.object({ fileName: z.string().min(1).max(180), contentType: z.string().regex(/^image\/(jpeg|png|webp|gif)$/), base64: z.string().min(1).max(12_000_000) }))
      .mutation(async ({ ctx, input }) => {
        const data = Buffer.from(input.base64.replace(/^data:[^;]+;base64,/, ""), "base64");
        const safeFileName = input.fileName.replace(/[^a-zA-Z0-9._-]/g, "-");
        const upload = await storagePut(`catalog/${ctx.user.id}/${safeFileName}`, data, input.contentType);
        return upload;
      }),
  }),
  orders: router({
    mine: protectedProcedure.query(async ({ ctx }) => {
      const rows = await getOrdersByUserId(ctx.user.id);
      const history = await getOrderStatusHistory(rows.map(order => order.id));
      return withHistory(rows, history);
    }),
    create: protectedProcedure
      .input(z.object({
        items: z.array(orderItemSchema).min(1),
        total: z.number().int().min(1),
        note: z.string().max(1000).optional(),
      }))
      .mutation(async ({ ctx, input }) => {
        if (!ctx.user.phone?.trim()) {
          throw new TRPCError({ code: "PRECONDITION_FAILED", message: "Antes de enviar un pedido, asociá un número de celular desde Ajustes del perfil." });
        }
        const orderCode = `FL-${Date.now().toString(36).toUpperCase()}`;
        const row = await createOrder({
          userId: ctx.user.id,
          orderCode,
          status: "pending",
          total: input.total,
          items: JSON.stringify(input.items),
          note: input.note ?? null,
        });
        try {
          await notifyOwner({
            title: `Nuevo pedido ${orderCode}`,
            content: `${ctx.user.name ?? "Cliente"} envió un pedido por $${input.total.toLocaleString("es-AR")}. Estado: Pendiente.`,
          });
        } catch (notificationError) {
          console.warn("[Orders] Could not notify owner about new order:", notificationError);
        }
        return { ...row, items: input.items, statusHistory: [] };
      }),
    adminList: adminProcedure.query(async () => {
      const rows = await getAllOrders();
      const orderRows = rows.map(row => row.order);
      const history = await getOrderStatusHistory(orderRows.map(order => order.id), true);
      return rows.map(row => ({
        ...withHistory([row.order], history)[0],
        customer: row.customer,
      }));
    }),
    adminUpdateStatus: adminProcedure
      .input(z.object({
        orderId: z.number().int().positive(),
        status: orderStatusSchema,
        note: z.string().max(1000).optional(),
      }))
      .mutation(async ({ ctx, input }) => {
        const updated = await updateOrderStatus(input.orderId, input.status, ctx.user.id, input.note);
        if (!updated) throw new TRPCError({ code: "NOT_FOUND", message: "No encontramos ese pedido." });
        try {
          await notifyOwner({
            title: `Pedido ${updated.orderCode}: ${STATUS_LABELS[input.status] ?? input.status}`,
            content: `${ctx.user.name ?? "Administrador"} cambió el pedido ${updated.orderCode} a ${STATUS_LABELS[input.status] ?? input.status}.${input.note ? ` Nota interna: ${input.note}` : ""}`,
          });
        } catch (notificationError) {
          console.warn("[Orders] Could not notify owner about status change:", notificationError);
        }
        return updated;
      }),
    adminDelete: adminProcedure
      .input(z.object({ orderId: z.number().int().positive() }))
      .mutation(async ({ input }) => {
        await softDeleteOrder(input.orderId);
        return { success: true } as const;
      }),
    adminTrash: adminProcedure.query(async () => {
      await purgeExpiredDeletedOrders();
      return getTrashOrders();
    }),
    adminRestore: adminProcedure
      .input(z.object({ orderId: z.number().int().positive() }))
      .mutation(async ({ input }) => {
        await restoreOrder(input.orderId);
        return { success: true } as const;
      }),
    adminPermanentlyDelete: adminProcedure
      .input(z.object({ orderId: z.number().int().positive() }))
      .mutation(async ({ input }) => {
        await permanentlyDeleteOrder(input.orderId);
        return { success: true } as const;
      }),
    exportPriceList: adminProcedure
      .input(z.object({ orderId: z.number().int().positive() }))
      .mutation(async ({ input }) => {
        const order = await getOrderById(input.orderId);
        if (!order) throw new TRPCError({ code: "NOT_FOUND", message: "No encontramos ese pedido." });
        const items = JSON.parse(order.items) as z.infer<typeof orderItemSchema>[];
        const file = await buildPriceListExport(items);
        return {
          filename: `FLASH-${order.orderCode}-lista-precios.xlsx`,
          contentBase64: Buffer.from(file).toString("base64"),
        };
      }),
  }),
});

export type AppRouter = typeof appRouter;
