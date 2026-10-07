"use client";
import Link from "next/link";
import { useState } from "react";
import { store } from "@/config/store";
import { useCart } from "@/hooks/useCart";
import { waLink } from "@/utils/whatsapp";
export default function Header() {
  const [open, setOpen] = useState(false);
  const { count } = useCart();
  return (
    <header className="sticky top-0 z-40 border-b bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center gap-2 px-4 py-2">
        <button aria-label="Abrir menú" aria-expanded={open} onClick={() => setOpen(!open)} className="grid size-11 place-items-center rounded-xl md:hidden">☰</button>
        <Link href="/" className="truncate text-lg font-bold">{store.name}</Link>
        <form action="/productos" role="search" className="mx-2 hidden flex-1 md:block">
          <label htmlFor="q" className="sr-only">Buscar productos</label>
          <input id="q" name="q" type="search" placeholder="Buscar por nombre, categoría, SKU o tag" className="h-11 w-full rounded-xl border px-4 text-sm" />
        </form>
        <nav className="ml-auto hidden items-center gap-4 text-sm md:flex">
          {store.categories.map((c) => <Link key={c.slug} href={`/productos?cat=${c.slug}`} className="hover:underline">{c.name}</Link>)}
        </nav>
        <a href={waLink()} target="_blank" rel="noopener" className="btn-wa ml-auto px-3 md:ml-0" aria-label="WhatsApp">WA</a>
        <Link href="/carrito" aria-label={`Carrito, ${count} productos`} className="relative grid size-11 place-items-center rounded-xl border">
          🛒{count > 0 && <span className="absolute -right-1 -top-1 grid min-w-5 place-items-center rounded-full bg-accent px-1 text-xs text-white">{count}</span>}
        </Link>
      </div>
      <form action="/productos" role="search" className="px-4 pb-2 md:hidden">
        <label htmlFor="qm" className="sr-only">Buscar productos</label>
        <input id="qm" name="q" type="search" placeholder="Buscar productos" className="h-11 w-full rounded-xl border px-4 text-base" />
      </form>
      {open && (
        <nav className="grid gap-1 border-t p-3 md:hidden">
          {store.categories.map((c) => <Link key={c.slug} onClick={() => setOpen(false)} href={`/productos?cat=${c.slug}`} className="rounded-xl px-3 py-3 hover:bg-neutral-100">{c.name}</Link>)}
          <Link onClick={() => setOpen(false)} href="/productos?ofertas=1" className="rounded-xl px-3 py-3 font-semibold text-accent">Ofertas</Link>
        </nav>
      )}
    </header>
  );
}
