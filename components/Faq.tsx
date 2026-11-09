import { Plus } from "lucide-react";

const faqs = [
  ["¿Cómo agendo una valoración?", "Desde la agenda en línea de esta página: eliges el motivo, el día y la hora disponibles. También puedes escribirnos por WhatsApp."],
  ["¿En qué consiste la primera consulta?", "Es una valoración médica en la que se conversa contigo, se revisan tus antecedentes y se define si hacen falta estudios o seguimiento."],
  ["¿Qué estudios podrían solicitarme?", "Dependen de tu evaluación individual. Solo se solicitan cuando el médico los considera pertinentes y se realizan con aliados especializados."],
  ["¿Todos los pacientes pueden recibir tratamiento farmacológico?", "No. La indicación de cualquier medicamento corresponde exclusivamente al médico, tras la valoración, y puede no ser adecuada para todos."],
  ["¿Realizan tratamientos con péptidos?", "Sí. Su indicación depende de la valoración médica individual y la decide exclusivamente el médico en consulta."],
  ["¿Cómo funciona el seguimiento?", "El médico define revisiones periódicas para evaluar tu evolución y ajustar el plan cuando sea necesario."],
  ["¿Cuál es el horario de atención?", "De lunes a viernes, de 7:00 a 17:00."],
];

export default function Faq() {
  return (
    <section id="faq" className="wrap grid gap-12 py-24 lg:grid-cols-12 lg:py-36">
      <div className="lg:col-span-4">
        <p className="label text-sage">05 · Preguntas</p>
        <h2 className="mt-5 font-display text-5xl leading-[0.95] lg:text-6xl">Antes de tu primera visita.</h2>
      </div>
      <div className="lg:col-span-7 lg:col-start-6">
        {faqs.map(([q, a]) => (
          <details key={q} className="group border-t border-ink/15 py-6 last:border-b">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-6 font-display text-2xl [&::-webkit-details-marker]:hidden">
              {q}
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-ink/15 transition group-open:rotate-45 group-open:bg-ink group-open:text-paper"><Plus strokeWidth={1.4} className="h-4 w-4" /></span>
            </summary>
            <p className="mt-4 max-w-xl leading-relaxed text-ink/70">{a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
