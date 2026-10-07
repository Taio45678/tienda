"use client";
import Link from "next/link";
import { useCart } from "@/hooks/useCart";
import { getProductById } from "@/services/products";
import { money } from "@/utils/format";
import { waLink } from "@/utils/whatsapp";
import { store } from "@/config/store";
export default function CartPage() {
  const { lines, ready, setQty, remove, clear } = useCart();
  const rows = lines.flatMap((l) => { const p = getProductById(l.id); return p ? [{ l, p }] : []; });
  const subtotal = rows.reduce((a, { l, p }) => a + l.qty * p.price, 0);
  const msg = `Hola! Quiero comprar estos productos:\n\n${rows.map(({ l, p }) => `• ${p.name}${l.size ? ` (${l.size}` : ""}${l.color ? `${l.size ? ", " : " ("}${l.color}` : ""}${l.size || l.color ? ")" : ""} x${l.qty} - ${money(p.price * l.qty)}`).join("\n")}\n\nTotal: ${money(subtotal)}`;
  if (!ready) return <p>Cargando…</p>;
  if (!rows.length) return <div className="py-16 text-center"><p className="mb-4 text-neutral-600">Tu carrito está vacío.</p><Link href="/productos" className="btn-primary">Continuar comprando</Link></div>;
  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_340px]">
      <div><h1 className="mb-4 text-2xl font-bold">Carrito</h1>
        <ul className="divide-y rounded-2xl border">
          {rows.map(({ l, p }) => (
            <li key={l.key} className="flex gap-3 p-3">
              <img src={p.images[0]} alt={p.name} className="size-20 shrink-0 rounded-xl object-cover" />
              <div className="min-w-0 flex-1"><p className="truncate font-medium">{p.name}</p><p className="text-xs text-neutral-500">{[l.size, l.color].filter(Boolean).join(" · ")}</p>
                <div className="mt-2 flex items-center justify-between gap-2">
                  <div className="flex items-center rounded-xl border"><button aria-label="Menos" onClick={() => setQty(l.key, l.qty - 1)} className="size-11">−</button><span className="w-8 text-center">{l.qty}</span><button aria-label="Más" onClick={() => setQty(l.key, Math.min(p.stock, l.qty + 1))} className="size-11">+</button></div>
                  <span className="font-semibold">{money(p.price * l.qty)}</span></div></div>
              <button aria-label={`Eliminar ${p.name}`} onClick={() => remove(l.key)} className="size-11 shrink-0 self-start">✕</button>
            </li>))}
        </ul>
        <div className="mt-4 flex gap-2"><Link href="/productos" className="btn-ghost">Continuar comprando</Link><button onClick={clear} className="btn-ghost">Vaciar carrito</button></div>
      </div>
      <aside className="h-fit space-y-3 rounded-2xl border p-5 lg:sticky lg:top-24">
        <div className="flex justify-between"><span>Subtotal</span><span>{money(subtotal)}</span></div>
        <div className="flex justify-between text-sm text-neutral-500"><span>Envío</span><span>Se calcula en el checkout</span></div>
        <div className="flex justify-between border-t pt-3 text-lg font-bold"><span>Total</span><span>{money(subtotal)}</span></div>
        <Link href="/checkout" className="btn-primary w-full">Finalizar compra</Link>
        <a href={waLink(msg)} target="_blank" rel="noopener" className="btn-wa w-full">Comprar por WhatsApp</a>
        <p className="text-center text-xs text-neutral-500">{store.paymentMethods.filter((m) => m.enabled).map((m) => m.label).join(" · ")}</p>
      </aside>
    </div>
  );
}
