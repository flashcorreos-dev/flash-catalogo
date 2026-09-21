import { Link } from "wouter";
import { ArrowLeft, ArrowRight, BadgePercent, Boxes, ShieldCheck, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";
import ProductCard from "@/components/ProductCard";
import { trpc } from "@/lib/trpc";

const heroSlides = [
  { image: "/manus-storage/flash-collares_d390d3b5.jpg", alt: "Collares para mascotas de la colección FLASH", label: "Accesorios que hacen la diferencia" },
  { image: "/manus-storage/flash-arnes_0c039262.jpg", alt: "Arneses y accesorios para mascotas", label: "Materiales pensados para durar" },
  { image: "/manus-storage/flash-perro-collar_8328473f.jpg", alt: "Accesorios FLASH para perros", label: "Calidad para cada día" },
];

export default function Home() {
  const { data: products = [], isLoading } = trpc.catalog.list.useQuery();
  const featured = products.filter(product => product.featured).slice(0, 4);
  const [slide, setSlide] = useState(0);
  const activeSlide = heroSlides[slide];

  useEffect(() => {
    const timer = window.setInterval(() => setSlide(current => (current + 1) % heroSlides.length), 5000);
    return () => window.clearInterval(timer);
  }, []);

  return <>
    <section className="hero-section"><div className="hero-grid" /><div className="mx-auto grid max-w-[1280px] items-center gap-10 px-4 pb-14 pt-14 sm:px-6 lg:grid-cols-[1.02fr_.98fr] lg:px-8 lg:pb-20 lg:pt-20"><div className="relative z-10 max-w-2xl"><p className="eyebrow mb-5 text-[#a8d02c]"><Sparkles size={13} className="mr-2 inline" /> Accesorios para mascotas · FLASH</p><h1 className="display-title text-white">Tu negocio,<br /><em>bien equipado.</em></h1><p className="mt-7 max-w-lg text-base leading-relaxed text-[#bcc8bb] sm:text-lg">Productos confiables para quienes buscan lo mejor para sus mascotas. Elegí, armá tu pedido y recibí atención directa cuando la necesites.</p><div className="mt-9 flex flex-wrap gap-3"><Link href="/productos"><span className="cta-primary">Ver catálogo <ArrowRight size={17} /></span></Link></div></div><div className="hero-photo-wrap hero-carousel"><div className="hero-photo-shadow" /><img key={activeSlide.image} src={activeSlide.image} alt={activeSlide.alt} className="hero-photo" /><button aria-label="Imagen anterior" className="hero-carousel-control hero-carousel-prev" onClick={() => setSlide(current => (current - 1 + heroSlides.length) % heroSlides.length)}><ArrowLeft size={16} /></button><button aria-label="Imagen siguiente" className="hero-carousel-control hero-carousel-next" onClick={() => setSlide(current => (current + 1) % heroSlides.length)}><ArrowRight size={16} /></button><div className="hero-note"><span className="hero-note-dot" /><div><strong>{activeSlide.label}</strong><p>Deslizá para descubrir la colección</p></div></div><div className="hero-carousel-dots">{heroSlides.map((item, index) => <button key={item.image} aria-label={`Ver imagen ${index + 1}`} onClick={() => setSlide(index)} className={index === slide ? "hero-dot hero-dot-active" : "hero-dot"} />)}</div></div></div></section>
    <section className="hero-trust-strip"><div className="mx-auto grid max-w-[1280px] gap-4 px-4 py-8 sm:px-6 md:grid-cols-2 lg:grid-cols-4 lg:px-8"><div className="hero-trust-item"><strong>+25 años</strong><span>de experiencia en el rubro, innovando en la seguridad, comodidad y estilo de tu mascota</span></div><div className="hero-trust-item"><strong>Envíos a todo el país</strong><span>llegamos a todas las provincias de Argentina</span></div><div className="hero-trust-item"><strong>Alta calidad</strong><span>materiales seleccionados</span></div><div className="hero-trust-item"><strong>En cada detalle</strong><span>para brindar el nivel que tu peludo se merece</span></div></div></section>
    <section className="mx-auto max-w-[1280px] px-4 py-14 sm:px-6 lg:px-8"><div className="grid gap-4 sm:grid-cols-3"><div className="benefit-card"><span className="benefit-icon"><Boxes size={20} /></span><div><h3>Catálogo completo</h3><p>Todos tus artículos organizados por categoría.</p></div></div><div className="benefit-card"><span className="benefit-icon"><BadgePercent size={20} /></span><div><h3>Precios claros</h3><p>Valores visibles para armar pedidos sin vueltas.</p></div></div><div className="benefit-card"><span className="benefit-icon"><ShieldCheck size={20} /></span><div><h3>Pedido simple</h3><p>Confirmás por WhatsApp y coordinamos la entrega.</p></div></div></div></section>
    <section className="mx-auto max-w-[1280px] px-4 pb-8 sm:px-6 lg:px-8"><div className="section-heading"><div><p className="eyebrow">Para arrancar</p><h2 className="section-title">Ofertas destacadas</h2><p className="section-copy">Una selección de líneas que podés sumar hoy a tu pedido.</p></div><Link href="/productos"><span className="link-arrow">Ver todo <ArrowRight size={16} /></span></Link></div>{isLoading ? <div className="product-grid">{[1,2,3,4].map(item => <div key={item} className="skeleton-card" />)}</div> : <div className="product-grid">{featured.map(product => <ProductCard key={product.slug} product={product} featured />)}</div>}</section>
    <section className="mx-auto mt-16 max-w-[1280px] px-4 sm:px-6 lg:px-8"><div className="olive-banner"><div><p className="eyebrow text-[#c6e65c]">Hecho para comercios</p><h2 className="mt-3 max-w-xl text-3xl font-semibold leading-tight text-white sm:text-4xl">Más variedad. Menos tiempo armando pedidos.</h2><p className="mt-4 max-w-lg text-sm leading-relaxed text-[#c1cec0]">Guardá tus productos favoritos, volvé a pedir cuando quieras y consultá el historial desde tu cuenta.</p></div><Link href="/cuenta"><span className="cta-light">Crear mi cuenta <ArrowRight size={16} /></span></Link></div></section>
  </>;
}
