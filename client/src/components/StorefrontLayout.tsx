import { Link, useLocation } from "wouter";
import { ArrowRight, Menu, Minus, Plus, Search, ShoppingBag, UserRound, X } from "lucide-react";
import { useEffect, useState, type ReactNode } from "react";
import { toast } from "sonner";
import { startLogin } from "@/const";
import { useAuth } from "@/_core/hooks/useAuth";
import { trpc } from "@/lib/trpc";
import { useStore } from "@/contexts/StoreContext";
import { formatARS } from "@/components/ProductCard";
import { buildOrderMessage } from "@shared/order-message";

export const WHATSAPP_NUMBER = "5491172531714";
export const makeWhatsAppUrl = (message: string, phoneNumber = WHATSAPP_NUMBER) => {
  const normalizedPhone = phoneNumber.replace(/\D/g, "") || WHATSAPP_NUMBER;
  return `https://wa.me/${normalizedPhone}?text=${encodeURIComponent(message)}`;
};

export default function StorefrontLayout({ children }: { children: ReactNode }) {
  const [location, setLocation] = useLocation();
  const [cartOpen, setCartOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const { user, isAuthenticated } = useAuth();
  const { cart, cartCount, cartTotal, updateQuantity, removeFromCart, clearCart } = useStore();
  const createOrder = trpc.orders.create.useMutation();

  useEffect(() => {
    const openCartAfterAdd = () => setCartOpen(true);
    window.addEventListener("flash-cart-added", openCartAfterAdd);
    return () => window.removeEventListener("flash-cart-added", openCartAfterAdd);
  }, []);

  const search = () => {
    const term = searchValue.trim();
    setLocation(term ? `/productos?search=${encodeURIComponent(term)}` : "/productos");
  };
  const checkout = async () => {
    if (!cart.length) return;
    if (isAuthenticated && !user?.phone?.trim()) {
      toast.error("Asociá un celular antes de confirmar el pedido", { description: "Podés hacerlo desde Mi cuenta → Ajustes del perfil." });
      return;
    }
    let orderCode = `FL-${Date.now().toString(36).toUpperCase()}`;
    if (isAuthenticated) {
      try {
        const order = await createOrder.mutateAsync({ items: cart, total: cartTotal });
        orderCode = order.orderCode;
        toast.success("Pedido guardado en tu historial");
      } catch {
        toast.error("No pudimos guardar el pedido, pero podés enviarlo por WhatsApp igualmente.");
      }
    } else {
      toast.info("Pedido listo para enviar", { description: "Ingresá a tu cuenta si querés guardar el historial." });
    }
    window.open(makeWhatsAppUrl(buildOrderMessage(cart, cartTotal, orderCode)), "_blank", "noopener,noreferrer");
    clearCart();
    setCartOpen(false);
  };
  const active = (path: string) => location === path || (path !== "/" && location.startsWith(path));

  return (
    <div className="min-h-screen bg-[#fbf7f2] text-[#3a2922]">
      <header className="sticky top-0 z-40 border-b border-[#e2e5dd]/80 bg-[#fbf7f2]/95 backdrop-blur-xl">
        <div className="mx-auto flex max-w-[1280px] items-center gap-4 px-4 py-4 sm:px-6 lg:px-8">
          <button type="button" aria-label="Abrir menú" className="mobile-menu-trigger md:hidden" onClick={() => setMobileMenuOpen(true)}><Menu size={20} /></button>
          <Link href="/" className="shrink-0" onClick={() => setMobileMenuOpen(false)}><span className="brand-lockup"><span className="brand-word">FLASH</span><img src="/manus-storage/flash-paw-logo_6b4b46ab.png" alt="" className="brand-paw" /></span></Link>
          <nav className="hidden items-center gap-7 lg:flex">
            {[['/', 'Inicio'], ['/productos', 'Productos'], ['/contacto', 'Contacto'], ['/preguntas-frecuentes', 'Preguntas Frecuentes']].map(([href, label]) => <Link key={href} href={href}><span className={`nav-link ${active(href) ? 'nav-link-active' : ''}`}>{label}</span></Link>)}
          </nav>
          <div className="ml-auto hidden min-w-0 flex-1 justify-end gap-3 md:flex">
            <div className="search-shell max-w-[270px]"><Search size={16} /><input aria-label="Buscar productos" value={searchValue} onChange={event => setSearchValue(event.target.value)} onKeyDown={event => event.key === "Enter" && search()} placeholder="Buscar en el catálogo..." /><button aria-label="Buscar" onClick={search}><ArrowRight size={15} /></button></div>
            <Link href="/cuenta"><span className="icon-pill" title={isAuthenticated ? "Mi cuenta" : "Ingresar"}><UserRound size={18} /><span className="hidden xl:inline">{isAuthenticated ? (user?.name?.split(" ")[0] ?? "Cuenta") : "Ingresar"}</span></span></Link>
            <button className="cart-pill" onClick={() => setCartOpen(true)}><ShoppingBag size={17} /><span>Carrito</span><b>{cartCount}</b></button>
          </div>
          <div className="ml-auto flex items-center gap-2 md:hidden"><Link href="/cuenta"><span className="icon-pill"><UserRound size={18} /></span></Link><button className="icon-pill relative" onClick={() => setCartOpen(true)}><ShoppingBag size={18} /><b className="cart-badge">{cartCount}</b></button></div>
        </div>
      </header>
      {mobileMenuOpen && <div className="mobile-menu-layer md:hidden"><button type="button" aria-label="Cerrar menú" className="mobile-menu-backdrop" onClick={() => setMobileMenuOpen(false)} /><aside className="mobile-menu-panel"><div className="flex items-center justify-between border-b border-[#eadfd3] px-5 py-5"><div><p className="eyebrow">Navegación</p><h2 className="mt-1 text-2xl font-semibold">Menú FLASH</h2></div><button type="button" aria-label="Cerrar menú" onClick={() => setMobileMenuOpen(false)} className="icon-pill"><X size={18} /></button></div><nav className="flex flex-col gap-2 px-4 py-5"><Link href="/" onClick={() => setMobileMenuOpen(false)}><span className={`mobile-menu-link ${active("/") ? "mobile-menu-link-active" : ""}`}>Inicio <ArrowRight size={16} /></span></Link><Link href="/productos" onClick={() => setMobileMenuOpen(false)}><span className={`mobile-menu-link ${active("/productos") ? "mobile-menu-link-active" : ""}`}>Productos <ArrowRight size={16} /></span></Link><Link href="/contacto" onClick={() => setMobileMenuOpen(false)}><span className={`mobile-menu-link ${active("/contacto") ? "mobile-menu-link-active" : ""}`}>Contacto <ArrowRight size={16} /></span></Link><Link href="/preguntas-frecuentes" onClick={() => setMobileMenuOpen(false)}><span className={`mobile-menu-link ${active("/preguntas-frecuentes") ? "mobile-menu-link-active" : ""}`}>Preguntas Frecuentes <ArrowRight size={16} /></span></Link><Link href="/cuenta" onClick={() => setMobileMenuOpen(false)}><span className={`mobile-menu-link ${active("/cuenta") ? "mobile-menu-link-active" : ""}`}>Mi cuenta <UserRound size={16} /></span></Link></nav><div className="mt-auto border-t border-[#eadfd3] px-5 py-5"><p className="text-xs leading-relaxed text-[#806f66]">Atención de lunes a viernes, de 8 a 18 h.</p><a href={makeWhatsAppUrl("Hola Flash, quiero hacer una consulta")} target="_blank" rel="noreferrer" className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-[#9a5a43]">Escribir por WhatsApp <ArrowRight size={15} /></a></div></aside></div>}
      <main>{children}</main>
      <footer className="mt-24 border-t border-[#dde3da] bg-[#3a2922] text-[#dce8d7]"><div className="mx-auto grid max-w-[1280px] gap-10 px-4 py-12 sm:px-6 md:grid-cols-[1.4fr_1fr_1fr] lg:px-8"><div><span className="brand-lockup brand-lockup-footer"><span className="brand-word">FLASH</span><img src="/manus-storage/flash-paw-logo_6b4b46ab.png" alt="" className="brand-paw" /></span><p className="mt-4 max-w-xs text-sm leading-relaxed text-[#a4b4a3]">Catálogo de accesorios para mascotas. Elegí tus productos y cerramos el pedido por WhatsApp.</p></div><div><p className="eyebrow text-[#d99d79]">Explorá</p><div className="mt-4 flex flex-col gap-3 text-sm"><Link href="/"><span className="hover:text-white">Inicio</span></Link><Link href="/productos"><span className="hover:text-white">Todos los productos</span></Link><Link href="/contacto"><span className="hover:text-white">Contacto</span></Link><Link href="/preguntas-frecuentes"><span className="hover:text-white">Preguntas Frecuentes</span></Link></div></div><div><p className="eyebrow text-[#d99d79]">Atención</p><p className="mt-4 text-sm leading-relaxed text-[#a4b4a3]">Lun. a vie. · 8 a 18 h<br />Respuesta directa por WhatsApp</p><a href={makeWhatsAppUrl("Hola Flash, quiero hacer una consulta")} target="_blank" rel="noreferrer" className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-white hover:text-[#f1c6a8]">Escribir por WhatsApp <ArrowRight size={15} /></a></div></div><div className="border-t border-white/10 px-4 py-5 text-center text-[11px] text-[#7d8e7d]">© 2026 FLASH · Catálogo online</div></footer>
      {cartOpen && <div className="fixed inset-0 z-50"><button aria-label="Cerrar carrito" className="absolute inset-0 bg-[#101810]/35 backdrop-blur-sm" onClick={() => setCartOpen(false)} /><aside className="cart-drawer absolute right-0 top-0 flex h-full w-full max-w-[440px] flex-col bg-[#fffaf5] shadow-2xl"><div className="flex items-center justify-between border-b border-[#e1e6df] px-5 py-5"><div><p className="eyebrow">Tu selección</p><h2 className="mt-1 text-2xl font-semibold">Mi carrito <span className="text-[#96a19a]">({cartCount})</span></h2></div><button onClick={() => setCartOpen(false)} className="icon-pill"><X size={18} /></button></div><div className="flex-1 overflow-y-auto px-5 py-4">{cart.length === 0 ? <div className="flex h-full flex-col items-center justify-center text-center"><div className="mb-4 rounded-full bg-[#eef3e8] p-5 text-[#73816f]"><ShoppingBag size={28} /></div><h3 className="text-lg font-semibold">Tu carrito está vacío</h3><p className="mt-2 max-w-[240px] text-sm text-[#88766c]">Sumá productos del catálogo y acá vas a ver tu pedido.</p><Link href="/productos"><span onClick={() => setCartOpen(false)} className="mt-5 inline-flex rounded-full bg-[#3a2922] px-5 py-3 text-sm font-semibold text-white">Ver productos</span></Link></div> : <div className="space-y-3">{cart.map(item => <div key={item.key} className="rounded-2xl border border-[#e1e6df] bg-white p-3"><div className="flex gap-3"><img src={item.image} alt="" className="h-16 w-16 rounded-xl object-cover" /><div className="min-w-0 flex-1"><p className="truncate text-sm font-semibold">{item.name}</p><p className="mt-1 truncate text-xs text-[#806f66]">{item.variant}</p><p className="mt-2 font-bold">{formatARS(item.unitPrice * item.quantity)}</p></div><button aria-label="Quitar producto" onClick={() => removeFromCart(item.key)} className="self-start text-[#9aa39b] hover:text-[#b14935]"><X size={15} /></button></div><div className="mt-3 flex items-center justify-between"><span className="text-[10px] uppercase tracking-[.12em] text-[#909a91]">Cantidad</span><div className="flex items-center gap-3 rounded-full bg-[#f2f4ef] px-2 py-1"><button aria-label="Disminuir" onClick={() => updateQuantity(item.key, item.quantity - 1)}><Minus size={13} /></button><span className="min-w-4 text-center text-xs font-bold">{item.quantity}</span><button aria-label="Aumentar" onClick={() => updateQuantity(item.key, item.quantity + 1)}><Plus size={13} /></button></div></div></div>)}</div>}</div>{cart.length > 0 && <div className="border-t border-[#e1e6df] bg-white px-5 py-5"><div className="mb-4 flex items-end justify-between"><span className="text-sm text-[#748078]">Total estimado</span><strong className="text-2xl">{formatARS(cartTotal)}</strong></div><button onClick={checkout} disabled={createOrder.isPending} className="flex w-full items-center justify-center gap-2 rounded-full bg-[#3a2922] py-4 text-sm font-bold text-white transition hover:bg-[#2e4932] disabled:opacity-60">{createOrder.isPending ? "Guardando pedido..." : "Confirmar por WhatsApp"}<ArrowRight size={16} /></button><p className="mt-3 text-center text-[11px] leading-relaxed text-[#9a8880]">El pedido se guarda en tu historial si iniciás sesión y se abre el chat para coordinar disponibilidad.</p></div>}</aside></div>}
    </div>
  );
}
