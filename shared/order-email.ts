export type OrderEmailItem = {
  name: string;
  variant: string;
  quantity: number;
  unitPrice: number;
};

const STATUS_LABELS: Record<string, string> = {
  pending: "Pendiente",
  confirmed: "Confirmado",
  dispatched: "Despachado",
  completed: "Completado",
  cancelled: "Cancelado",
};

const STATUS_MESSAGES: Record<string, string> = {
  pending: "Recibimos tu pedido y lo estamos revisando.",
  confirmed: "Tu pedido ya fue confirmado. A partir de esta confirmación podés avanzar con el pago. Gracias por confiar en nosotros.",
  dispatched: "Tu pedido fue despachado y pronto estará en camino.",
  completed: "Tu pedido fue completado. Esperamos que disfrutes tu compra.",
  cancelled: "Tu pedido fue cancelado y no tenés que realizar ningún pago. Si necesitás ayuda, escribinos.",
};

const STATUS_SUBJECTS: Record<string, string> = {
  pending: "Recibimos tu pedido",
  confirmed: "Tu pedido fue confirmado",
  dispatched: "Tu pedido ya fue despachado",
  completed: "Tu pedido fue completado",
  cancelled: "Actualización de tu pedido",
};

const formatARS = (value: number) => `$${value.toLocaleString("es-AR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
const escapeHtml = (value: string) => value.replace(/[&<>"']/g, character => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;" }[character] ?? character));

export function buildOrderStatusEmail(input: {
  customerName: string;
  orderCode: string;
  status: string;
  total: number;
  items: OrderEmailItem[];
  historyUrl: string;
  logoUrl?: string;
}) {
  const label = STATUS_LABELS[input.status] ?? input.status;
  const message = STATUS_MESSAGES[input.status] ?? "Tu pedido tuvo una actualización.";
  const itemsHtml = input.items.map(item => `<tr><td style="padding:12px 0;border-bottom:1px solid #e6ebe2;color:#27362a;font-size:14px"><strong>${escapeHtml(item.name)}</strong><br><span style="color:#728071;font-size:12px">${escapeHtml(item.variant)} · ${item.quantity} unidad${item.quantity === 1 ? "" : "es"}</span></td><td style="padding:12px 0;border-bottom:1px solid #e6ebe2;color:#27362a;text-align:right;font-size:14px">${formatARS(item.unitPrice * item.quantity)}</td></tr>`).join("");
  const customerFirstName = input.customerName.trim().split(/\s+/)[0] || "cliente";
  const subject = `FLASH · ${customerFirstName}, ${STATUS_SUBJECTS[input.status] ?? `actualización del pedido`} · ${input.orderCode}`;
  const logo = input.logoUrl ? `<span style="display:inline-flex;align-items:center;color:#e5ff43;font-size:24px;font-weight:800;letter-spacing:-1px">FLASH<span style="font-size:10px;vertical-align:top">®</span><img src="${escapeHtml(input.logoUrl)}" alt="" width="25" height="25" style="display:inline-block;margin-left:7px;object-fit:contain;transform:rotate(45deg);filter:invert(1)"></span>` : `<span style="color:#e5ff43;font-size:24px;font-weight:800;letter-spacing:-1px">FLASH<span style="font-size:10px;vertical-align:top">®</span></span>`;
  const html = `<!doctype html><html lang="es"><body style="margin:0;background:#f3f6ef;color:#27362a;font-family:Arial,Helvetica,sans-serif"><div style="max-width:640px;margin:24px auto;padding:0 16px"><div style="overflow:hidden;border-radius:24px;background:#18231a;box-shadow:0 12px 35px rgba(24,35,26,.15)"><div style="padding:28px 32px;border-bottom:1px solid rgba(255,255,255,.12)"><div>${logo}</div><div style="margin-top:22px;color:#c6e65c;font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase">Actualización de tu pedido</div><h1 style="margin:8px 0 0;color:#fff;font-size:32px;line-height:1.1">${escapeHtml(label)}</h1><p style="margin:14px 0 0;color:#c5d1c2;font-size:15px;line-height:1.6">Hola ${escapeHtml(input.customerName)}, ${message}</p></div><div style="padding:28px 32px;background:#fff"><div style="display:inline-block;border-radius:12px;background:#eef4df;padding:10px 14px;color:#617c18;font-size:12px;font-weight:700">Código de compra: ${escapeHtml(input.orderCode)}</div><h2 style="margin:25px 0 8px;color:#27362a;font-size:19px">Aquí tenés el detalle de tu orden</h2><p style="margin:0 0 8px;color:#778177;font-size:13px">Guardá este código para consultar tu pedido cuando lo necesites.</p><table style="width:100%;border-collapse:collapse">${itemsHtml}<tr><td style="padding:18px 0 4px;color:#778177;font-size:13px">Total estimado</td><td style="padding:18px 0 4px;color:#27362a;text-align:right;font-size:21px;font-weight:800">${formatARS(input.total)}</td></tr></table><a href="${escapeHtml(input.historyUrl)}" style="display:block;margin-top:24px;border-radius:999px;background:#18231a;padding:15px 20px;color:#fff;text-align:center;text-decoration:none;font-size:14px;font-weight:700">Ver estado e historial de mi pedido&nbsp; →</a><p style="margin:24px 0 0;color:#778177;text-align:center;font-size:13px;line-height:1.6">Gracias por confiar en nosotros. Estamos para ayudarte.</p></div><div style="padding:22px 32px;color:#b4c0b2;font-size:12px;line-height:1.7">${logo} · Accesorios para mascotas<br>Facebook: FlashAccesoriosOK (Tomas Flash) · Instagram: @flash.accesorios.ok<br><a href="mailto:flashcorreos@hotmail.com" style="color:#dce8d7">flashcorreos@hotmail.com</a></div></div></div></body></html>`;
  const text = `Hola ${input.customerName},\n\nTu pedido ${input.orderCode} está ${label}. ${message}\n\nDetalle:\n${input.items.map(item => `- ${item.name} (${item.variant}) x ${item.quantity}: ${formatARS(item.unitPrice * item.quantity)}`).join("\n")}\n\nTotal estimado: ${formatARS(input.total)}\n\nVer historial: ${input.historyUrl}\n\nGracias por confiar en nosotros.\nFLASH`;
  return { subject, html, text };
}
