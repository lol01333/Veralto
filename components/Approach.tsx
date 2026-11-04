import ImageSlot from "./ImageSlot";

const steps = [
  ["Valoración médica", "Consulta inicial con el médico para conocer tu motivo de consulta."],
  ["Evaluación de antecedentes y factores de riesgo", "Revisión de historial personal y familiar."],
  ["Estudios complementarios cuando sean pertinentes", "Solo si el médico los considera necesarios."],
  ["Plan de atención individualizado", "Definido por el médico con base en tu evaluación."],
  ["Seguimiento profesional", "Revisiones periódicas para ajustar el plan."],
];

export default function Approach() {
  return (
    <section id="enfoque" className="mx-auto grid max-w-7xl gap-16 px-6 py-24 lg:grid-cols-12 lg:py-32">
      <div className="lg:col-span-5">
        <h2 className="font-serif text-4xl leading-tight text-navy lg:text-5xl">La atención comienza con una evaluación.</h2>
        <ImageSlot src="/images/consultorio.jpg" alt="Consultorio clínico" className="mt-12 hidden aspect-[4/3] lg:block" hint="Foto de consultorio: public/images/consultorio.jpg" />
      </div>
      <ol className="lg:col-span-6 lg:col-start-7">
        {steps.map(([t, d], i) => (
          <li key={t} className="grid grid-cols-[3rem_1fr] gap-4 border-t border-navy/20 py-8 last:border-b">
            <span className="font-serif text-3xl text-navy/50">{i + 1}</span>
            <div><h3 className="font-serif text-2xl text-navy">{t}</h3><p className="mt-2 text-ink/75">{d}</p></div>
          </li>
        ))}
      </ol>
    </section>
  );
}
