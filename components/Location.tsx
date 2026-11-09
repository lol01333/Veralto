import { MessageCircle } from "lucide-react";
import { booking, site, waLink } from "@/lib/config";

const days = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes"];

export default function Location() {
  return (
    <section id="ubicacion" className="wrap pb-24 lg:pb-36">
      <div className="grid overflow-hidden rounded-[2rem] bg-ink text-paper lg:grid-cols-2">
        <div className="p-8 sm:p-12 lg:p-16">
          <p className="label text-mint">06 · Ubicación</p>
          <h2 className="mt-5 font-display text-5xl leading-[0.95] lg:text-6xl">{site.city}.</h2>
          <p className="mt-6 max-w-md leading-relaxed text-paper/70">
            {site.address || "Te compartimos la dirección exacta por WhatsApp al confirmar tu cita."}
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <a href="#agenda" className="btn-mint">Agendar valoración</a>
            {site.whatsapp && (
              <a href={waLink()} target="_blank" rel="noopener noreferrer" className="btn border border-paper/25 text-paper hover:bg-paper hover:text-ink">
                <MessageCircle className="h-4 w-4" /> {site.whatsappDisplay}
              </a>
            )}
          </div>
        </div>
        <div className="border-t border-paper/10 p-8 sm:p-12 lg:border-l lg:border-t-0 lg:p-16">
          {site.mapEmbedUrl ? (
            <iframe src={site.mapEmbedUrl} title="Mapa de ubicación de ARTHEA" loading="lazy" className="aspect-video w-full rounded-2xl border-0" />
          ) : (
            <>
              <p className="label text-paper/50">Horario de atención</p>
              <dl className="mt-6">
                {days.map((d) => (
                  <div key={d} className="flex justify-between border-t border-paper/10 py-4 font-mono text-sm">
                    <dt className="text-paper/70">{d}</dt>
                    <dd>{String(booking.open).padStart(2, "0")}:00 – {booking.close}:00</dd>
                  </div>
                ))}
              </dl>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
