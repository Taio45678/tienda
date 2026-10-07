import type { MetadataRoute } from "next";
import { store } from "@/config/store";
import { getProducts } from "@/services/products";
export default function sitemap(): MetadataRoute.Sitemap {
  return [{ url: store.url }, { url: `${store.url}/productos` }, ...getProducts().map((p) => ({ url: `${store.url}/productos/${p.slug}` }))];
}
