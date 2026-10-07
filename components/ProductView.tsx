"use client";
import { useState } from "react";
import type { Product } from "@/types";
import { useCart } from "@/hooks/useCart";
import { discount, money } from "@/utils/format";
import { waLink } from "@/utils/whatsapp";
import { store } from "@/config/store";
export default function ProductView({ p }: { p: Product }) {
  const { add } = useCart();
  const [img, setImg] = useState(0);
  const [qty, setQty] = useState(1);
  const [size, setSize] = useState(p.sizes?.[0]);
  const [color, setColor] = useState(p.colors?.[0]);
  const [added, setAdded] = useState(false);
  const off = discount(p.price, p.oldPrice);
  const out = p.stock === 0;
  const msg = () => `Hola! Quiero consultar/comprar este producto:\n\nProducto: ${p.name}\nPrecio: ${money(p.price)}\nCantidad: ${qty}${size ? `\nTalle: ${size}` : ""}${color ? `\nColor: ${color}` : ""}\nLink: ${store.url}/productos/${p.slug}`;
  const chip = (on: boolean) => `min-h-11 min-w-11 rounded-xl border px-3 text-sm ${on ? "border-brand bg-brand text-white" : "hover:bg-neutral-50"}`;
  return (
    <div className="grid gap-6 md:grid-cols-2 md:gap-10">
      <div>
        <div className="aspect-square overflow-hidden rounded-2xl bg-neutral-100"><img src={p.images[img]} alt={p.name} className="size-full object-cover" /></div>
        <div className="mt-3 grid grid-cols-4 gap-2">
          {p.images.map((s, i) => <button key={i} onClick={() => setImg(i)} aria-label={`Imagen ${i + 1}`} className={`aspect-square overflow-hidden rounded-xl border-2 ${i === img ? "border-brand" : "border-transparent"}`}><img src={s} alt="" loading="lazy" className="size-full object-cover" /></button>)}
        </div>
      </div>
      <div className="space-y-5">
        <div><h1 className="text-2xl font-bold">{p.name}</h1><p className="text-xs text-neutral-500">SKU {p.sku} · {p.brand}</p></div>
        <div className="flex flex-wrap items-baseline gap-3"><span className="text-3xl font-bold">{money(p.price)}</span>
          {p.oldPrice && <span className="text-neutral-500 line-through">{money(p.oldPrice)}</span>}
          {off > 0 && <span className="rounded-full bg-red-600 px-2 py-0.5 text-xs font-semibold text-white">-{off}%</span>}</div>
        <p className="text-neutral-700">{p.description}</p>
        {p.sizes && <div><p className="mb-2 text-sm font-semibold">Talle</p><div className="flex flex-wrap gap-2">{p.sizes.map((s) => <button key={s} onClick={() => setSize(s)} aria-pressed={s === size} className={chip(s === size)}>{s}</button>)}</div></div>}
        {p.colors && <div><p className="mb-2 text-sm font-semibold">Color</p><div className="flex flex-wrap gap-2">{p.colors.map((c) => <button key={c} onClick={() => setColor(c)} aria-pressed={c === color} className={chip(c === color)}>{c}</button>)}</div></div>}
        <div className="flex items-center gap-3"><span className="text-sm font-semibold">Cantidad</span>
          <div className="flex items-center rounded-xl border">
            <button aria-label="Menos" onClick={() => setQty(Math.max(1, qty - 1))} className="size-11">−</button>
            <span className="w-8 text-center" aria-live="polite">{qty}</span>
            <button aria-label="Más" onClick={() => setQty(Math.min(p.stock || 1, qty + 1))} className="size-11">+</button></div>
          <span className="text-xs text-neutral-500">{out ? "Sin stock" : `${p.stock} disponibles`}</span></div>
        <div className="grid gap-2 sm:grid-cols-2">
          <button disabled={out} onClick={() => { add(p.id, qty, size, color); setAdded(true); setTimeout(() => setAdded(false), 1500); }} className="btn-primary disabled:opacity-40">{added ? "¡Agregado!" : "Agregar al carrito"}</button>
          <a href={waLink(msg())} target="_blank" rel="noopener" className="btn-wa">Comprar por WhatsApp</a></div>
        <ul className="list-disc space-y-1 pl-5 text-sm">{p.features.map((f) => <li key={f}>{f}</li>)}</ul>
        <div className="rounded-xl bg-neutral-50 p-4 text-sm"><p>🚚 {store.shipping.map((s) => s.label).join(" · ")}</p><p className="mt-1">💳 {store.paymentMethods.filter((m) => m.enabled).map((m) => m.label).join(" · ")}</p></div>
      </div>
    </div>
  );
}
