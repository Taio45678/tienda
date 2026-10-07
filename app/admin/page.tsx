"use client";
import { useEffect, useState } from "react";
import { getProducts } from "@/services/products";
import { listOrders, setStatus } from "@/services/orders";
import { money } from "@/utils/format";
import type { Order, OrderStatus } from "@/types";
const ST: OrderStatus[] = ["pendiente", "pagado", "enviado", "entregado", "cancelado"];
export default function Admin() {
  const [orders, setOrders] = useState<Order[]>([]);
  useEffect(() => setOrders(listOrders()), []);
  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold">Administración</h1>
      <p className="rounded-xl bg-amber-50 p-3 text-sm">Sin autenticación y con pedidos guardados en este navegador. Antes de publicar: agregar login (NextAuth/Clerk), base de datos (Postgres + Prisma) y almacenamiento de imágenes (S3/Cloudinary), y reemplazar los servicios en <code>services/</code>.</p>
      <section><h2 className="mb-2 font-semibold">Pedidos</h2>
        {!orders.length ? <p className="text-sm text-neutral-500">Sin pedidos.</p> : <div className="overflow-x-auto rounded-2xl border"><table className="w-full min-w-[560px] text-left text-sm">
          <thead className="bg-neutral-50"><tr><th className="p-3">#</th><th>Cliente</th><th>Total</th><th>Estado</th></tr></thead>
          <tbody>{orders.map((o) => <tr key={o.id} className="border-t"><td className="p-3">{o.id}</td><td>{o.customer.nombre} {o.customer.apellido}</td><td>{money(o.total)}</td>
            <td><label className="sr-only" htmlFor={o.id}>Estado</label><select id={o.id} value={o.status} onChange={(e) => { setStatus(o.id, e.target.value as OrderStatus); setOrders(listOrders()); }} className="h-10 rounded-lg border px-2">{ST.map((s) => <option key={s}>{s}</option>)}</select></td></tr>)}</tbody></table></div>}
      </section>
      <section><h2 className="mb-2 font-semibold">Productos</h2>
        <div className="overflow-x-auto rounded-2xl border"><table className="w-full min-w-[560px] text-left text-sm">
          <thead className="bg-neutral-50"><tr><th className="p-3">Producto</th><th>SKU</th><th>Precio</th><th>Stock</th></tr></thead>
          <tbody>{getProducts().map((p) => <tr key={p.id} className="border-t"><td className="p-3">{p.name}</td><td>{p.sku}</td><td>{money(p.price)}</td><td>{p.stock}</td></tr>)}</tbody></table></div>
        <p className="mt-2 text-xs text-neutral-500">Alta, edición y baja de productos: implementar en services/products.ts contra la base de datos.</p>
      </section>
    </div>
  );
}
