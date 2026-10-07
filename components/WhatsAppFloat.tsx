import { waLink } from "@/utils/whatsapp";
export default function WhatsAppFloat() {
  return <a href={waLink()} target="_blank" rel="noopener" aria-label="Hablar por WhatsApp" className="fixed bottom-4 right-4 z-50 grid size-14 place-items-center rounded-full bg-[#25D366] text-xl font-bold text-white shadow-lg transition hover:scale-105">WA</a>;
}
