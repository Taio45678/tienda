import { store } from "@/config/store";
export const waLink = (text = "Hola! Quiero hacer una consulta.") =>
  `https://wa.me/${store.whatsappNumber}?text=${encodeURIComponent(text)}`;
