import type { Metadata } from "next";
import Catalog from "@/components/Catalog";
import { getProducts } from "@/services/products";
export const metadata: Metadata = { title: "Productos", description: "Catálogo completo de productos." };
export default function Page({ searchParams }: { searchParams: { q?: string; cat?: string; ofertas?: string } }) {
  return (<><h1 className="mb-4 text-2xl font-bold">Productos</h1>
    <Catalog products={getProducts()} q0={searchParams.q} cat0={searchParams.cat} offers0={searchParams.ofertas === "1"} /></>);
}
