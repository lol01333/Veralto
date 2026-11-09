import { Activity, Stethoscope, Scale, Pill, Microscope, ArrowRight } from "lucide-react";

const items = [
  [Activity, "Medicina metabólica", "Valoración de la salud metabólica desde una perspectiva médica integral, así como tratamientos personalizados."],
  [Stethoscope, "Evaluación médica integral", "Revisión de antecedentes, hábitos y factores de riesgo para orientar las decisiones clínicas."],
  [Scale, "Control de peso y salud metabólica", "Planes de atención individualizados definidos por el médico tras una evaluación previa."],
  [Pill, "Seguimiento farmacológico", "Nuestros especialistas se encargan de brindarte la mejor atención en tu proceso, los procedimientos varian según el paciente."],
  [Microscope, "Estudios clínicos y diagnóstico", "Estudios complementarios realizados mediante aliados especializados cuando son pertinentes."],
] as const;

export default function Services() {
  return (
    <section id="servicios" className="bg-mist py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <h2 className="max-w-2xl font-serif text-4xl text-navy lg:text-5xl">Servicios médicos</h2>
        <p className="mt-4 max-w-xl text-ink/75">Toda indicación o tratamiento se determina en consulta, tras la valoración individual de cada paciente.</p>
        <div className="mt-14 grid gap-px border border-navy/15 bg-navy/15 md:grid-cols-2 lg:grid-cols-3">
          {items.map(([Icon, t, d]) => (
            <article key={t} className="flex flex-col bg-warm p-8 lg:p-10">
              <Icon strokeWidth={1.2} className="h-8 w-8 text-navy" />
              <h3 className="mt-8 font-serif text-2xl text-navy">{t}</h3>
              <p className="mt-3 flex-1 leading-relaxed text-ink/75">{d}</p>
              <a href="#contacto" className="mt-8 inline-flex items-center gap-2 text-sm text-navy underline-offset-4 hover:underline">
                Solicitar información <ArrowRight className="h-4 w-4" />
              </a>
            </article>
          ))}
          <div className="hidden bg-sand/40 lg:block" aria-hidden />
        </div>
      </div>
    </section>
  );
}
