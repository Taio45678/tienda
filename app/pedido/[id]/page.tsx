"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { getOrder } from "@/services/orders";
import { money } from "@/utils/format";
import { waLink } from "@/utils/whatsapp";
import type { Order } from "@/types";
export default function Pedido() {
  const { id } = useParams<{ id: string }>();
  const [o, setO] = useState<Order | null | undefined>();
  const [info, setInfo] = useState("");
  useEffect(() => { setO(getOrder(id) ?? null); setInfo(sessionStorage.getItem(`pay-${id}`) ?? ""); }, [id]);
  if (o === undefined) return <p>Cargando…</p>;
  if (!o) return <p>No encontramos este pedido en este dispositivo. <Link href="/" className="underline">Volver</Link></p>;
  const msg = `Hola! Hice el pedido #${o.id} por ${money(o.total)}. ${o.items.map((i) => `${i.name} x${i.qty}`).join(", ")}`;
  return (
    <div className="mx-auto max-w-xl space-y-4">
      <h1 className="text-2xl font-bold">¡Gracias, {o.customer.nombre}!</h1>
      <p>Pedido <b>#{o.id}</b> · Estado: {o.status}</p>
      {info && <p className="rounded-xl bg-neutral-50 p-4 text-sm">{info}</p>}
      <ul className="divide-y rounded-2xl border">{o.items.map((i, k) => <li key={k} className="flex justify-between gap-2 p-3 text-sm"><span>{i.name} ×{i.qty}</span><span>{money(i.price * i.qty)}</span></li>)}</ul>
      <p className="text-right font-bold">Total: {money(o.total)}</p>
      <div className="flex flex-wrap gap-2"><a href={waLink(msg)} target="_blank" rel="noopener" className="btn-wa">Enviar por WhatsApp</a><Link href="/productos" className="btn-ghost">Seguir comprando</Link></div>
    </div>
  );
}
