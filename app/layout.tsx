import type { Metadata } from "next";
import "./globals.css";
import { store } from "@/config/store";
import { CartProvider } from "@/hooks/useCart";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";
export const metadata: Metadata = {
  metadataBase: new URL(store.url),
  title: { default: store.name, template: `%s | ${store.name}` },
  description: store.tagline,
  openGraph: { title: store.name, description: store.tagline, type: "website", locale: "es_AR" },
};
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es-AR" style={{ "--brand": store.colors.brand, "--accent": store.colors.accent } as React.CSSProperties}>
      <body className="font-sans">
        <CartProvider><Header /><main className="mx-auto min-h-[60vh] max-w-7xl px-4 py-6">{children}</main><Footer /><WhatsAppFloat /></CartProvider>
      </body>
    </html>
  );
}
