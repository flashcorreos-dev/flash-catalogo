import { Minus, Plus, ShoppingBag, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import type { CatalogProduct } from "@shared/catalog";
import { useStore } from "@/contexts/StoreContext";

export const formatARS = (value: number) => new Intl.NumberFormat("es-AR", {
  style: "currency",
  currency: "ARS",
  maximumFractionDigits: 0,
}).format(value);

export default function ProductCard({ product, featured = false, preferredWidth }: { product: CatalogProduct; featured?: boolean; preferredWidth?: string }) {
  const { addToCart } = useStore();
  const [variantIndex, setVariantIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const variant = product.variants[variantIndex] ?? product.variants[0];

  useEffect(() => {
    if (!preferredWidth) return;
    const normalizedWidth = preferredWidth.toLocaleLowerCase("es-AR").replace(",", ".");
    const matchingIndex = product.variants.findIndex(choice => choice.label.toLocaleLowerCase("es-AR").replace(",", ".").includes(normalizedWidth));
    setVariantIndex(matchingIndex >= 0 ? matchingIndex : 0);
  }, [preferredWidth, product.variants]);

  const add = () => {
    if (!variant) return;
    addToCart({ slug: product.slug, name: product.name, sku: variant.sku, variant: variant.label, quantity, unitPrice: variant.price, image: product.image });
    window.dispatchEvent(new Event("flash-cart-added"));
    toast.success(`${quantity} ${quantity === 1 ? "unidad agregada" : "unidades agregadas"}`, { description: `${product.name} · ${variant.label}` });
  };

  const changeQuantity = (next: number) => setQuantity(Math.min(999, Math.max(1, Math.floor(next) || 1)));

  return (
    <article className="product-card group">
      <div className="relative overflow-hidden rounded-[1.35rem] bg-[#eee2d7] aspect-[4/3]">
        <img src={product.image} alt={product.name} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#111511]/45 via-transparent to-transparent" />
        {featured && <span className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full bg-[#f1c6a8] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-[#121810]"><Sparkles size={11} /> Selección Flash</span>}
        <span className="absolute bottom-3 left-3 rounded-full bg-white/90 px-2.5 py-1 text-[10px] font-semibold text-[#4b3931]">{product.categoryLabel}</span>
      </div>
      <div className="flex flex-1 flex-col px-1 pt-4">
        <p className="eyebrow mb-1">{product.brand} · catálogo mayorista</p>
        <h3 className="line-clamp-2 text-[17px] font-semibold leading-tight text-[#3a2922]">{product.name}</h3>
        <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-[#806f66]">{product.description}</p>
        <div className="mt-auto pt-4">
          {product.variants.length > 1 ? (
            <select value={variantIndex} onChange={event => setVariantIndex(Number(event.target.value))} className="mb-3 h-10 w-full rounded-xl border border-[#eadfd3] bg-white px-3 text-xs text-[#4b3931] outline-none focus:border-[#86a52b]">
              {product.variants.map((choice, index) => <option key={choice.sku} value={index}>{choice.label}</option>)}
            </select>
          ) : <p className="mb-3 truncate text-xs text-[#806f66]">{variant?.label}</p>}
          <div className="space-y-3">
            <div className="min-w-0">
              <p className="text-lg font-bold tracking-tight text-[#3a2922]">{variant ? formatARS(variant.price) : "Consultar"}</p>
              <p className="text-[10px] uppercase tracking-[0.12em] text-[#89938a]">precio por unidad</p>
            </div>
            <div className="flex w-full items-center gap-2">
              <div className="quantity-control shrink-0" aria-label="Cantidad a agregar"><button aria-label="Disminuir cantidad" onClick={() => changeQuantity(quantity - 1)}><Minus size={13} /></button><input aria-label={`Cantidad de ${product.name}`} inputMode="numeric" value={quantity} onChange={event => changeQuantity(Number(event.target.value))} /><button aria-label="Aumentar cantidad" onClick={() => changeQuantity(quantity + 1)}><Plus size={13} /></button></div>
              <button onClick={add} className="inline-flex h-11 min-w-0 flex-1 items-center justify-center gap-2 rounded-full bg-[#3a2922] px-3 text-xs font-bold text-white transition hover:bg-[#87503c] active:scale-[.97]"><ShoppingBag size={15} /> <span>Agregar al carrito</span></button>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
