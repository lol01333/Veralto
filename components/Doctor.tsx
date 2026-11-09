import { ExternalLink } from "lucide-react";
import { doctor } from "@/lib/config";

export default function Doctor() {
  const rows = [["Nombre", doctor.name], ["Especialidad", doctor.specialty], ["Cédula profesional", doctor.license], ["Certificaciones", doctor.certifications.join(" · ")]].filter(([, v]) => v);
  return (
    <section id="medica" className="wrap py-24 lg:py-36">
      <div className="grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <p className="label text-sage">03 · Responsabilidad médica</p>
          <h2 className="mt-5 font-display text-5xl leading-[0.95] lg:text-6xl">Credenciales que puedes verificar.</h2>
          <p className="mt-6 max-w-md leading-relaxed text-ink/70">Antes de cualquier tratamiento, tienes derecho a saber quién te atiende. Los datos de la doctora responsable están disponibles para consulta pública.</p>
          <a href="https://www.cedulaprofesional.sep.gob.mx/" target="_blank" rel="noopener noreferrer" className="mt-8 inline-flex items-center gap-2 text-sm text-sage underline underline-offset-4">
            Verificar en el Registro Nacional de Profesionistas <ExternalLink className="h-3.5 w-3.5" />
          </a>
        </div>
        <div className="lg:col-span-6 lg:col-start-7">
          <div className="rounded-[2rem] border border-ink/10 bg-bone/50 p-6 sm:p-10">
            <div className="flex items-center gap-5">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={doctor.photo} alt="" loading="lazy" className="h-20 w-20 rounded-full object-cover object-top" />
              <div>
                <p className="label text-ink/50">Ficha profesional</p>
                <p className="mt-1 font-display text-3xl leading-tight">{doctor.name}</p>
              </div>
            </div>
            <dl className="mt-8">
              {rows.map(([k, v]) => (
                <div key={k} className="grid gap-1 border-t border-ink/10 py-4 sm:grid-cols-[11rem_1fr]">
                  <dt className="label pt-1 text-ink/50">{k}</dt>
                  <dd className={k === "Cédula profesional" ? "font-mono text-lg" : "text-lg"}>{v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}
