// Único lugar para cambiar datos de la tienda.
export const store = {
  name: "Mi Tienda",
  tagline: "Moda y accesorios con atención personalizada",
  url: "https://mitienda.com",
  whatsappNumber: "5493851234567", // código país + área + número, sin + ni espacios
  email: "hola@mitienda.com",
  address: "Santiago del Estero, Argentina",
  social: { instagram: "https://instagram.com/", facebook: "https://facebook.com/" },
  colors: { brand: "#111827", accent: "#16a34a" },
  currency: { code: "ARS", locale: "es-AR" },
  hero: {
    title: "Tu estilo, simple y directo",
    subtitle: "Nuevos ingresos con envíos a todo el país.",
    cta: "Ver productos",
    image: "https://placehold.co/1200x700/e5e7eb/111827?text=Banner",
  },
  categories: [
    { slug: "remeras", name: "Remeras" },
    { slug: "pantalones", name: "Pantalones" },
    { slug: "calzado", name: "Calzado" },
    { slug: "accesorios", name: "Accesorios" },
  ],
  shipping: [
    { id: "home", label: "Envío a domicilio", price: 5000, freeOver: 80000 },
    { id: "pickup", label: "Retiro en local", price: 0 },
  ],
  shippingZones: [
    { id: "sde", label: "Santiago del Estero", price: 3000 },
    { id: "norte", label: "Norte argentino", price: 6000 },
    { id: "resto", label: "Resto del país", price: 9000 },
  ],
  bank: { alias: "mi.tienda", cbu: "0000000000000000000000", holder: "Mi Tienda" },
  paymentMethods: [
    { id: "transfer", label: "Transferencia bancaria", enabled: true },
    { id: "cash", label: "Efectivo", enabled: true },
    { id: "mercadopago", label: "Mercado Pago", enabled: false },
  ],
  benefits: [
    { title: "Envíos", text: "A todo el país" },
    { title: "Medios de pago", text: "Transferencia, efectivo y más" },
    { title: "Compra segura", text: "Tus datos protegidos" },
    { title: "Atención personalizada", text: "Te respondemos por WhatsApp" },
  ],
};
