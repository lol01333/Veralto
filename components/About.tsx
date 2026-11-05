import { FlaskConical, UserRound, ClipboardCheck } from "lucide-react";

const pillars = [
  [FlaskConical, "Ciencia y conocimiento", "Decisiones clínicas sustentadas en evidencia y en la valoración profesional de cada caso."],
  [UserRound, "Atención personalizada", "Cada paciente es evaluado de forma individual, con tiempo y claridad en la comunicación."],
  [ClipboardCheck, "Seguimiento profesional", "Revisión continua para ajustar el plan de atención conforme a la evolución del paciente."],
] as const;

export default function About() {
  return (
    <section id="nosotros" className="mx-auto max-w-7xl px-6 py-24 lg:py-32">
      <div className="grid gap-12 lg:grid-cols-12">
        <h2 className="font-serif text-4xl leading-tight text-navy lg:col-span-5 lg:text-5xl">Una nueva perspectiva de la atención médica.</h2>
        <p className="max-w-xl leading-loose text-ink/80 lg:col-span-6 lg:col-start-7">
          ARTHEA Soluciones Médicas nace con el propósito de ofrecer atención especializada basada en la evaluación individual, el conocimiento científico y el seguimiento profesional. Nuestro compromiso es proporcionar una experiencia médica transparente, responsable y centrada en cada paciente.
        </p>
      </div>
      <ul className="mt-20 grid border-t border-navy/20 md:grid-cols-3">
        {pillars.map(([Icon, t, d], i) => (
          <li key={t} className={`py-10 md:px-8 ${i > 0 ? "md:border-l md:border-navy/15" : "md:pl-0"}`}>
            <Icon strokeWidth={1.2} className="h-8 w-8 text-navy" />
            <h3 className="mt-6 font-serif text-2xl text-navy">{t}</h3>
            <p className="mt-3 leading-relaxed text-ink/75">{d}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
