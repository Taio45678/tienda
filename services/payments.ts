import { store } from "@/config/store";
import type { Order } from "@/types";
import { money } from "@/utils/format";
export type PaymentResult = { instructions?: string; redirectUrl?: string };
export interface PaymentProvider { id: string; pay(order: Order): Promise<PaymentResult> }
// Para sumar un método: implementá PaymentProvider, registralo acá y agregalo en config/store.ts.
const providers: Record<string, PaymentProvider> = {
  transfer: { id: "transfer", async pay(o) { return { instructions: `Transferí ${money(o.total)} al alias ${store.bank.alias} (CBU ${store.bank.cbu}, titular ${store.bank.holder}) y enviá el comprobante por WhatsApp.` }; } },
  cash: { id: "cash", async pay() { return { instructions: "Pagás en efectivo al retirar o recibir el pedido. Te contactamos para coordinar." }; } },
  mercadopago: { id: "mercadopago", async pay() { throw new Error("Mercado Pago no está conectado: crear la preferencia de pago en un endpoint del servidor y devolver su redirectUrl."); } },
};
export const getProvider = (id: string) => providers[id];
