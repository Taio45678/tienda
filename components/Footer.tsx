import { store } from "@/config/store";
import { waLink } from "@/utils/whatsapp";
export default function Footer() {
  return (
    <footer id="contacto" className="mt-16 bg-brand text-neutral-200">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:grid-cols-2 lg:grid-cols-3">
        <div><p className="text-lg font-bold text-white">{store.name}</p><p className="mt-2 text-sm">{store.tagline}</p></div>
        <div className="space-y-1 text-sm"><p className="font-semibold text-white">Contacto</p><p>{store.email}</p><p>{store.address}</p>
          <a href={waLink()} target="_blank" rel="noopener" className="btn-wa mt-3">Escribinos por WhatsApp</a></div>
        <div className="space-y-1 text-sm"><p className="font-semibold text-white">Seguinos</p>
          <a className="block underline" href={store.social.instagram}>Instagram</a><a className="block underline" href={store.social.facebook}>Facebook</a></div>
      </div>
      <p className="border-t border-white/10 py-4 text-center text-xs">© {new Date().getFullYear()} {store.name}</p>
    </footer>
  );
}
