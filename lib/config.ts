// EDITA AQUÍ los datos reales. Deja "" para ocultar un campo. No hay datos inventados.
export const site = {
  name: "VERALTO",
  fullName: "VERALTO Soluciones Médicas",
  url: "https://www.example.com", // ← tu dominio
  whatsapp: "", // formato internacional sin "+", ej. 521667XXXXXXX
  whatsappMessage: "Hola, me gustaría agendar una valoración en VERALTO.",
  phone: "",
  email: "",
  address: "", // dirección completa cuando esté disponible
  city: "Culiacán, Sinaloa, México",
  hours: "", // ej. "Lunes a viernes, 9:00–18:00"
  mapEmbedUrl: "", // URL "Insertar mapa" de Google Maps
  formEndpoint: "/api/cita", // reemplazar por tu backend/CRM
};
export const waLink = () =>
  site.whatsapp ? `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(site.whatsappMessage)}` : "#contacto";

export const doctor = {
  photo: "", name: "", specialty: "", license: "", certifications: [] as string[],
};
