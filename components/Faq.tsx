import { Plus } from "lucide-react";

const faqs = [
  ["¿Cómo puedo agendar una valoración?", "Puedes solicitar tu cita desde el formulario de contacto o por WhatsApp. Nuestro equipo te confirmará disponibilidad de horario."],
  ["¿En qué consiste la primera consulta?", "Es una valoración médica donde el médico conversa contigo, revisa tus antecedentes y define si son necesarios estudios o seguimiento."],
  ["¿Qué estudios podrían solicitarme?", "Dependen de tu evaluación individual. Solo se solicitan estudios cuando el médico los considera pertinentes y se realizan con aliados especializados."],
  ["¿Todos los pacientes pueden recibir tratamiento farmacológico?", "No. La indicación de cualquier medicamento corresponde exclusivamente al médico, tras la valoración, y puede no ser adecuada para todos los pacientes."],
  ["¿Cómo funciona el seguimiento médico?", "El médico define revisiones periódicas para evaluar tu evolución y ajustar el plan de atención cuando sea necesario."],
  ["¿Dónde se encuentra Arthea?", "Nos encontramos en Culiacán, Sinaloa, México. La dirección completa se indica en la sección de contacto."],
];

export default function Faq() {
  return (
    <section id="faq" className="mx-auto grid max-w-7xl gap-12 px-6 py-24 lg:grid-cols-12 lg:py-32">
      <h2 className="font-serif text-4xl text-navy lg:col-span-4 lg:text-5xl">Preguntas frecuentes</h2>
      <div className="lg:col-span-7 lg:col-start-6">
        {faqs.map(([q, a]) => (
          <details key={q} className="group border-t border-navy/20 py-6 last:border-b">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-6 font-serif text-xl text-navy">
              {q}<Plus strokeWidth={1.3} className="h-5 w-5 shrink-0 transition-transform group-open:rotate-45" />
            </summary>
            <p className="mt-4 max-w-xl leading-relaxed text-ink/75">{a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
