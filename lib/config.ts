// EDITA AQUÍ los datos reales. Deja "" para ocultar un campo. No hay datos inventados.
export const site = {
  name: "ARTHEA",
  fullName: "ARTHEA Soluciones Médicas",
  url: "https://arthea.vercel.app", // ← cambiar al dominio propio cuando exista
  whatsapp: "526674147752", // formato internacional sin "+"
  whatsappDisplay: "667 414 7752",
  whatsappMessage: "Hola, me gustaría agendar una valoración en ARTHEA.",
  phone: "",
  email: "",
  address: "", // dirección completa cuando esté disponible
  city: "Culiacán, Sinaloa",
  hours: "Lunes a viernes, 7:00 a 17:00",
  mapEmbedUrl: "", // URL "Insertar mapa" de Google Maps
};

/** Agenda. Culiacán usa UTC-7 todo el año (America/Mazatlan, sin horario de verano). */
export const booking = {
  timeZone: "America/Mazatlan",
  utcOffset: "-07:00",
  days: [1, 2, 3, 4, 5], // lunes a viernes
  open: 7, // 7:00
  close: 17, // 17:00 (la última cita termina a esta hora)
  slotMinutes: 60, // duración de la valoración — ajustar si es distinta
  minNoticeHours: 2, // anticipación mínima para agendar
  daysAhead: 21, // cuántos días hacia adelante se pueden reservar
};

export const services = [
  { id: "metabolica", name: "Medicina metabólica", short: "Salud metabólica", desc: "Valoración de la salud metabólica desde una perspectiva médica integral, con tratamiento personalizado." },
  { id: "peso", name: "Control de peso y salud metabólica", short: "Control de peso", desc: "Planes de atención individualizados que define el médico después de una evaluación previa." },
  { id: "peptidos", name: "Tratamientos con péptidos", short: "Péptidos", desc: "Realizamos tratamientos con péptidos. Su indicación se decide exclusivamente en consulta, tras la valoración médica." },
  { id: "integral", name: "Evaluación médica integral", short: "Evaluación integral", desc: "Revisión de antecedentes, hábitos y factores de riesgo para orientar cada decisión clínica." },
  { id: "farmacologico", name: "Seguimiento farmacológico", short: "Seguimiento", desc: "Acompañamiento médico durante todo tu proceso. Cada plan se ajusta a tu evolución." },
  { id: "estudios", name: "Estudios clínicos y diagnóstico", short: "Estudios", desc: "Estudios complementarios con aliados especializados, solo cuando el médico los considera pertinentes." },
] as const;

/** Enlace de WhatsApp con mensaje prellenado. Sin número configurado, lleva a la agenda. */
export const waLink = (message: string = site.whatsappMessage) =>
  site.whatsapp ? `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(message)}` : "#agenda";

export const doctor = {
  photo: "/images/medico.jpg",
  name: "Magda Luz Rizo Ocampo",
  specialty: "Medicina Estética, Longevidad y Obesidad",
  license: "9791236",
  certifications: [] as string[], // se muestran solo cuando hay certificaciones comprobables
};
