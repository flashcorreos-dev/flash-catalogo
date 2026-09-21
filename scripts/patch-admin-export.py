from pathlib import Path

path = Path('/home/ubuntu/flash-catalogo-store/client/src/pages/AdminOrders.tsx')
text = path.read_text()
old = '<button onClick={() => void saveStatus(order.id, order.status)} disabled={updateStatus.isPending} className="admin-save-button">{updateStatus.isPending ? "Guardando..." : "Guardar estado"}</button>'
new = '<div className="admin-order-actions"><button onClick={() => void saveStatus(order.id, order.status)} disabled={updateStatus.isPending} className="admin-save-button">{updateStatus.isPending ? "Guardando..." : "Guardar estado"}</button><button onClick={() => void exportOrder(order.id)} disabled={exportPriceList.isPending} className="admin-export-button"><Download size={14} /> {exportPriceList.isPending ? "Generando..." : "Exportar lista"}</button></div>'
if old not in text:
    raise SystemExit('target action button was not found')
path.write_text(text.replace(old, new, 1))
