import { Check, Image, Package, Plus, RefreshCw, Save, Search, Trash2, Upload } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { trpc } from "@/lib/trpc";
import type { CatalogProduct, CatalogVariant } from "@shared/catalog";
import { useLocation } from "wouter";

type DraftProduct = Omit<CatalogProduct, "featured"> & { variants: CatalogVariant[]; featured: boolean };
const EMPTY_PRODUCTS: CatalogProduct[] = [];

function makeDraft(product: CatalogProduct): DraftProduct {
  return { ...product, featured: Boolean(product.featured), variants: product.variants.map(variant => ({ ...variant })) };
}

export default function AdminCatalog() {
  const { data: productsData, isLoading, refetch } = trpc.catalog.adminList.useQuery();
  const products = productsData ?? EMPTY_PRODUCTS;
  const [, navigate] = useLocation();
  const updateProduct = trpc.catalog.adminUpdate.useMutation();
  const uploadImage = trpc.catalog.uploadImage.useMutation();
  const [search, setSearch] = useState("");
  const [drafts, setDrafts] = useState<Record<string, DraftProduct>>({});
  const [pendingPath, setPendingPath] = useState<string | null>(null);
  const pendingPathRef = useRef<string | null>(null);
  const [showExitDialog, setShowExitDialog] = useState(false);

  useEffect(() => {
    setDrafts(Object.fromEntries(products.map(product => [product.slug, makeDraft(product)])));
  }, [products]);

  const dirtySlugs = products.filter(product => {
    const draft = drafts[product.slug];
    return draft && JSON.stringify(draft) !== JSON.stringify(makeDraft(product));
  }).map(product => product.slug);
  const hasUnsavedChanges = dirtySlugs.length > 0;

  useEffect(() => {
    (window as Window & { flashCatalogDirty?: boolean }).flashCatalogDirty = hasUnsavedChanges;
    const beforeUnload = (event: BeforeUnloadEvent) => { if (hasUnsavedChanges) { event.preventDefault(); event.returnValue = ""; } };
    const requestNavigation = (event: Event) => {
      const path = (event as CustomEvent<string>).detail;
      if (!hasUnsavedChanges) navigate(path);
      else { pendingPathRef.current = path; setPendingPath(path); setShowExitDialog(true); }
    };
    window.addEventListener("beforeunload", beforeUnload);
    window.addEventListener("flash-catalog-request-navigation", requestNavigation);
    return () => { window.removeEventListener("beforeunload", beforeUnload); window.removeEventListener("flash-catalog-request-navigation", requestNavigation); (window as Window & { flashCatalogDirty?: boolean }).flashCatalogDirty = false; };
  }, [hasUnsavedChanges, navigate]);

  const updateDraft = (slug: string, patch: Partial<DraftProduct>) => setDrafts(current => ({ ...current, [slug]: { ...current[slug], ...patch } }));
  const updateVariant = (slug: string, index: number, patch: Partial<CatalogVariant>) => updateDraft(slug, { variants: drafts[slug].variants.map((variant, variantIndex) => variantIndex === index ? { ...variant, ...patch } : variant) });
  const addVariant = (slug: string) => updateDraft(slug, { variants: [...drafts[slug].variants, { sku: `${slug}-${Date.now()}`, label: "Nueva variante", price: 0, inventory: true }] });
  const removeVariant = (slug: string, index: number) => updateDraft(slug, { variants: drafts[slug].variants.filter((_, variantIndex) => variantIndex !== index) });
  const save = async (slug: string) => {
    try {
      await updateProduct.mutateAsync(drafts[slug]);
      await refetch();
      toast.success("Producto actualizado");
    } catch (error) { toast.error(error instanceof Error ? error.message : "No pudimos guardar el producto."); }
  };

  const saveAllAndExit = async () => {
    try {
      for (const slug of dirtySlugs) await updateProduct.mutateAsync(drafts[slug]);
      await refetch();
      setShowExitDialog(false);
      const path = pendingPathRef.current ?? pendingPath;
      pendingPathRef.current = null;
      setPendingPath(null);
      if (path) navigate(path);
      toast.success("Cambios guardados");
    } catch (error) { toast.error(error instanceof Error ? error.message : "No pudimos guardar los cambios."); }
  };

  const exitWithoutSaving = () => {
    const path = pendingPathRef.current ?? pendingPath;
    pendingPathRef.current = null;
    setDrafts(Object.fromEntries(products.map(product => [product.slug, makeDraft(product)])));
    setShowExitDialog(false);
    setPendingPath(null);
    if (path) navigate(path);
  };

  const uploadProductImage = async (slug: string, file: File) => {
    if (!file.type.match(/^image\/(jpeg|png|webp|gif)$/)) return toast.error("Elegí una imagen JPG, PNG, WEBP o GIF.");
    if (file.size > 8 * 1024 * 1024) return toast.error("La imagen no puede superar los 8 MB.");
    const base64 = await new Promise<string>((resolve, reject) => { const reader = new FileReader(); reader.onload = () => resolve(String(reader.result)); reader.onerror = reject; reader.readAsDataURL(file); });
    try {
      const uploaded = await uploadImage.mutateAsync({ fileName: file.name, contentType: file.type as "image/jpeg" | "image/png" | "image/webp" | "image/gif", base64 });
      updateDraft(slug, { image: uploaded.url });
      toast.success("Foto cargada; guardá el producto para confirmar el cambio.");
    } catch (error) { toast.error(error instanceof Error ? error.message : "No pudimos cargar la foto."); }
  };

  const filteredProducts = products.filter(product => `${product.name} ${product.slug} ${product.categoryLabel} ${product.variants.map((variant: CatalogVariant) => variant.label).join(" ")}`.toLowerCase().includes(search.trim().toLowerCase()));

  if (isLoading) return <div className="admin-loading"><RefreshCw className="animate-spin" size={20} /> Cargando catálogo...</div>;
  return <div className="admin-catalog-page-shell"><section className="admin-page"><div className="admin-page-header"><div><p className="eyebrow">FLASH · Administración</p><h1>Editar catálogo</h1><p>Modificá nombres, descripciones, fotos, variantes, precios y las ofertas de Inicio.</p></div><button onClick={() => void refetch()} className="admin-refresh"><RefreshCw size={15} /> Actualizar</button></div><div className="admin-catalog-note"><Package size={18} /><p>Los cambios se guardan en la base de datos y se reflejan en el catálogo público. Activá “Mostrar en ofertas” para elegir qué productos aparecen en Inicio.</p></div><label className="admin-catalog-search"><Search size={16} /><input value={search} onChange={event => setSearch(event.target.value)} placeholder="Buscar por nombre, SKU, categoría o variante..." /><span>{filteredProducts.length} resultados</span></label><div className="admin-catalog-list">{filteredProducts.map(product => { const draft = drafts[product.slug]; if (!draft) return null; return <article className="admin-product-editor" key={product.slug}><div className="admin-product-editor-header"><div className="admin-product-editor-title"><div className="admin-product-thumb"><img src={draft.image} alt="" /></div><div><p className="eyebrow">{draft.categoryLabel}</p><h2>{draft.name}</h2><small>Slug: {draft.slug}</small></div></div><label className="admin-featured-toggle"><input type="checkbox" checked={Boolean(draft.featured)} onChange={event => updateDraft(draft.slug, { featured: event.target.checked })} /><span><Check size={13} /> Mostrar en ofertas</span></label></div><div className="admin-product-fields"><label><span>Nombre</span><input value={draft.name} onChange={event => updateDraft(draft.slug, { name: event.target.value })} /></label><label><span>Marca</span><input value={draft.brand} onChange={event => updateDraft(draft.slug, { brand: event.target.value })} /></label><label><span>Slug de categoría</span><input value={draft.categorySlug} onChange={event => updateDraft(draft.slug, { categorySlug: event.target.value })} /></label><label><span>Categoría visible</span><input value={draft.categoryLabel} onChange={event => updateDraft(draft.slug, { categoryLabel: event.target.value })} /></label><div className="admin-product-image-field"><label><span>URL de foto</span><div><Image size={15} /><input value={draft.image} onChange={event => updateDraft(draft.slug, { image: event.target.value })} /></div></label><label className="admin-image-upload"><Upload size={14} /> Cargar nueva foto<input type="file" accept="image/jpeg,image/png,image/webp,image/gif" onChange={event => { const file = event.target.files?.[0]; if (file) void uploadProductImage(draft.slug, file); event.currentTarget.value = ""; }} /></label></div><label className="admin-product-description"><span>Descripción</span><textarea value={draft.description} onChange={event => updateDraft(draft.slug, { description: event.target.value })} rows={3} /></label></div><div className="admin-variants-editor"><div className="admin-variants-heading"><div><h3>Variantes, artículos y precios</h3><p>El precio se expresa en pesos argentinos sin separador de moneda.</p></div><button type="button" className="admin-add-product" onClick={() => addVariant(draft.slug)}><Plus size={14} /> Agregar variante</button></div>{draft.variants.map((variant, index) => <div className="admin-variant-row" key={`${variant.sku}-${index}`}><input aria-label="SKU" value={variant.sku} onChange={event => updateVariant(draft.slug, index, { sku: event.target.value })} placeholder="SKU" /><input aria-label="Nombre de variante" value={variant.label} onChange={event => updateVariant(draft.slug, index, { label: event.target.value })} placeholder="Descripción / artículo" /><input aria-label="Precio" type="number" min="0" value={variant.price} onChange={event => updateVariant(draft.slug, index, { price: Number(event.target.value) })} placeholder="Precio" /><label className="admin-inventory-check"><input type="checkbox" checked={variant.inventory} onChange={event => updateVariant(draft.slug, index, { inventory: event.target.checked })} /> Disponible</label><button type="button" aria-label="Eliminar variante" onClick={() => removeVariant(draft.slug, index)} disabled={draft.variants.length === 1}><Trash2 size={14} /></button></div>)}</div><div className="admin-product-editor-actions"><button type="button" className="admin-save-button" onClick={() => void save(draft.slug)} disabled={updateProduct.isPending}><Save size={14} /> {updateProduct.isPending ? "Guardando..." : "Guardar producto"}</button></div></article>; })}</div>{filteredProducts.length === 0 && <div className="admin-empty"><Search size={22} /><h2>No encontramos artículos</h2><p>Probá buscar por nombre, SKU, categoría o variante.</p></div>}</section>{showExitDialog && <div className="admin-exit-backdrop" role="dialog" aria-modal="true"><div className="admin-exit-dialog"><p className="eyebrow">Cambios sin guardar</p><h2>¿Querés salir del editor?</h2><p>Hay productos modificados que todavía no guardaste. Podés aplicar todos los cambios antes de salir o descartarlos.</p><div className="admin-exit-actions"><button type="button" className="admin-exit-secondary" onClick={exitWithoutSaving}>Salir sin guardar</button><button type="button" className="admin-save-button" onClick={() => void saveAllAndExit()} disabled={updateProduct.isPending}><Save size={14} /> Guardar y salir</button></div></div></div>}</div>;
}
