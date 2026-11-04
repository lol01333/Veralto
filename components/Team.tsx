import ImageSlot from "./ImageSlot";
import { doctor } from "@/lib/config";

const Field = ({ label, value }: { label: string; value?: string }) => (
  <div className="border-t border-warm/20 py-4">
    <dt className="text-sm text-warm/60">{label}</dt>
    <dd className="mt-1 text-lg">{value || <span className="text-warm/40">Pendiente de completar en lib/config.ts</span>}</dd>
  </div>
);

export default function Team() {
  return (
    <section className="bg-navy py-24 text-warm lg:py-32">
      <div className="mx-auto grid max-w-7xl gap-14 px-6 lg:grid-cols-12">
        <ImageSlot src={doctor.photo || "/images/medico.jpg"} alt={doctor.name || "Médico responsable"} className="aspect-[4/5] bg-warm/10 lg:col-span-4" hint="Fotografía del médico responsable: public/images/medico.jpg" />
        <div className="lg:col-span-7 lg:col-start-6">
          <h2 className="font-serif text-4xl leading-tight lg:text-5xl">Conocimiento médico y responsabilidad profesional.</h2>
          <p className="mt-6 max-w-lg text-warm/75">Credenciales verificables del médico responsable, disponibles para consulta pública.</p>
          <dl className="mt-10">
            <Field label="Nombre" value={doctor.name} />
            <Field label="Especialidad" value={doctor.specialty} />
            <Field label="Cédula profesional" value={doctor.license} />
            <Field label="Certificaciones comprobables" value={doctor.certifications.join(" · ")} />
          </dl>
        </div>
      </div>
    </section>
  );
}
