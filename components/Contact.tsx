"use client";
import { useState } from "react";
import { MapPin, Phone, Mail, Clock, MessageCircle, CheckCircle2 } from "lucide-react";
import { site, waLink } from "@/lib/config";

type Errors = Partial<Record<"nombre" | "telefono" | "correo", string>>;

export default function Contact() {
  const [errors, setErrors] = useState<Errors>({});
  const [sent, setSent] = useState(false);
  const [busy, setBusy] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const d = Object.fromEntries(new FormData(e.currentTarget)) as Record<string, string>;
    const err: Errors = {};
    if (d.nombre.trim().length < 3) err.nombre = "Escribe tu nombre completo.";
    if (!/^\d{10}$/.test(d.telefono.replace(/\D/g, ""))) err.telefono = "Ingresa un teléfono de 10 dígitos.";
    if (d.correo && !/^\S+@\S+\.\S+$/.test(d.correo)) err.correo = "Revisa el formato del correo.";
    setErrors(err);
    if (Object.keys(err).length) return;
    setBusy(true);
    try {
      await fetch(site.formEndpoint, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(d) });
    } catch {}
    setBusy(false); setSent(true);
  }

  const info = [
    [MapPin, site.address ? `${site.address}, ${site.city}` : site.city],
    [Phone, site.phone], [Mail, site.email], [Clock, site.hours],
  ] as const;
  const input = "mt-2 w-full border-b border-navy/40 bg-transparent py-2 outline-none focus:border-navy";
  const errCls = "mt-1 text-sm text-red-800";

  return (
    <section id="contacto" className="bg-mist py-24 lg:py-32">
      <div className="mx-auto grid max-w-7xl gap-16 px-6 lg:grid-cols-2">
        <div>
          <h2 className="font-serif text-4xl text-navy lg:text-5xl">Solicitar una cita</h2>
          <ul className="mt-10 space-y-4">
            {info.filter(([, v]) => v).map(([Icon, v], i) => <li key={i} className="flex gap-3"><Icon strokeWidth={1.3} className="h-5 w-5 text-navy" />{v}</li>)}
          </ul>
          {site.whatsapp && (
            <a href={waLink()} target="_blank" rel="noopener noreferrer" className="mt-8 inline-flex items-center gap-2 rounded-full border border-navy/40 px-5 py-3 text-sm text-navy hover:bg-navy hover:text-warm">
              <MessageCircle className="h-4 w-4" /> Escribir por WhatsApp
            </a>
          )}
          <div className="mt-10 aspect-video bg-sand/50">
            {site.mapEmbedUrl
              ? <iframe src={site.mapEmbedUrl} title="Mapa de ubicación de VERALTO" loading="lazy" className="h-full w-full border-0" />
              : <p className="flex h-full items-center justify-center p-6 text-center text-sm text-navy/60">Mapa editable: agrega mapEmbedUrl en lib/config.ts</p>}
          </div>
        </div>

        {sent ? (
          <div role="status" className="flex flex-col justify-center border border-navy/20 bg-warm p-10">
            <CheckCircle2 strokeWidth={1.2} className="h-10 w-10 text-navy" />
            <h3 className="mt-6 font-serif text-3xl text-navy">Solicitud recibida</h3>
            <p className="mt-3 text-ink/75">Nos pondremos en contacto contigo para confirmar tu horario.</p>
          </div>
        ) : (
          <form onSubmit={onSubmit} noValidate className="space-y-8 border border-navy/20 bg-warm p-8 lg:p-10">
            <div>
              <label htmlFor="nombre">Nombre completo</label>
              <input id="nombre" name="nombre" autoComplete="name" aria-invalid={!!errors.nombre} className={input} />
              {errors.nombre && <p className={errCls}>{errors.nombre}</p>}
            </div>
            <div>
              <label htmlFor="telefono">Teléfono</label>
              <input id="telefono" name="telefono" type="tel" autoComplete="tel" aria-invalid={!!errors.telefono} className={input} />
              {errors.telefono && <p className={errCls}>{errors.telefono}</p>}
            </div>
            <div>
              <label htmlFor="correo">Correo electrónico (opcional)</label>
              <input id="correo" name="correo" type="email" autoComplete="email" aria-invalid={!!errors.correo} className={input} />
              {errors.correo && <p className={errCls}>{errors.correo}</p>}
            </div>
            <div>
              <label htmlFor="horario">Horario preferido</label>
              <select id="horario" name="horario" className={input}>
                <option>Mañana</option><option>Mediodía</option><option>Tarde</option>
              </select>
            </div>
            <p className="text-sm text-ink/60">Por tu seguridad, no incluyas información clínica ni diagnósticos en este formulario.</p>
            <button disabled={busy} className="w-full rounded-full bg-navy py-3.5 text-warm transition hover:bg-ink disabled:opacity-60">
              {busy ? "Enviando…" : "Solicitar una cita"}
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
