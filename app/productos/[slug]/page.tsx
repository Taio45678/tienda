import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProduct, getProducts, getRelated } from "@/services/products";
import ProductView from "@/components/ProductView";
import ProductCard from "@/components/ProductCard";
import { store } from "@/config/store";
export const generateStaticParams = () => getProducts().map((p) => ({ slug: p.slug }));
export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const p = getProduct(params.slug);
  return p ? { title: p.name, description: p.description, openGraph: { title: p.name, description: p.description, images: [p.images[0]] } } : {};
}
export default function Page({ params }: { params: { slug: string } }) {
  const p = getProduct(params.slug);
  if (!p) notFound();
  const ld = { "@context": "https://schema.org", "@type": "Product", name: p.name, sku: p.sku, image: p.images, description: p.description,
    offers: { "@type": "Offer", priceCurrency: store.currency.code, price: p.price, availability: p.stock ? "https://schema.org/InStock" : "https://schema.org/OutOfStock" } };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      <ProductView p={p} />
      <section className="mt-14"><h2 className="mb-4 text-xl font-bold">Productos relacionados</h2>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">{getRelated(p.slug).map((r) => <ProductCard key={r.id} p={r} />)}</div></section>
    </>
  );
}
