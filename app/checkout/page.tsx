"use client";
import { FormEvent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { store } from "@/config/store";
import { useCart } from "@/hooks/useCart";
import { getProductById } from "@/services/products";
import { shippingCost } from "@/services/shipping";
import { createOrder } from "@/services/orders";
import { getProvider } from "@/services/payments";
import { money } from "@/utils/format";
const PROV = ["Buenos Aires", "CABA", "Catamarca", "Chaco", "Chubut", "Córdoba", "Corrientes", "Entre Ríos", "Formosa", "Jujuy", "La Pampa", "La Rioja", "Mendoza", "Misiones", "Neuquén", "Río Negro", "Salta", "San Juan", "San Luis", "Santa Cruz", "Santa Fe", "Santiago del Estero", "Tierra del Fuego", "Tucumán"];
const F: [string, string, string, string][] = [["nombre", "Nombre", "text", "given-name"], ["apellido", "Apellido", "text", "family-name"], ["telefono", "Teléfono", "tel", "tel"], ["email", "Email", "email", "email"], ["direccion", "Dirección", "text", "street-address"], ["ciudad", "Ciudad", "text", "address-level2"], ["cp", "Código postal", "text", "postal-code"]];
const inp = "mt-1 h-11 w-full rounded-xl border px-3 text-base";
export default function Checkout() {
  const { lines, ready, clear } = useCart();
  const router = useRouter();
  const [method, setMethod] = useState(store.shipping[0].id);
  const [zone, setZone] = useState(store.shippingZones[0].id);
  const methods = store.paymentMethods.filter((m) => m.enabled);
  const [pay, setPay] = useState(methods[0]?.id ?? "");
  const [err, setErr] = useState("");
  const [busy, setBusy] = useState(false);
  const rows = lines.flatMap((l) => { const p = getProductById(l.id); return p ? [{ l, p }] : []; });
  const subtotal = rows.reduce((a, { l, p }) => a + l.qty * p.price, 0);
  const cost = shippingCost(method, zone, subtotal);
  if (!ready) return <p>Cargando…</p>;
  if (!rows.length) return <div className="py-16 text-center"><p className="mb-4">Tu carrito está vacío.</p><Link href="/productos" className="btn-primary">Ver productos</Link></div>;
  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault(); setErr(""); setBusy(true);
    const fd = Object.fromEntries(new FormData(e.currentTarget)) as Record<string, string>;
    try {
      const order = createOrder({ customer: fd, shipping: { method, zone: method === "home" ? zone : undefined, cost }, payment: pay,
        items: rows.map(({ l, p }) => ({ id: p.id, name: p.name, price: p.price, qty: l.qty, size: l.size, color: l.color })), subtotal, total: subtotal + cost });
      const r = await getProvider(pay).pay(order);
      sessionStorage.setItem(`pay-${order.id}`, r.instructions ?? "");
      if (r.redirectUrl) { location.href = r.redirectUrl; return; }
      clear(); router.push(`/pedido/${order.id}`);
    } catch (x) { setErr((x as Error).message); setBusy(false); }
  }
  return (
    <form onSubmit={submit} className="grid gap-6 lg:grid-cols-[1fr_340px]">
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">Finalizar compra</h1>
        <fieldset className="grid gap-3 sm:grid-cols-2"><legend className="mb-2 font-semibold">Tus datos</legend>
          {F.map(([n, l, t, a]) => <label key={n} className="text-sm">{l}<input name={n} type={t} autoComplete={a} required className={inp} /></label>)}
          <label className="text-sm">Provincia<select name="provincia" required autoComplete="address-level1" defaultValue="Santiago del Estero" className={inp}>{PROV.map((p) => <option key={p}>{p}</option>)}</select></label>
        </fieldset>
        <fieldset className="space-y-2"><legend className="mb-2 font-semibold">Envío</legend>
          {store.shipping.map((s) => <label key={s.id} className="flex min-h-11 items-center gap-3 rounded-xl border p-3"><input type="radio" name="envio" checked={method === s.id} onChange={() => setMethod(s.id)} className="size-5" />{s.label}</label>)}
          {method === "home" && <label className="block text-sm">Zona<select value={zone} onChange={(e) => setZone(e.target.value)} className={inp}>{store.shippingZones.map((z) => <option key={z.id} value={z.id}>{z.label} ({money(z.price)})</option>)}</select></label>}
        </fieldset>
        <fieldset className="space-y-2"><legend className="mb-2 font-semibold">Método de pago</legend>
          {methods.map((m) => <label key={m.id} className="flex min-h-11 items-center gap-3 rounded-xl border p-3"><input type="radio" name="pago" checked={pay === m.id} onChange={() => setPay(m.id)} className="size-5" />{m.label}</label>)}
        </fieldset>
      </div>
      <aside className="h-fit space-y-2 rounded-2xl border p-5 lg:sticky lg:top-24">
        <h2 className="font-semibold">Resumen</h2>
        {rows.map(({ l, p }) => <div key={l.key} className="flex justify-between gap-2 text-sm"><span className="truncate">{p.name} ×{l.qty}</span><span>{money(p.price * l.qty)}</span></div>)}
        <div className="flex justify-between border-t pt-2 text-sm"><span>Subtotal</span><span>{money(subtotal)}</span></div>
        <div className="flex justify-between text-sm"><span>Envío</span><span>{cost ? money(cost) : "Gratis"}</span></div>
        <div className="flex justify-between border-t pt-2 text-lg font-bold"><span>Total</span><span>{money(subtotal + cost)}</span></div>
        {err && <p role="alert" className="text-sm text-red-600">{err}</p>}
        <button disabled={busy} className="btn-primary w-full disabled:opacity-50">{busy ? "Procesando…" : "Confirmar pedido"}</button>
      </aside>
    </form>
  );
}
