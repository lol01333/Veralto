import { MessageCircle } from "lucide-react";
import { doctor, site, waLink } from "@/lib/config";
import NextSlot from "./NextSlot";
import Trace from "./Trace";

export default function Hero() {
  return (
    <section id="inicio" className="relative overflow-hidden pt-[4.5rem]">
      <Trace className="absolute inset-x-0 top-[52%] hidden h-40 w-full text-sage/30 sm:block" />
      <div className="wrap relative grid gap-12 pb-16 pt-10 lg:grid-cols-12 lg:gap-10 lg:pb-24 lg:pt-16">
        <div className="flex flex-col lg:col-span-7">
          <p className="rise label flex items-center gap-2 text-sage">
            <span className="h-1.5 w-1.5 rounded-full bg-sage" /> Clínica privada · {site.city}
          </p>
          <h1 className="rise rise-2 mt-8 font-display text-[clamp(3.2rem,8.4vw,7.6rem)] leading-[0.9] tracking-[-0.02em]">
            Medicina especializada.
            <span className="block italic text-sage">Para el nuevo tú.</span>
          </h1>
          <p className="rise rise-3 mt-8 max-w-[34rem] text-lg leading-relaxed text-ink/75">
            Medicina metabólica, control de peso y tratamientos con péptidos. Todo comienza con una valoración médica y continúa con un seguimiento profesional.
          </p>
          <div className="rise rise-3 mt-9 flex flex-wrap gap-3">
            <a href="#agenda" className="btn-ink">Agendar valoración</a>
            {site.whatsapp && (
              <a href={waLink()} target="_blank" rel="noopener noreferrer" className="btn-line">
                <MessageCircle strokeWidth={1.5} className="h-4 w-4" /> Escribir por WhatsApp
              </a>
            )}
          </div>
          <div className="rise rise-4 mt-10 lg:mt-auto lg:pt-12"><NextSlot /></div>
        </div>

        <figure className="rise rise-2 relative lg:col-span-5">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] bg-mist">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={doctor.photo} alt={`${doctor.name}, médica responsable de ARTHEA`} fetchPriority="high" className="absolute inset-0 h-full w-full object-cover object-top" />
          </div>
          <figcaption className="absolute -bottom-6 left-4 right-4 rounded-2xl border border-ink/10 bg-paper/95 p-5 shadow-xl shadow-ink/10 backdrop-blur sm:left-auto sm:right-[-1rem] sm:w-[19rem]">
            <p className="label text-ink/50">Médica responsable</p>
            <p className="mt-2 font-display text-2xl leading-tight">{doctor.name}</p>
            <p className="mt-1 text-sm text-ink/65">{doctor.specialty}</p>
            <p className="mt-3 border-t border-ink/10 pt-3 font-mono text-xs text-ink/70">Cédula profesional {doctor.license}</p>
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
