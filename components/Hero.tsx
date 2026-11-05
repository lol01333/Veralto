import ImageSlot from "./ImageSlot";

export default function Hero() {
  return (
    <section id="inicio" className="bg-mist pt-16">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-14 lg:grid-cols-12 lg:gap-16 lg:py-20">
        <div className="flex flex-col justify-between lg:col-span-6">
          <p className="rise font-serif text-lg italic text-navy/70">Clínica privada en Culiacán, Sinaloa</p>
          <h1 className="rise rise-2 my-12 font-serif text-5xl leading-[1.04] tracking-tight text-navy sm:text-6xl xl:text-7xl">
            Medicina especializada. <br />
            Para el nuevo tu.
          </h1>
          <div className="rise rise-3 max-w-md">
            <p className="leading-relaxed text-ink/80">
              En ARTHEA creemos que cada decisión médica debe comenzar con conocimiento, evaluación profesional y atención personalizada.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#contacto" className="rounded-full bg-navy px-6 py-3 text-sm text-warm transition hover:bg-ink">Agendar valoración</a>
              <a href="#servicios" className="rounded-full border border-navy/40 px-6 py-3 text-sm text-navy transition hover:bg-navy hover:text-warm">Conocer nuestros servicios</a>
            </div>
          </div>
        </div>
        <ImageSlot src="/images/hero.jpg" alt="Médico en consultorio moderno" hint="Foto editorial de consultorio (vertical). Guárdala como public/images/hero.jpg"
          className="rise rise-2 aspect-[4/5] lg:col-span-6" />
      </div>
    </section>
  );
}
