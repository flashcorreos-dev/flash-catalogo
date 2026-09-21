import { ArrowRight, CheckCircle2, ChevronDown, Clock3, ExternalLink, FileText, LogOut, Mail, Package, Phone, RefreshCw, Settings, ShieldCheck, UserRound } from "lucide-react";
import { useState, type FormEvent } from "react";
import { startLogin } from "@/const";
import { useAuth } from "@/_core/hooks/useAuth";
import { trpc } from "@/lib/trpc";
import { formatARS } from "@/components/ProductCard";
import { Link } from "wouter";
import { toast } from "sonner";

const statusLabel: Record<string, string> = { pending: "Pendiente", confirmed: "Confirmado", dispatched: "Despachado", completed: "Completado", cancelled: "Cancelado" };
const statusTone: Record<string, string> = { pending: "status-pending", confirmed: "status-confirmed", dispatched: "status-dispatched", completed: "status-completed", cancelled: "status-cancelled" };
const formatDate = (value: Date | string) => new Date(value).toLocaleString("es-AR", { dateStyle: "long", timeStyle: "short" });

function StatusBadge({ status }: { status: string }) {
  return <span className={`status-chip ${statusTone[status] ?? "status-pending"}`}><CheckCircle2 size={12} /> {statusLabel[status] ?? status}</span>;
}

export default function Account() {
  const { user, loading, isAuthenticated, logout } = useAuth();
  const { data: orders = [], isLoading: ordersLoading } = trpc.orders.mine.useQuery(undefined, { enabled: isAuthenticated });
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);
  const [section, setSection] = useState<"orders" | "settings">("orders");

  if (loading) return <section className="mx-auto max-w-[1280px] px-4 py-24 text-center"><div className="mx-auto h-10 w-10 animate-pulse rounded-full bg-[#dce8b1]" /><p className="mt-4 text-sm text-[#778177]">Cargando tu cuenta...</p></section>;
  if (!isAuthenticated) return <section className="mx-auto max-w-[1280px] px-4 py-16 sm:px-6 lg:px-8"><div className="account-login"><div className="account-login-mark"><UserRound size={28} /></div><p className="eyebrow">Área de clientes</p><h1 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">Tus pedidos,<br /><em className="text-[#6e8b1d]">siempre a mano.</em></h1><p className="mx-auto mt-5 max-w-md text-sm leading-relaxed text-[#778177]">Ingresá con tu cuenta para consultar transacciones, guardar pedidos y volver a pedir más rápido.</p><button onClick={startLogin} className="cta-dark mt-8">Ingresar o crear cuenta <ArrowRight size={16} /></button><button onClick={startLogin} className="mt-5 inline-flex items-center gap-2 text-xs font-bold text-[#6e8b1d] hover:underline"><RefreshCw size={13} /> ¿Olvidaste tu acceso? Recuperar cuenta</button><p className="mt-4 text-[11px] text-[#9aa39b]">El acceso, correo y contraseña se protegen mediante el proveedor seguro de autenticación.</p></div></section>;

  return <section className="mx-auto max-w-[1280px] px-4 pb-16 pt-12 sm:px-6 lg:px-8 lg:pt-16">
    <div className="account-header"><div><p className="eyebrow">Mi cuenta</p><h1 className="mt-2 text-4xl font-semibold tracking-tight">Hola, {user?.name?.split(" ")[0] ?? "cliente"}.</h1><p className="mt-3 text-sm text-[#778177]">Administrá tus pedidos y consultá cada etapa de preparación y entrega.</p></div><div className="flex items-center gap-4"><>{user?.role === "admin" && <Link href="/admin"><span className="link-arrow">Panel admin <ArrowRight size={14} /></span></Link>}</><button onClick={() => void logout()} className="logout-button"><LogOut size={15} /> Cerrar sesión</button></div></div>
    <div className="account-tabs"><button onClick={() => setSection("orders")} className={section === "orders" ? "account-tab account-tab-active" : "account-tab"}><FileText size={15} /> Historial de pedidos</button><button onClick={() => setSection("settings")} className={section === "settings" ? "account-tab account-tab-active" : "account-tab"}><Settings size={15} /> Ajustes del perfil</button></div>
    {section === "settings" ? <SettingsPanel user={user} /> : <>
      <div className="mt-8 grid gap-4 sm:grid-cols-3"><div className="account-stat"><span>Pedidos enviados</span><strong>{orders.length}</strong></div><div className="account-stat"><span>Estado actual</span><strong className="mt-3"><StatusBadge status={orders[0]?.status ?? "pending"} /></strong></div><div className="account-stat"><span>Email de cuenta</span><strong className="truncate text-base">{user?.email ?? "—"}</strong></div></div>
      <div className="mt-12 flex items-end justify-between"><div><p className="eyebrow">Actividad</p><h2 className="mt-2 text-2xl font-semibold">Historial de pedidos</h2></div><Link href="/productos"><span className="link-arrow">Nuevo pedido <ArrowRight size={15} /></span></Link></div>
      {ordersLoading ? <div className="mt-6 h-48 animate-pulse rounded-3xl bg-[#e9eee5]" /> : orders.length === 0 ? <div className="empty-state mt-6"><Package size={26} /><h2>Todavía no hay pedidos</h2><p>Tu próximo pedido enviado por WhatsApp va a aparecer acá.</p><Link href="/productos"><span className="cta-dark">Explorar catálogo</span></Link></div> : <div className="mt-6 space-y-4">{orders.map(order => <OrderDetail key={order.orderCode} order={order} expanded={expandedOrder === order.orderCode} onToggle={() => setExpandedOrder(expandedOrder === order.orderCode ? null : order.orderCode)} />)}</div>}
    </>}
  </section>;
}

function OrderDetail({ order, expanded, onToggle }: { order: any; expanded: boolean; onToggle: () => void }) {
  const itemTotal = order.items.reduce((sum: number, item: { quantity: number; unitPrice: number }) => sum + item.quantity * item.unitPrice, 0);
  return <article className="order-detail"><div className="order-row order-row-main"><div className="flex min-w-0 items-start gap-4"><div className="order-icon"><Package size={19} /></div><div className="min-w-0"><div className="flex flex-wrap items-center gap-2"><h3 className="font-semibold">Pedido {order.orderCode}</h3><StatusBadge status={order.status} /></div><p className="mt-1 text-xs text-[#8b958c]">{formatDate(order.createdAt)} · {order.items.length} {order.items.length === 1 ? "línea" : "líneas"}</p><div className="mt-4 flex flex-wrap gap-2">{order.items.slice(0, 3).map((item: { sku: string; quantity: number; name: string }) => <span key={item.sku} className="order-item-chip">{item.quantity} × {item.name}</span>)}{order.items.length > 3 && <span className="order-item-chip">+{order.items.length - 3} más</span>}</div></div></div><div className="flex items-center gap-4 text-right"><div><p className="text-[10px] uppercase tracking-[.12em] text-[#929c93]">Total estimado</p><strong className="text-lg">{formatARS(order.total)}</strong></div><button onClick={onToggle} className="detail-toggle">{expanded ? "Ocultar" : "Ver detalle"}<ChevronDown size={15} className={expanded ? "rotate-180" : ""} /></button></div></div>{expanded && <div className="order-expanded"><div className="transaction-meta"><div><span>Código de compra</span><strong>{order.orderCode}</strong></div><div><span>Fecha de creación</span><strong>{formatDate(order.createdAt)}</strong></div><div><span>Última actualización</span><strong>{formatDate(order.updatedAt)}</strong></div><div><span>Estado actual</span><StatusBadge status={order.status} /></div></div><div className="status-timeline"><div><p className="eyebrow">Seguimiento</p><h4>Historial de estados</h4></div>{order.statusHistory?.length ? <div className="status-timeline-list">{order.statusHistory.map((entry: { id: number; status: string; note?: string | null; createdAt: Date | string }) => <div className="status-timeline-item" key={entry.id}><span className={`status-timeline-dot ${statusTone[entry.status] ?? "status-pending"}`} /><div><div className="flex flex-wrap items-center gap-2"><StatusBadge status={entry.status} /><time>{formatDate(entry.createdAt)}</time></div>{entry.note && <p>{entry.note}</p>}</div></div>)}</div> : <p className="status-history-empty">Todavía no hay cambios registrados para este pedido.</p>}</div><div className="order-items-table"><div className="order-table-head"><span>Producto y variante</span><span>Precio unitario</span><span>Cantidad</span><span>Subtotal</span></div>{order.items.map((item: { sku: string; name: string; variant: string; unitPrice: number; quantity: number }) => <div className="order-table-row" key={item.sku}><div><strong>{item.name}</strong><small>{item.variant}</small><small>ART. {item.variant.split(" - ")[0] ?? item.sku}</small></div><span>{formatARS(item.unitPrice)}</span><span>{item.quantity}</span><strong>{formatARS(item.unitPrice * item.quantity)}</strong></div>)}<div className="order-table-total"><span>Total de artículos</span><strong>{formatARS(itemTotal)}</strong></div></div>{order.note && <p className="order-note">Nota del pedido: {order.note}</p>}<p className="order-disclaimer"><Clock3 size={14} /> El estado se actualiza cuando FLASH confirma, despacha o completa tu pedido.</p></div>}</article>;
}

function SettingsPanel({ user }: { user: { name?: string | null; email?: string | null; phone?: string | null } | null }) {
  const [phone, setPhone] = useState(user?.phone ?? "");
  const updatePhone = trpc.profile.updatePhone.useMutation();
  const utils = trpc.useUtils();
  const savePhone = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      await updatePhone.mutateAsync({ phone: phone.trim() });
      await utils.auth.me.invalidate();
      toast.success("Celular guardado");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "No pudimos guardar el celular.");
    }
  };
  return <div className="settings-panel"><div className="settings-intro"><div className="account-login-mark"><ShieldCheck size={26} /></div><div><p className="eyebrow">Seguridad de la cuenta</p><h2 className="mt-1 text-2xl font-semibold">Ajustes de acceso</h2><p className="mt-2 max-w-xl text-sm leading-relaxed text-[#778177]">Tu correo y contraseña se gestionan en el proveedor seguro de autenticación. Desde allí podés actualizar tus datos o recuperar la cuenta si no recordás tus credenciales.</p></div></div><div className="settings-fields"><div className="settings-field"><UserRound size={17} /><div><span>Nombre</span><strong>{user?.name ?? "Sin nombre configurado"}</strong></div></div><div className="settings-field"><Mail size={17} /><div><span>Correo de acceso</span><strong>{user?.email ?? "Sin correo configurado"}</strong></div></div></div><form onSubmit={savePhone} className="profile-phone-form"><label htmlFor="profile-phone"><Phone size={17} /><span><strong>Celular para WhatsApp</strong><small>Obligatorio para guardar y recibir seguimiento de pedidos.</small></span></label><div className="profile-phone-controls"><input id="profile-phone" type="tel" required minLength={8} value={phone} onChange={event => setPhone(event.target.value)} placeholder="Ej. +54 9 11 7253-1714" /><button type="submit" className="cta-dark" disabled={updatePhone.isPending}>{updatePhone.isPending ? "Guardando..." : "Guardar celular"}</button></div></form><div className="settings-actions"><button onClick={startLogin} className="cta-dark"><ExternalLink size={16} /> Gestionar correo y contraseña</button><button onClick={startLogin} className="settings-recovery"><RefreshCw size={15} /> Recuperar cuenta</button></div><p className="settings-footnote">Por seguridad, FLASH no almacena ni modifica contraseñas directamente.</p></div>;
}
