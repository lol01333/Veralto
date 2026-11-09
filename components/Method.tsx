const principles = [
  ["Ciencia y conocimiento", "Decisiones clínicas sustentadas en evidencia y en la valoración profesional de cada caso."],
  ["Atención personalizada", "Cada paciente se evalúa de forma individual, con tiempo y claridad."],
  ["Seguimiento profesional", "Revisión continua para ajustar el plan según tu evolución."],
];
const steps = [
  ["Valoración médica", "Consulta inicial para conocer tu motivo de consulta."],
  ["Antecedentes y riesgos", "Revisión de tu historial personal y familiar."],
  ["Estudios, si aplican", "Solo cuando el médico los considera necesarios."],
  ["Plan individual", "Definido por el médico con base en tu evaluación."],
  ["Seguimiento", "Revisiones periódicas para ajustar el plan."],
];

export default function Method() {
  return (
    <section id="metodo" className="bg-ink py-24 text-paper lg:py-36">
      <div className="wrap">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="label text-mint">02 · Método</p>
            <h2 className="mt-5 font-display text-5xl leading-[0.95] lg:text-6xl">La atención comienza con una evaluación.</h2>
          </div>
          <p className="max-w-xl self-end text-lg leading-relaxed text-paper/70 lg:col-span-6 lg:col-start-7">
            ARTHEA Soluciones Médicas nace para ofrecer atención especializada basada en la evaluación individual, el conocimiento científico y el seguimiento profesional: una experiencia médica transparente y responsable.
          </p>
        </div>

        <ol className="relative mt-20 grid gap-10 md:grid-cols-5 md:gap-6">
          <span aria-hidden className="absolute left-[7px] top-2 h-[calc(100%-1rem)] w-px bg-paper/15 md:left-0 md:top-[7px] md:h-px md:w-full" />
          {steps.map(([t, d], i) => (
            <li key={t} className="relative pl-10 md:pl-0 md:pt-12">
              <span aria-hidden className={`absolute left-0 top-0.5 h-[15px] w-[15px] rounded-full border ${i === 0 ? "border-mint bg-mint" : "border-paper/40 bg-ink"}`} />
              <p className="font-mono text-xs text-mint/80">Paso {i + 1}</p>
              <h3 className="mt-2 font-display text-2xl leading-tight">{t}</h3>
              <p className="mt-2 text-sm leading-relaxed text-paper/60">{d}</p>
            </li>
          ))}
        </ol>

        <ul className="mt-20 grid gap-px overflow-hidden rounded-3xl bg-paper/10 md:grid-cols-3">
          {principles.map(([t, d]) => (
            <li key={t} className="bg-ink p-8 lg:p-10">
              <h3 className="font-display text-2xl text-mint">{t}</h3>
              <p className="mt-3 leading-relaxed text-paper/65">{d}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
