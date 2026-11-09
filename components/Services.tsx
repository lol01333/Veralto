import { ArrowUpRight } from "lucide-react";
import { services } from "@/lib/config";

export default function Services() {
  return (
    <section id="servicios" className="wrap py-24 lg:py-36">
      <div className="grid gap-10 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <p className="label text-sage">01 · Servicios</p>
          <h2 className="mt-5 font-display text-5xl leading-[0.95] lg:text-6xl">Un mismo punto de partida: tu valoración.</h2>
          <p className="mt-6 max-w-sm leading-relaxed text-ink/70">Toda indicación o tratamiento se decide en consulta, después de la valoración individual de cada paciente.</p>
        </div>
        <ol className="lg:col-span-8">
          {services.map((s, i) => (
            <li key={s.id} className="group grid grid-cols-[2.5rem_1fr] gap-x-4 border-t border-ink/15 py-7 transition-colors last:border-b sm:grid-cols-[3.5rem_1fr_auto] sm:items-center">
              <span className="font-mono text-sm text-ink/40">{String(i + 1).padStart(2, "0")}</span>
              <div>
                <h3 className="font-display text-[1.75rem] leading-tight sm:text-3xl">{s.name}</h3>
                <p className="mt-2 max-w-lg leading-relaxed text-ink/65">{s.desc}</p>
              </div>
              <a href="#agenda" data-servicio={s.id}
                className="col-start-2 mt-5 inline-flex w-fit items-center gap-2 rounded-full border border-ink/20 px-4 py-2 text-sm transition group-hover:border-ink group-hover:bg-ink group-hover:text-paper sm:col-start-auto sm:mt-0">
                Agendar <ArrowUpRight className="h-4 w-4" />
              </a>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
