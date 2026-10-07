import Link from "next/link";
import type { Product } from "@/types";
import { discount, money } from "@/utils/format";
export default function ProductCard({ p }: { p: Product }) {
  const off = discount(p.price, p.oldPrice);
  return (
    <Link href={`/productos/${p.slug}`} className="group flex h-full flex-col overflow-hidden rounded-2xl border bg-white transition hover:shadow-md">
      <div className="relative aspect-square overflow-hidden bg-neutral-100">
        <img src={p.images[0]} alt={p.name} loading="lazy" className="size-full object-cover transition duration-300 group-hover:scale-105" />
        <div className="absolute left-2 top-2 flex flex-col gap-1 text-xs font-semibold">
          {off > 0 && <span className="rounded-full bg-red-600 px-2 py-0.5 text-white">-{off}%</span>}
          {p.isNew && <span className="rounded-full bg-accent px-2 py-0.5 text-white">Nuevo</span>}
          {p.stock === 0 && <span className="rounded-full bg-neutral-800 px-2 py-0.5 text-white">Sin stock</span>}
        </div>
      </div>
      <div className="flex flex-1 flex-col gap-1 p-3">
        <h3 className="line-clamp-2 min-h-10 text-sm font-medium">{p.name}</h3>
        <div className="mt-auto flex flex-wrap items-baseline gap-x-2"><span className="font-bold">{money(p.price)}</span>
          {p.oldPrice && <span className="text-xs text-neutral-500 line-through">{money(p.oldPrice)}</span>}</div>
      </div>
    </Link>
  );
}
