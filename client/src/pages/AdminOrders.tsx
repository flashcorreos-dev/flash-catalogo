import { CheckCircle2, Clock3, Copy, Download, ExternalLink, MessageCircle, Package, Plus, RefreshCw, RotateCcw, Search, ShieldCheck, Trash2, X } from "lucide-react";
import { useMemo, useState } from "react";
import { Link } from "wouter";
import { startLogin } from "@/const";
import { useAuth } from "@/_core/hooks/useAuth";
import { trpc } from "@/lib/trpc";
import { formatARS } from "@/components/ProductCard";
import { toast } from "sonner";
import { makeWhatsAppUrl } from "@/components/StorefrontLayout";

type AdminItem = { sku: string; name: string; variant: string; quantity: number; unitPrice: number };
type MessageProduct = { name: string; quantity: string };
const STATUS_OPTIONS = [["pending", "Pendiente"], ["confirmed", "Confirmado"], ["dispatched", "Despachado"], ["completed", "Completado"], ["cancelled", "Cancelado"]] as const;
const statusLabel: Record<string, string> = Object.fromEntries(STATUS_OPTIONS);
const statusTone: Record<string, string> = { pending: "status-pending", confirmed: "status-confirmed", dispatched: "status-dispatched", completed: "status-completed", cancelled: "status-cancelled" };
const formatDate = (value: Date | string) => new Date(value).toLocaleString("es-AR", { dateStyle: "medium", timeStyle: "short" });
const formatTotal = (value: number | string) => `ARS ${typeof value === "number" ? formatARS(value) : value.replace(/^ARS\s*/i, "")}`;
const MESSAGE_TEMPLATES: Record<string, (data: { name: string; code: string; total: string; detail: string }) => string> = {
  pending: data => `Hola ${data.name}, recibimos tu pedido ${data.code}. Lo estamos revisando y te confirmaremos los detalles antes de solicitar cualquier pago.`,
  confirmed: data => `Hola ${data.name}, tu pedido ${data.code} fue confirmado. Detalle: ${data.detail}. Total estimado: ${data.total}. Ahora podés avanzar con el pago por los medios que te brindaremos. ¡Gracias por confiar en FLASH!`,
  dispatched: data => `Hola ${data.name}, tu pedido ${data.code} ya fue despachado. Total: ${data.total}. Te avisaremos cualquier novedad de la entrega. ¡Gracias por confiar en FLASH!`,
  completed: data => `Hola ${data.name}, damos por completado tu pedido ${data.code}. Esperamos que disfrutes tu compra. ¡Gracias por confiar en FLASH!`,
  cancelled: data => `Hola ${data.name}, tu pedido ${data.code} fue cancelado. No realices ningún pago por este pedido. Si necesitás ayuda, estamos a disposición.`,
};

function getItems(value: unknown): AdminItem[] {
  try { return Array.isArray(value) ? value as AdminItem[] : JSON.parse(String(value)) as AdminItem[]; } catch { return []; }
}

function StatusBadge({ status }: { status: string }) {
  return <span className={`status-chip ${statusTone[status] ?? "status-pending"}`}><CheckCircle2 size={12} /> {statusLabel[status] ?? status}</span>;
}

function CopyField({ label, value }: { label: string; value: string }) {
  const copy = async () => {
    if (!value || value === "—") return toast.info(`No hay ${label.toLowerCase()} para copiar.`);
    await navigator.clipboard.writeText(value);
    toast.success(`${label} copiado`);
  };
  return <div className="admin-copy-field"><span>{label}</span><strong title={value}>{value || "—"}</strong><button type="button" aria-label={`Copiar ${label}`} onClick={() => void copy()}><Copy size={13} /></button></div>;
}

export default function AdminOrders() {
  const { user, loading } = useAuth();
  const isAdmin = user?.role === "admin";
  const { data: orders = [], isLoading, error, refetch } = trpc.orders.adminList.useQuery(undefined, { enabled: isAdmin });
  const [showTrash, setShowTrash] = useState(false);
  const { data: trashOrders = [], isLoading: trashLoading } = trpc.orders.adminTrash.useQuery(undefined, { enabled: isAdmin && showTrash });
  const updateStatus = trpc.orders.adminUpdateStatus.useMutation();
  const deleteOrder = trpc.orders.adminDelete.useMutation();
  const restoreOrder = trpc.orders.adminRestore.useMutation();
  const permanentlyDeleteOrder = trpc.orders.adminPermanentlyDelete.useMutation();
  const exportPriceList = trpc.orders.exportPriceList.useMutation();
  const utils = trpc.useUtils();
  const [drafts, setDrafts] = useState<Record<number, string>>({});
  const [notes, setNotes] = useState<Record<number, string>>({});
  const [statusFilter, setStatusFilter] = useState("all");
  const [customerQuery, setCustomerQuery] = useState("");
  const [orderCodeQuery, setOrderCodeQuery] = useState("");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [messageData, setMessageData] = useState({ name: "", email: "", phone: "", code: "", total: "" });
  const [messageProducts, setMessageProducts] = useState<MessageProduct[]>([{ name: "", quantity: "1" }]);
  const [messageStatus, setMessageStatus] = useState("confirmed");

  const filteredOrders = useMemo(() => {
    const query = customerQuery.trim().toLowerCase();
    return orders.filter(order => {
      const customer = `${order.customer?.name ?? ""} ${order.customer?.email ?? ""} ${order.customer?.phone ?? ""}`.toLowerCase();
      const code = order.orderCode.toLowerCase();
      const created = new Date(order.createdAt).toISOString().slice(0, 10);
      return (statusFilter === "all" || order.status === statusFilter) && (!query || customer.includes(query)) && (!orderCodeQuery.trim() || code.includes(orderCodeQuery.trim().toLowerCase())) && (!dateFrom || created >= dateFrom) && (!dateTo || created <= dateTo);
    });
  }, [orders, statusFilter, customerQuery, orderCodeQuery, dateFrom, dateTo]);

  const clearFilters = () => { setStatusFilter("all"); setCustomerQuery(""); setOrderCodeQuery(""); setDateFrom(""); setDateTo(""); };
  const hasFilters = statusFilter !== "all" || customerQuery || orderCodeQuery || dateFrom || dateTo;

  if (loading) return <div className="admin-loading"><RefreshCw className="animate-spin" size={20} /> Cargando panel...</div>;
  if (!user) return <div className="admin-gate"><ShieldCheck size={28} /><h1>Panel de administración</h1><p>Iniciá sesión para continuar.</p><button onClick={startLogin} className="cta-dark">Ingresar <ExternalLink size={15} /></button></div>;
  if (!isAdmin) return <div className="admin-gate"><ShieldCheck size={28} /><h1>Acceso restringido</h1><p>Esta sección está disponible únicamente para administradores.</p><Link href="/"><span className="cta-dark">Volver al catálogo</span></Link></div>;

  const saveStatus = async (orderId: number, currentStatus: string) => {
    const nextStatus = drafts[orderId] ?? currentStatus;
    if (nextStatus === currentStatus && !notes[orderId]?.trim()) return toast.info("El pedido ya tiene ese estado.");
    try {
      await updateStatus.mutateAsync({ orderId, status: nextStatus as typeof STATUS_OPTIONS[number][0], note: notes[orderId] || undefined });
      await utils.orders.adminList.invalidate();
      setNotes(current => ({ ...current, [orderId]: "" }));
      toast.success("Estado del pedido actualizado");
    } catch (updateError) { toast.error(updateError instanceof Error ? updateError.message : "No pudimos actualizar el pedido."); }
  };

  const exportOrder = async (orderId: number) => {
    try {
      const file = await exportPriceList.mutateAsync({ orderId });
      const link = document.createElement("a");
      link.href = `data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,${file.contentBase64}`;
      link.download = file.filename;
      document.body.appendChild(link); link.click(); link.remove();
      toast.success("Lista de precios exportada");
    } catch (exportError) { toast.error(exportError instanceof Error ? exportError.message : "No pudimos exportar la lista."); }
  };

  const removeOrder = async (orderId: number, orderCode: string) => {
    if (!window.confirm(`¿Eliminar definitivamente el pedido ${orderCode}? También se borrará su historial de estados.`)) return;
    try {
      await deleteOrder.mutateAsync({ orderId });
      await utils.orders.adminList.invalidate();
      toast.success(`Pedido ${orderCode} eliminado`);
    } catch (deleteError) { toast.error(deleteError instanceof Error ? deleteError.message : "No pudimos eliminar el pedido."); }
  };

  const restoreDeletedOrder = async (orderId: number, orderCode: string) => {
    try {
      await restoreOrder.mutateAsync({ orderId });
      await utils.orders.adminList.invalidate();
      await utils.orders.adminTrash.invalidate();
      toast.success(`Pedido ${orderCode} restaurado`);
    } catch (restoreError) { toast.error(restoreError instanceof Error ? restoreError.message : "No pudimos restaurar el pedido."); }
  };

  const permanentlyRemoveOrder = async (orderId: number, orderCode: string) => {
    if (!window.confirm(`¿Borrar definitivamente el pedido ${orderCode}? Esta acción no se puede deshacer.`)) return;
    try {
      await permanentlyDeleteOrder.mutateAsync({ orderId });
      await utils.orders.adminTrash.invalidate();
      toast.success(`Pedido ${orderCode} borrado definitivamente`);
    } catch (deleteError) { toast.error(deleteError instanceof Error ? deleteError.message : "No pudimos borrar definitivamente el pedido."); }
  };

  const loadOrderIntoComposer = (order: (typeof orders)[number]) => {
    const items = getItems(order.items);
    setMessageData({ name: order.customer?.name ?? "", email: order.customer?.email ?? "", phone: order.customer?.phone ?? "", code: order.orderCode, total: formatTotal(order.total) });
    setMessageProducts(items.length ? items.map(item => ({ name: `${item.name} · ${item.variant}`, quantity: String(item.quantity) })) : [{ name: "", quantity: "1" }]);
    setMessageStatus(order.status);
    toast.success(`Pedido ${order.orderCode} cargado en el mensajeador`);
  };
  const updateProduct = (index: number, field: keyof MessageProduct, value: string) => setMessageProducts(current => current.map((product, productIndex) => productIndex === index ? { ...product, [field]: value } : product));
  const addProductRow = () => setMessageProducts(current => [...current, { name: "", quantity: "1" }]);
  const removeProductRow = (index: number) => setMessageProducts(current => current.length === 1 ? current : current.filter((_, productIndex) => productIndex !== index));
  const detail = messageProducts.filter(product => product.name.trim()).map(product => `${product.name.trim()} x ${product.quantity || "1"}`).join(", ") || "el pedido solicitado";
  const generatedMessage = MESSAGE_TEMPLATES[messageStatus]( { ...messageData, detail } );
  const copyGeneratedMessage = async () => { await navigator.clipboard.writeText(generatedMessage); toast.success("Mensaje copiado al portapapeles"); };
  const openGeneratedMessage = () => {
    if (!messageData.phone.trim()) return toast.error("Cargá un celular para abrir WhatsApp.");
    window.open(makeWhatsAppUrl(generatedMessage, messageData.phone), "_blank", "noopener,noreferrer");
  };

  const pendingCount = orders.filter(order => order.status === "pending").length;
  const dispatchedCount = orders.filter(order => order.status === "dispatched").length;
  const completedCount = orders.filter(order => order.status === "completed").length;

  return <section className="admin-page">
    <div className="admin-page-header"><div><p className="eyebrow">FLASH · Administración</p><h1>Pedidos y estados</h1><p>Gestioná cada pedido, copiá sus datos y prepará mensajes por WhatsApp.</p></div><div className="admin-header-actions"><button onClick={() => void refetch()} className="admin-refresh"><RefreshCw size={15} /> Actualizar</button><Link href="/"><span className="admin-store-link">Ver catálogo <ExternalLink size={14} /></span></Link></div></div>
    <div className="admin-stat-grid"><button type="button" className={statusFilter === "all" && !hasFilters ? "admin-stat-card admin-stat-card-active" : "admin-stat-card"} onClick={clearFilters}><span>Total de pedidos</span><strong>{orders.length}</strong></button><button type="button" className={statusFilter === "pending" ? "admin-stat-card admin-stat-card-active" : "admin-stat-card"} onClick={() => setStatusFilter("pending")}><span>Pendientes</span><strong>{pendingCount}</strong></button><button type="button" className={statusFilter === "dispatched" ? "admin-stat-card admin-stat-card-active" : "admin-stat-card"} onClick={() => setStatusFilter("dispatched")}><span>Despachados</span><strong>{dispatchedCount}</strong></button><button type="button" className={statusFilter === "completed" ? "admin-stat-card admin-stat-card-active" : "admin-stat-card"} onClick={() => setStatusFilter("completed")}><span>Completados</span><strong>{completedCount}</strong></button></div>
    <div className="admin-filters"><div className="admin-filter-heading"><div><p className="eyebrow">Búsqueda rápida</p><h2>Encontrar un pedido</h2></div>{hasFilters && <button type="button" onClick={clearFilters} className="admin-clear-filters"><X size={14} /> Limpiar filtros</button>}</div><div className="admin-filter-fields"><label className="admin-search-field"><span>Cliente</span><div><Search size={15} /><input value={customerQuery} onChange={event => setCustomerQuery(event.target.value)} placeholder="Nombre, email o celular" /></div></label><label className="admin-search-field"><span>Código de compra</span><div><Search size={15} /><input value={orderCodeQuery} onChange={event => setOrderCodeQuery(event.target.value)} placeholder="Ej. FL-ABC123" /></div></label><label><span>Estado</span><select value={statusFilter} onChange={event => setStatusFilter(event.target.value)}><option value="all">Todos los estados</option>{STATUS_OPTIONS.map(([value, label]) => <option value={value} key={value}>{label}</option>)}</select></label><label><span>Desde</span><input type="date" value={dateFrom} onChange={event => setDateFrom(event.target.value)} /></label><label><span>Hasta</span><input type="date" value={dateTo} onChange={event => setDateTo(event.target.value)} /></label></div><p className="admin-filter-result">Mostrando <strong>{filteredOrders.length}</strong> de {orders.length} pedidos</p></div>
    <section className="admin-trash-panel"><div className="admin-trash-heading"><div><p className="eyebrow">Respaldo temporal</p><h2>Papelera de pedidos</h2><p>Los pedidos eliminados se conservan durante 14 días antes de borrarse definitivamente.</p></div><button type="button" className="admin-trash-toggle" onClick={() => setShowTrash(current => !current)}><Trash2 size={14} /> {showTrash ? "Ocultar papelera" : "Ver papelera"}</button></div>{showTrash && (trashLoading ? <div className="admin-trash-empty"><RefreshCw className="animate-spin" size={18} /> Revisando papelera...</div> : trashOrders.length === 0 ? <div className="admin-trash-empty"><Trash2 size={20} /><span>La papelera está vacía.</span></div> : <div className="admin-trash-list">{trashOrders.map(({ order, customer }) => { const expiresAt = order.deletedAt ? new Date(new Date(order.deletedAt).getTime() + 14 * 24 * 60 * 60 * 1000) : null; return <div className="admin-trash-row" key={order.id}><div><strong>{order.orderCode}</strong><span>{customer?.name || "Cliente sin nombre"} · {formatTotal(order.total)}</span><small>Eliminado: {order.deletedAt ? formatDate(order.deletedAt) : "—"} · Vence: {expiresAt ? formatDate(expiresAt) : "—"}</small></div><button type="button" className="admin-restore-order" onClick={() => void restoreDeletedOrder(order.id, order.orderCode)} disabled={restoreOrder.isPending}><RotateCcw size={14} /> Restaurar</button><button type="button" className="admin-permanent-delete-order" onClick={() => void permanentlyRemoveOrder(order.id, order.orderCode)} disabled={permanentlyDeleteOrder.isPending}><Trash2 size={14} /> Borrar definitivamente</button></div>; })}</div>)}</section>
    <section className="admin-message-composer"><div><p className="eyebrow">Mensajes rápidos</p><h2>Generar mensaje para el cliente</h2><p>Cargá un pedido o completá los campos. El botón de WhatsApp usará el celular de este recuadro.</p></div><div className="admin-message-fields"><label><span>Nombre del cliente</span><input value={messageData.name} onChange={event => setMessageData(current => ({ ...current, name: event.target.value }))} placeholder="Ej. Ana García" /></label><label><span>Email</span><input value={messageData.email} onChange={event => setMessageData(current => ({ ...current, email: event.target.value }))} placeholder="cliente@correo.com" /></label><label><span>Celular WhatsApp</span><input type="tel" value={messageData.phone} onChange={event => setMessageData(current => ({ ...current, phone: event.target.value }))} placeholder="+54 9 11..." /></label><label><span>Código de compra</span><input value={messageData.code} onChange={event => setMessageData(current => ({ ...current, code: event.target.value }))} placeholder="Ej. FL-ABC123" /></label><label><span>Total estimado</span><input value={messageData.total} onChange={event => setMessageData(current => ({ ...current, total: event.target.value }))} placeholder="ARS $52.100" /></label><label><span>Estado del mensaje</span><select value={messageStatus} onChange={event => setMessageStatus(event.target.value)}>{STATUS_OPTIONS.map(([value, label]) => <option value={value} key={value}>{label}</option>)}</select></label></div><div className="admin-message-products"><div className="admin-message-products-heading"><div><span>Detalle de la compra</span><small>Agregá o quitá una fila por producto.</small></div><button type="button" className="admin-add-product" onClick={addProductRow}><Plus size={14} /> Agregar producto</button></div>{messageProducts.map((product, index) => <div className="admin-message-product-row" key={`message-product-${index}`}><span className="admin-message-product-number">{index + 1}</span><input aria-label={`Producto ${index + 1}`} value={product.name} onChange={event => updateProduct(index, "name", event.target.value)} placeholder="Nombre y variante del producto" /><input aria-label={`Cantidad del producto ${index + 1}`} type="number" min="1" value={product.quantity} onChange={event => updateProduct(index, "quantity", event.target.value)} placeholder="Cant." /><button type="button" aria-label={`Quitar producto ${index + 1}`} onClick={() => removeProductRow(index)} disabled={messageProducts.length === 1}><Trash2 size={14} /></button></div>)}</div><div className="admin-message-preview">{generatedMessage}</div><div className="admin-message-actions"><button type="button" className="admin-export-button" onClick={() => void copyGeneratedMessage()}><Copy size={14} /> Copiar mensaje</button><button type="button" className="admin-save-button" onClick={openGeneratedMessage}><MessageCircle size={14} /> Abrir WhatsApp</button></div></section>
    {isLoading ? <div className="admin-empty"><RefreshCw className="animate-spin" size={20} /> Cargando pedidos...</div> : error ? <div className="admin-empty"><p>No pudimos cargar los pedidos.</p><button onClick={() => void refetch()} className="cta-dark">Reintentar</button></div> : filteredOrders.length === 0 ? <div className="admin-empty"><Package size={26} /><h2>{orders.length ? "No hay coincidencias" : "Aún no hay pedidos"}</h2><p>{orders.length ? "Probá cambiar el estado, cliente o rango de fechas." : "Los pedidos enviados por clientes aparecerán aquí."}</p>{orders.length > 0 && <button onClick={clearFilters} className="cta-dark">Ver todos</button>}</div> : <div className="admin-order-list">{filteredOrders.map(order => { const items = getItems(order.items); const selectedStatus = drafts[order.id] ?? order.status; return <article className="admin-order-card" key={order.id}><div className="admin-order-top"><div className="flex min-w-0 items-start gap-3"><div className="order-icon"><Package size={18} /></div><div className="min-w-0"><div className="flex flex-wrap items-center gap-2"><h2>{order.orderCode}</h2><StatusBadge status={order.status} /></div><p>{order.customer?.name || "Cliente sin nombre"} · {order.customer?.email || "Sin email"}</p><small>{formatDate(order.createdAt)} · {items.length} {items.length === 1 ? "línea" : "líneas"}</small></div></div><strong>{formatTotal(order.total)}</strong></div><div className="admin-copy-grid"><CopyField label="Nombre" value={order.customer?.name ?? ""} /><CopyField label="Email" value={order.customer?.email ?? ""} /><CopyField label="Celular" value={order.customer?.phone ?? ""} /><CopyField label="Código" value={order.orderCode} /><CopyField label="Total" value={formatTotal(order.total)} /><button type="button" className="admin-delete-order" aria-label={`Eliminar pedido ${order.orderCode}`} onClick={() => void removeOrder(order.id, order.orderCode)} disabled={deleteOrder.isPending}><Trash2 size={15} /></button><button type="button" className="admin-load-order" onClick={() => loadOrderIntoComposer(order)}>Usar en mensajeador</button></div><div className="admin-order-controls"><label><span>Estado</span><select value={selectedStatus} onChange={event => setDrafts(current => ({ ...current, [order.id]: event.target.value }))}>{STATUS_OPTIONS.map(([value, label]) => <option value={value} key={value}>{label}</option>)}</select></label><label className="admin-note-field"><span>Nota interna · solo admin</span><input value={notes[order.id] ?? ""} onChange={event => setNotes(current => ({ ...current, [order.id]: event.target.value }))} placeholder="Ej. Stock confirmado, despacho Andreani..." maxLength={1000} /></label><div className="admin-order-actions"><button onClick={() => void saveStatus(order.id, order.status)} disabled={updateStatus.isPending} className="admin-save-button">{updateStatus.isPending ? "Guardando..." : "Guardar estado"}</button><button onClick={() => void exportOrder(order.id)} disabled={exportPriceList.isPending} className="admin-export-button"><Download size={14} /> {exportPriceList.isPending ? "Generando..." : "Exportar lista"}</button></div></div><div className="admin-order-summary">{items.slice(0, 3).map(item => <span key={item.sku}>{item.quantity} × {item.name}</span>)}{items.length > 3 && <span>+{items.length - 3} más</span>}</div><div className="admin-history"><div className="admin-history-heading"><Clock3 size={14} /> Historial y notas internas</div>{order.statusHistory?.length ? <div className="admin-history-list">{order.statusHistory.map(entry => <div key={entry.id} className="admin-history-entry"><span className={`status-timeline-dot ${statusTone[entry.status] ?? "status-pending"}`} /><div><div className="flex flex-wrap items-center gap-2"><StatusBadge status={entry.status} /><time>{formatDate(entry.createdAt)}</time></div>{entry.note && <p>{entry.note}</p>}</div></div>)}</div> : <p className="status-history-empty">Sin historial registrado.</p>}</div></article>; })}</div>}
  </section>;
}
