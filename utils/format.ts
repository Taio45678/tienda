import { store } from "@/config/store";
export const money = (n: number) =>
  new Intl.NumberFormat(store.currency.locale, { style: "currency", currency: store.currency.code, maximumFractionDigits: 0 }).format(n);
export const discount = (price: number, old?: number) => (old && old > price ? Math.round((1 - price / old) * 100) : 0);
