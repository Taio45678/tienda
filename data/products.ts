import type { Product } from "@/types";
// Para agregar un producto: sumá un item acá (luego se reemplaza por una base de datos).
const img = (t: string) => [1, 2, 3].map((n) => `https://placehold.co/800x800/f3f4f6/111827?text=${encodeURIComponent(t)}+${n}`);
const mk = (id: number, name: string, category: string, price: number, extra: Partial<Product> = {}): Product => ({
  id: String(id), slug: name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-"),
  name, description: `${name}: diseño cómodo y de buena calidad, ideal para el día a día.`, price, images: img(name), category,
  stock: 10, sku: `SKU-${1000 + id}`, brand: "Marca A", tags: [category, "nuevo"], features: ["Material de calidad", "Fácil de lavar", "Garantía de cambio"], ...extra,
});
export const products: Product[] = [
  mk(1, "Remera Oversize", "remeras", 25000, { sizes: ["S", "M", "L"], colors: ["Negro", "Blanco"], featured: true, isNew: true }),
  mk(2, "Remera Básica", "remeras", 18000, { oldPrice: 22000, sizes: ["S", "M", "L", "XL"], colors: ["Gris", "Azul"] }),
  mk(3, "Jean Recto", "pantalones", 52000, { sizes: ["38", "40", "42"], colors: ["Azul"], featured: true, brand: "Marca B" }),
  mk(4, "Jogger Algodón", "pantalones", 38000, { oldPrice: 45000, sizes: ["M", "L"], colors: ["Negro", "Gris"], brand: "Marca B" }),
  mk(5, "Zapatillas Urbanas", "calzado", 89000, { sizes: ["39", "40", "41", "42"], colors: ["Blanco"], featured: true, isNew: true }),
  mk(6, "Zapatillas Running", "calzado", 99000, { oldPrice: 120000, sizes: ["40", "41", "42"], colors: ["Negro"], stock: 0 }),
  mk(7, "Gorra Clásica", "accesorios", 12000, { colors: ["Negro", "Beige"], featured: true }),
  mk(8, "Mochila Urbana", "accesorios", 45000, { oldPrice: 55000, colors: ["Negro"], brand: "Marca C" }),
];
