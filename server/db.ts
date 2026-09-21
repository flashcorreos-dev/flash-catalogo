import { and, asc, desc, eq, inArray, isNotNull, isNull, lt } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { InsertOrder, InsertUser, catalogProducts as catalogProductsTable, orders, orderStatusHistory, users, type CatalogProductRow, type OrderStatus } from "../drizzle/schema";
import { catalogProducts as defaultCatalogProducts } from "@shared/catalog";
import { ENV } from './_core/env';

let _db: ReturnType<typeof drizzle> | null = null;
export const PROTECTED_ADMIN_EMAILS = ["luisardomorales@hotmail.com", "flashcorreos@gmail.com", "flashcorreos@hotmail.com"] as const;

export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) throw new Error("User openId is required for upsert");
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }
  const values: InsertUser = { openId: user.openId };
  const updateSet: Record<string, unknown> = {};
  const textFields = ["name", "email", "phone", "loginMethod"] as const;
  for (const field of textFields) {
    if (user[field] !== undefined) {
      const value = user[field] ?? null;
      values[field] = value;
      updateSet[field] = value;
    }
  }
  if (user.lastSignedIn !== undefined) {
    values.lastSignedIn = user.lastSignedIn;
    updateSet.lastSignedIn = user.lastSignedIn;
  }
  const normalizedEmail = typeof user.email === "string" ? user.email.trim().toLowerCase() : "";
  if (normalizedEmail && PROTECTED_ADMIN_EMAILS.includes(normalizedEmail as (typeof PROTECTED_ADMIN_EMAILS)[number])) {
    values.role = "admin";
    updateSet.role = "admin";
  } else if (user.role !== undefined) {
    values.role = user.role;
    updateSet.role = user.role;
  } else if (user.openId === ENV.ownerOpenId) {
    values.role = 'admin';
    updateSet.role = 'admin';
  }
  if (!values.lastSignedIn) values.lastSignedIn = new Date();
  if (Object.keys(updateSet).length === 0) updateSet.lastSignedIn = new Date();
  await db.insert(users).values(values).onDuplicateKeyUpdate({ set: updateSet });
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function createOrder(order: InsertOrder) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.insert(orders).values(order);
  const created = await db.select().from(orders).where(eq(orders.orderCode, order.orderCode)).limit(1);
  const createdOrder = created[0];
  if (!createdOrder) throw new Error("Order was not created");
  await db.insert(orderStatusHistory).values({
    orderId: createdOrder.id,
    status: createdOrder.status,
    changedByUserId: createdOrder.userId,
    note: "Pedido enviado por WhatsApp",
    isInternal: false,
  });
  return createdOrder;
}

export async function getOrdersByUserId(userId: number) {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(orders).where(eq(orders.userId, userId)).orderBy(desc(orders.createdAt));
}

export async function getOrderById(orderId: number) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(orders).where(eq(orders.id, orderId)).limit(1);
  return result[0];
}

export async function getUserById(userId: number) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(users).where(eq(users.id, userId)).limit(1);
  return result[0];
}

export async function getAllUsersForAdmin() {
  const db = await getDb();
  if (!db) return [];
  return db.select({ id: users.id, name: users.name, email: users.email, phone: users.phone, role: users.role, createdAt: users.createdAt, lastSignedIn: users.lastSignedIn }).from(users).orderBy(asc(users.name), asc(users.email));
}

export async function updateUserRole(userId: number, role: "user" | "admin") {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.update(users).set({ role }).where(eq(users.id, userId));
  return getUserById(userId);
}

export async function updateUserPhone(userId: number, phone: string) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.update(users).set({ phone }).where(eq(users.id, userId));
  return getUserById(userId);
}

export async function getAllOrders() {
  const db = await getDb();
  if (!db) return [];
  return db.select({ order: orders, customer: { id: users.id, name: users.name, email: users.email, phone: users.phone } })
    .from(orders).where(isNull(orders.deletedAt))
    .leftJoin(users, eq(orders.userId, users.id))
    .orderBy(desc(orders.createdAt));
}

export async function getOrderStatusHistory(orderIds: number[], includeInternal = false) {
  const db = await getDb();
  if (!db || orderIds.length === 0) return [];
  return db.select().from(orderStatusHistory)
    .where(and(inArray(orderStatusHistory.orderId, orderIds), includeInternal ? undefined : eq(orderStatusHistory.isInternal, false)))
    .orderBy(desc(orderStatusHistory.createdAt));
}

export async function updateOrderStatus(orderId: number, status: OrderStatus, changedByUserId: number, note?: string) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.transaction(async tx => {
    await tx.update(orders).set({ status }).where(eq(orders.id, orderId));
    await tx.insert(orderStatusHistory).values({
      orderId,
      status,
      changedByUserId,
      note: note?.trim() || null,
      isInternal: true,
    });
  });
  const updated = await db.select().from(orders).where(eq(orders.id, orderId)).limit(1);
  return updated[0];
}

function toCatalogProduct(row: CatalogProductRow) {
  return { slug: row.slug, name: row.name, description: row.description, categorySlug: row.categorySlug, categoryLabel: row.categoryLabel, brand: row.brand, image: row.image, variants: JSON.parse(row.variants), featured: row.featured };
}

async function seedCatalog(db: Awaited<ReturnType<typeof getDb>>) {
  if (!db) return [];
  const existing = await db.select().from(catalogProductsTable).orderBy(asc(catalogProductsTable.id));
  if (existing.length > 0) return existing;
  await db.insert(catalogProductsTable).values(defaultCatalogProducts.map((product, index) => ({ slug: product.slug, name: product.name, description: product.description, categorySlug: product.categorySlug, categoryLabel: product.categoryLabel, brand: product.brand, image: product.image, variants: JSON.stringify(product.variants), featured: index < 4 })));
  return db.select().from(catalogProductsTable).orderBy(asc(catalogProductsTable.id));
}

export async function getCatalogProducts() {
  const db = await getDb();
  if (!db) return defaultCatalogProducts.map((product, index) => ({ ...product, featured: index < 4 }));
  const rows = await seedCatalog(db);
  return rows.sort((a, b) => Number(b.featured) - Number(a.featured) || a.id - b.id).map(toCatalogProduct);
}

export async function updateCatalogProduct(input: { slug: string; name: string; description: string; categorySlug: string; categoryLabel: string; brand: string; image: string; variants: unknown[]; featured: boolean }) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.update(catalogProductsTable).set({ name: input.name, description: input.description, categorySlug: input.categorySlug, categoryLabel: input.categoryLabel, brand: input.brand, image: input.image, variants: JSON.stringify(input.variants), featured: input.featured }).where(eq(catalogProductsTable.slug, input.slug));
  const rows = await db.select().from(catalogProductsTable).where(eq(catalogProductsTable.slug, input.slug)).limit(1);
  return rows[0] ? toCatalogProduct(rows[0]) : undefined;
}

export async function getTrashOrders() {
  const db = await getDb();
  if (!db) return [];
  return db.select({ order: orders, customer: { id: users.id, name: users.name, email: users.email, phone: users.phone } })
    .from(orders).where(isNotNull(orders.deletedAt))
    .leftJoin(users, eq(orders.userId, users.id))
    .orderBy(desc(orders.deletedAt));
}

export async function softDeleteOrder(orderId: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.update(orders).set({ deletedAt: new Date() }).where(eq(orders.id, orderId));
}

export async function restoreOrder(orderId: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.update(orders).set({ deletedAt: null }).where(eq(orders.id, orderId));
}

export async function permanentlyDeleteOrder(orderId: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.transaction(async tx => {
    await tx.delete(orderStatusHistory).where(eq(orderStatusHistory.orderId, orderId));
    await tx.delete(orders).where(eq(orders.id, orderId));
  });
}

export async function purgeExpiredDeletedOrders() {
  const db = await getDb();
  if (!db) return 0;
  const cutoff = new Date(Date.now() - 14 * 24 * 60 * 60 * 1000);
  const expired = await db.select({ id: orders.id }).from(orders).where(and(isNotNull(orders.deletedAt), lt(orders.deletedAt, cutoff)));
  if (expired.length === 0) return 0;
  const ids = expired.map(order => order.id);
  await db.transaction(async tx => {
    await tx.delete(orderStatusHistory).where(inArray(orderStatusHistory.orderId, ids));
    await tx.delete(orders).where(inArray(orders.id, ids));
  });
  return ids.length;
}
