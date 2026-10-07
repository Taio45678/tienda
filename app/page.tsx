import Link from "next/link";
import { store } from "@/config/store";
import { getProducts } from "@/services/products";
import ProductCard from "@/components/ProductCard";
import { waLink } from "@/utils/whatsapp";
const Grid = ({ title, items, href }: { title: string; items: ReturnType<typeof getProducts>; href: string }) => (
  <section className="mt-12"><div className="mb-4 flex items-end justify-between"><h2 className="text-xl font-bold">{title}</h2><Link href={href} className="text-sm underline">Ver todo</Link></div>
    <div className="grid grid-cols-2 gap-3 md:grid-cols-4">{items.slice(0, 4).map((p) => <ProductCard key={p.id} p={p} />)}</div></section>
);
export default function Home() {
  const all = getProducts();
  return (
    <>
      <section className="relative overflow-hidden rounded-3xl bg-neutral-900 text-white">
        <img src={store.hero.image} alt="" className="absolute inset-0 size-full object-cover opacity-40" />
        <div className="relative max-w-xl space-y-4 p-8 md:p-16"><h1 className="text-3xl font-bold md:text-5xl">{store.hero.title}</h1><p className="text-neutral-200">{store.hero.subtitle}</p>
          <Link href="/productos" className="btn bg-white text-brand">{store.hero.cta}</Link></div>
      </section>
      <section className="mt-10 grid grid-cols-2 gap-3 md:grid-cols-4">
        {store.categories.map((c) => <Link key={c.slug} href={`/productos?cat=${c.slug}`} className="grid min-h-24 place-items-center rounded-2xl border p-4 text-center font-semibold transition hover:bg-neutral-50">{c.name}</Link>)}
      </section>
      <Grid title="Destacados" items={all.filter((p) => p.featured)} href="/productos" />
      <section className="mt-12 rounded-3xl bg-accent p-8 text-white"><h2 className="text-xl font-bold">Ofertas de la semana</h2><p className="mt-1 text-sm">Precios rebajados por tiempo limitado.</p><Link href="/productos?ofertas=1" className="btn mt-4 bg-white text-brand">Ver ofertas</Link></section>
      <Grid title="Más vendidos" items={[...all].reverse()} href="/productos" />
      <section className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">{store.benefits.map((b) => <div key={b.title} className="rounded-2xl border p-5"><p className="font-semibold">{b.title}</p><p className="text-sm text-neutral-600">{b.text}</p></div>)}</section>
      <section className="mt-12 rounded-3xl bg-neutral-50 p-8 text-center"><h2 className="text-xl font-bold">¿Dudas? Hablemos</h2><a href={waLink()} target="_blank" rel="noopener" className="btn-wa mt-4">Escribir por WhatsApp</a></section>
    </>
  );
}
