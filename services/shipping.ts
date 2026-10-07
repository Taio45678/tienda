import { store } from "@/config/store";
// Costo de envío según método, zona y subtotal. Agregá reglas (Correo Argentino, etc.) acá.
export function shippingCost(method: string, zone: string, subtotal: number) {
  const m = store.shipping.find((s) => s.id === method) as { id: string; price: number; freeOver?: number } | undefined;
  if (!m || m.id === "pickup") return 0;
  if (m.freeOver && subtotal >= m.freeOver) return 0;
  return store.shippingZones.find((z) => z.id === zone)?.price ?? m.price;
}
