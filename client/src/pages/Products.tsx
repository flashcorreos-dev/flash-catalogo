import { ChevronDown, Filter, Grid2X2, ListFilter, Search, SlidersHorizontal, X } from "lucide-react";
import { useEffect, useMemo, useState, type FormEvent } from "react";
import { useLocation } from "wouter";
import ProductCard from "@/components/ProductCard";
import { trpc } from "@/lib/trpc";
import type { CatalogProduct } from "@shared/catalog";

const MAIN_CATEGORIES = [
  { slug: "collares", name: "Collares", match: "collar" },
  { slug: "correas", name: "Correas", match: "correa" },
  { slug: "manoplas", name: "Manoplas", match: "manopla" },
  { slug: "bozales", name: "Bozales", match: "bozal" },
  { slug: "arneses", name: "Arneses", match: "arnes" },
  { slug: "pretales", name: "Pretales", match: "pretal" },
  { slug: "sets", name: "Combos", match: "set" },
] as const;

const MATERIALS = [
  { slug: "polipropileno", name: "Polipropileno", match: "polipropileno" },
  { slug: "nato", name: "Nato", match: "nato" },
  { slug: "cuero-economico", name: "Cuero económico", match: "cuero economico" },
  { slug: "cuero", name: "Cuero", match: "cuero" },
  { slug: "sublimado", name: "Sublimado", match: "sublimado" },
  { slug: "camuflado", name: "Camuflado", match: "camuflado" },
  { slug: "strass", name: "Strass", match: "strass" },
  { slug: "fantasia", name: "Fantasía", match: "fantasia" },
] as const;

const WIDTHS = ["1,00 cm", "1,50 cm", "2,00 cm", "2,50 cm", "3,00 cm", "4,00 cm", "5,00 cm"];

function getSearchFromUrl() {
  if (typeof window === "undefined") return "";
  return new URLSearchParams(window.location.search).get("search") ?? "";
}

function getProductText(product: CatalogProduct) {
  return `${product.name} ${product.categoryLabel} ${product.description} ${product.variants.map(variant => variant.label).join(" ")}`.toLocaleLowerCase("es-AR");
}

function getCategory(product: CatalogProduct) {
  const haystack = getProductText(product);
  const isComboWithLeash = haystack.includes("correa") && (haystack.includes("con correa") || haystack.includes("c/ correa") || haystack.includes("c/correa") || haystack.includes("correa incluida"));
  if (isComboWithLeash) return "sets";
  const priority = ["sets", "pretales", "arneses", "bozales", "manoplas", "collares", "correas"] as const;
  return priority.find(slug => {
    const category = MAIN_CATEGORIES.find(item => item.slug === slug);
    return category ? `${product.name} ${product.categoryLabel}`.toLocaleLowerCase("es-AR").includes(category.match) : false;
  }) ?? (haystack.includes("set") ? "sets" : "otros");
}

function hasMaterial(product: CatalogProduct, material: typeof MATERIALS[number]) {
  const text = getProductText(product);
  return text.includes(material.match) || (material.slug === "fantasia" && text.includes("fantasía"));
}

function hasWidth(product: CatalogProduct, width: string) {
  const [number] = width.split(" ");
  return getProductText(product).includes(number);
}

export default function Products() {
  const [location, setLocation] = useLocation();
  const { data: products = [], isLoading } = trpc.catalog.list.useQuery();
  const [category, setCategory] = useState("all");
  const [materials, setMaterials] = useState<string[]>([]);
  const [widths, setWidths] = useState<string[]>([]);
  const [sort, setSort] = useState("featured");
  const [query, setQuery] = useState(getSearchFromUrl);
  const [mobileFilters, setMobileFilters] = useState(false);

  useEffect(() => {
    setQuery(getSearchFromUrl());
    setCategory("all");
  }, [location]);

  const categoryCounts = useMemo(() => {
    const counts = new Map<string, number>();
    products.forEach(product => {
      const slug = getCategory(product);
      counts.set(slug, (counts.get(slug) ?? 0) + 1);
    });
    return counts;
  }, [products]);

  const materialCounts = useMemo(() => new Map(MATERIALS.map(material => [material.slug, products.filter(product => hasMaterial(product, material)).length])), [products]);
  const widthCounts = useMemo(() => new Map(WIDTHS.map(width => [width, products.filter(product => hasWidth(product, width)).length])), [products]);

  const filtered = useMemo(() => {
    const normalized = query.trim().toLocaleLowerCase("es-AR");
    const result = products.filter(product => {
      const matchesCategory = category === "all" || getCategory(product) === category;
      const matchesSearch = !normalized || getProductText(product).includes(normalized);
      const matchesMaterial = materials.length === 0 || materials.some(material => hasMaterial(product, MATERIALS.find(item => item.slug === material)!));
      const matchesWidth = widths.length === 0 || widths.some(width => hasWidth(product, width));
      return matchesCategory && matchesSearch && matchesMaterial && matchesWidth;
    });
    return [...result].sort((a, b) => {
      if (sort === "price-low") return (a.variants[0]?.price ?? 0) - (b.variants[0]?.price ?? 0);
      if (sort === "price-high") return (b.variants[0]?.price ?? 0) - (a.variants[0]?.price ?? 0);
      if (sort === "name") return a.name.localeCompare(b.name, "es");
      return 0;
    });
  }, [category, materials, products, query, sort, widths]);

  const search = (event: FormEvent) => {
    event.preventDefault();
    const nextUrl = query.trim() ? `/productos?search=${encodeURIComponent(query.trim())}` : "/productos";
    setLocation(nextUrl);
  };

  const chooseCategory = (slug: string) => { setCategory(slug); setMobileFilters(false); };
  const toggle = (values: string[], value: string, setter: (next: string[]) => void) => setter(values.includes(value) ? values.filter(item => item !== value) : [...values, value]);
  const clearFilters = () => { setCategory("all"); setMaterials([]); setWidths([]); setQuery(""); setLocation("/productos"); };
  const activeFilters = (category !== "all" ? 1 : 0) + materials.length + widths.length;
  const preferredWidth = widths[0];

  const filtersContent = <>
    <div className="filter-group"><p className="filter-label">Categorías</p><div className="mt-3 flex flex-col gap-1"><button onClick={() => chooseCategory("all")} className={`category-option ${category === "all" ? "category-option-active" : ""}`}><span>Todos los productos</span><b>{products.length}</b></button>{MAIN_CATEGORIES.map(item => <button key={item.slug} onClick={() => chooseCategory(item.slug)} className={`category-option ${category === item.slug ? "category-option-active" : ""}`}><span>{item.name}</span><b>{categoryCounts.get(item.slug) ?? 0}</b></button>)}</div></div>
    <div className="filter-group"><p className="filter-label">Material</p><div className="filter-chip-list">{MATERIALS.map(item => <button key={item.slug} onClick={() => toggle(materials, item.slug, setMaterials)} className={`filter-chip ${materials.includes(item.slug) ? "filter-chip-active" : ""}`}><span>{item.name}</span><b>{materialCounts.get(item.slug) ?? 0}</b></button>)}</div></div>
    <div className="filter-group"><p className="filter-label">Ancho del material</p><div className="filter-chip-list">{WIDTHS.map(width => <button key={width} onClick={() => toggle(widths, width, setWidths)} className={`filter-chip ${widths.includes(width) ? "filter-chip-active" : ""}`}><span>{width}</span><b>{widthCounts.get(width) ?? 0}</b></button>)}</div></div>
  </>;

  return <section className="mx-auto max-w-[1280px] px-4 pb-16 pt-12 sm:px-6 lg:px-8 lg:pt-16">
    <div className="flex flex-col gap-6 border-b border-[#eadfd3] pb-10 lg:flex-row lg:items-end lg:justify-between"><div><p className="eyebrow">Catálogo FLASH</p><h1 className="section-title mt-2">Productos para tu negocio</h1><p className="section-copy mt-3 max-w-xl">Elegí una categoría, material o ancho; también podés buscar por nombre y artículo.</p></div><form onSubmit={search} className="search-shell w-full max-w-md bg-white"><Search size={17} /><input value={query} onChange={event => setQuery(event.target.value)} placeholder="Buscar por nombre o artículo..." aria-label="Buscar por nombre o categoría" /><button type="submit" aria-label="Buscar"><span className="hidden sm:inline">Buscar</span><Search size={15} className="sm:hidden" /></button></form></div>
    <div className="mt-8 flex items-center justify-between gap-4 lg:hidden"><button className="filter-mobile-button" onClick={() => setMobileFilters(!mobileFilters)}><SlidersHorizontal size={16} /> Filtros <span>{activeFilters ? `· ${activeFilters} activos` : ""}</span><ChevronDown size={14} /></button><span className="text-xs text-[#88766c]">{filtered.length} resultados</span></div>
    <div className={`catalog-layout ${mobileFilters ? "catalog-layout-open" : ""}`}><aside className="filters-panel"><div className="flex items-center justify-between"><p className="eyebrow">Filtrar catálogo</p><button className="lg:hidden" onClick={() => setMobileFilters(false)} aria-label="Cerrar filtros"><X size={17} /></button></div>{filtersContent}<button className="lg:hidden mt-5 inline-flex w-full items-center justify-center rounded-full bg-[#3a2922] px-5 py-3 text-sm font-bold text-white" onClick={() => setMobileFilters(false)}>Aplicar</button><button onClick={clearFilters} className="clear-filter-button">Limpiar filtros</button></aside><div className="min-w-0 flex-1"><div className="mb-6 hidden items-center justify-between lg:flex"><p className="text-sm text-[#806f66]"><strong className="text-[#3a2922]">{filtered.length}</strong> productos encontrados</p><div className="flex items-center gap-3"><label htmlFor="sort" className="text-xs text-[#806f66]">Ordenar por</label><select id="sort" value={sort} onChange={event => setSort(event.target.value)} className="rounded-full border border-[#eadfd3] bg-white px-4 py-2 text-xs font-semibold outline-none"><option value="featured">Más relevantes</option><option value="price-low">Precio: menor a mayor</option><option value="price-high">Precio: mayor a menor</option><option value="name">Nombre A-Z</option></select><Grid2X2 size={17} className="text-[#849084]" /></div></div><div className="mb-6 flex items-center justify-between lg:hidden"><p className="text-sm text-[#806f66]"><strong className="text-[#3a2922]">{filtered.length}</strong> productos</p><select aria-label="Ordenar productos" value={sort} onChange={event => setSort(event.target.value)} className="rounded-full border border-[#eadfd3] bg-white px-3 py-2 text-xs font-semibold outline-none"><option value="featured">Relevantes</option><option value="price-low">Menor precio</option><option value="price-high">Mayor precio</option><option value="name">Nombre A-Z</option></select></div>{isLoading ? <div className="product-grid">{[1,2,3,4,5,6].map(item => <div key={item} className="skeleton-card" />)}</div> : filtered.length > 0 ? <div className="product-grid">{filtered.map(product => <ProductCard key={product.slug} product={product} preferredWidth={preferredWidth} />)}</div> : <div className="empty-state"><Filter size={24} /><h2>No encontramos productos</h2><p>Probá con otro término o limpiá los filtros.</p><button onClick={clearFilters} className="cta-dark">Limpiar filtros</button></div>}</div></div>
    <div className="mt-12 flex items-center gap-2 rounded-2xl border border-[#eadfd3] bg-white px-5 py-4 text-xs text-[#806f66]"><ListFilter size={16} className="text-[#8ba729]" /><span>Podés combinar material y ancho. La disponibilidad final se confirma al enviar tu pedido por WhatsApp.</span></div>
  </section>;
}
