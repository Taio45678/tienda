"use client";
import { useEffect, useMemo, useState } from "react";
import type { Product } from "@/types";
import ProductCard from "./ProductCard";
import { store } from "@/config/store";
export default function Catalog({ products, q0 = "", cat0 = "", offers0 = false }: { products: Product[]; q0?: string; cat0?: string; offers0?: boolean }) {
  const [q, setQ] = useState(q0); const [cat, setCat] = useState(cat0); const [offers, setOffers] = useState(offers0);
  const [stock, setStock] = useState(false); const [max, setMax] = useState(0); const [brand, setBrand] = useState(""); const [color, setColor] = useState(""); const [size, setSize] = useState("");
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const u = new URLSearchParams();
    if (q) u.set("q", q); if (cat) u.set("cat", cat); if (offers) u.set("ofertas", "1");
    const qs = u.toString();
    history.replaceState(null, "", qs ? `?${qs}` : location.pathname);
  }, [q, cat, offers]);
  const uniq = (f: (p: Product) => string[] | string | undefined) => Array.from(new Set(products.flatMap((p) => f(p) ?? []))).sort();
  const list = useMemo(() => {
    const t = q.trim().toLowerCase();
    return products.filter((p) =>
      (!t || [p.name, p.category, p.sku, ...p.tags].some((s) => s.toLowerCase().includes(t))) &&
      (!cat || p.category === cat) && (!offers || !!p.oldPrice) && (!stock || p.stock > 0) && (!max || p.price <= max) &&
      (!brand || p.brand === brand) && (!color || p.colors?.includes(color)) && (!size || p.sizes?.includes(size)));
  }, [products, q, cat, offers, stock, max, brand, color, size]);
  const sel = "h-11 w-full rounded-xl border px-3 text-sm";
  const filters = (
    <div className="grid gap-3">
      <label className="text-sm font-semibold">Categoría<select className={sel} value={cat} onChange={(e) => setCat(e.target.value)}><option value="">Todas</option>{store.categories.map((c) => <option key={c.slug} value={c.slug}>{c.name}</option>)}</select></label>
      <label className="text-sm font-semibold">Precio máximo<select className={sel} value={max} onChange={(e) => setMax(+e.target.value)}><option value={0}>Sin límite</option>{[20000, 50000, 100000].map((v) => <option key={v} value={v}>Hasta ${v.toLocaleString("es-AR")}</option>)}</select></label>
      <label className="text-sm font-semibold">Marca<select className={sel} value={brand} onChange={(e) => setBrand(e.target.value)}><option value="">Todas</option>{uniq((p) => p.brand).map((b) => <option key={b}>{b}</option>)}</select></label>
      <label className="text-sm font-semibold">Color<select className={sel} value={color} onChange={(e) => setColor(e.target.value)}><option value="">Todos</option>{uniq((p) => p.colors).map((b) => <option key={b}>{b}</option>)}</select></label>
      <label className="text-sm font-semibold">Talle<select className={sel} value={size} onChange={(e) => setSize(e.target.value)}><option value="">Todos</option>{uniq((p) => p.sizes).map((b) => <option key={b}>{b}</option>)}</select></label>
      <label className="flex min-h-11 items-center gap-2 text-sm"><input type="checkbox" className="size-5" checked={stock} onChange={(e) => setStock(e.target.checked)} />Solo con stock</label>
      <label className="flex min-h-11 items-center gap-2 text-sm"><input type="checkbox" className="size-5" checked={offers} onChange={(e) => setOffers(e.target.checked)} />Solo ofertas</label>
    </div>
  );
  return (
    <div className="grid gap-6 lg:grid-cols-[240px_1fr]">
      <aside className="hidden lg:block">{filters}</aside>
      <div>
        <div className="mb-4 flex gap-2">
          <label className="sr-only" htmlFor="cq">Buscar</label>
          <input id="cq" type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Buscar nombre, categoría, SKU o tag" className="h-11 min-w-0 flex-1 rounded-xl border px-4 text-base" />
          <button onClick={() => setOpen(true)} className="btn-ghost lg:hidden">Filtros</button>
        </div>
        <p className="mb-3 text-sm text-neutral-500">{list.length} productos</p>
        {list.length ? <div className="grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-4">{list.map((p) => <ProductCard key={p.id} p={p} />)}</div> : <p className="py-16 text-center text-neutral-500">No encontramos productos con esos filtros.</p>}
      </div>
      {open && (
        <div role="dialog" aria-modal="true" aria-label="Filtros" className="fixed inset-0 z-50 flex items-end bg-black/50 lg:hidden">
          <div className="max-h-[85vh] w-full overflow-y-auto rounded-t-3xl bg-white p-5">
            <div className="mb-3 flex items-center justify-between"><h2 className="text-lg font-bold">Filtros</h2><button onClick={() => setOpen(false)} aria-label="Cerrar" className="size-11">✕</button></div>
            {filters}<button onClick={() => setOpen(false)} className="btn-primary mt-4 w-full">Ver {list.length} productos</button>
          </div>
        </div>
      )}
    </div>
  );
}
