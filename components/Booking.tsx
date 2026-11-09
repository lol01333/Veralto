"use client";
import { useEffect, useMemo, useState } from "react";
import { ArrowLeft, ArrowRight, CalendarPlus, Check, MessageCircle } from "lucide-react";
import { booking, services, site, waLink } from "@/lib/config";
import { bookableDays, formatDay, googleCalendarLink, slotsFor, type Slot } from "@/lib/booking";

type Step = 1 | 2 | 3 | 4;
type Result = { estado: "confirmada" | "solicitud"; canal: "sistema" | "whatsapp" };

export default function Booking() {
  const [step, setStep] = useState<Step>(1);
  const [servicio, setServicio] = useState<string>("");
  const [dias, setDias] = useState<string[]>([]);
  const [fecha, setFecha] = useState("");
  const [slots, setSlots] = useState<Slot[] | null>(null);
  const [hora, setHora] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [busy, setBusy] = useState(false);
  const [fail, setFail] = useState("");
  const [result, setResult] = useState<Result | null>(null);
  const [nombre, setNombre] = useState("");

  const srv = services.find((s) => s.id === servicio);

  // Días disponibles
  useEffect(() => {
    fetch("/api/disponibilidad").then((r) => r.json()).then((j) => setDias(j.dias)).catch(() => setDias(bookableDays()));
  }, []);

  // Preselección desde "Agendar" en Servicios
  useEffect(() => {
    const on = (e: MouseEvent) => {
      const a = (e.target as HTMLElement).closest<HTMLElement>("[data-servicio]");
      if (a?.dataset.servicio) { setServicio(a.dataset.servicio); setStep(2); }
    };
    document.addEventListener("click", on);
    return () => document.removeEventListener("click", on);
  }, []);

  // Horarios del día elegido
  useEffect(() => {
    if (!fecha) return;
    setSlots(null); setHora("");
    fetch(`/api/disponibilidad?fecha=${fecha}`).then((r) => r.json()).then((j) => setSlots(j.slots)).catch(() => setSlots(slotsFor(fecha)));
  }, [fecha]);

  useEffect(() => { if (step === 2 && !fecha && dias.length) setFecha(dias[0]); }, [step, dias, fecha]);

  const resumen = useMemo(() => (srv && fecha && hora ? `${srv.name} · ${formatDay(fecha)} · ${hora} h` : ""), [srv, fecha, hora]);
  const waMsg = `Hola, quiero agendar una valoración en ARTHEA.\nMotivo: ${srv?.name ?? ""}\nFecha: ${fecha ? formatDay(fecha) : ""} a las ${hora} h\nNombre: ${nombre}`;

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const d = Object.fromEntries(new FormData(e.currentTarget)) as Record<string, string>;
    const err: Record<string, string> = {};
    if ((d.nombre || "").trim().length < 3) err.nombre = "Escribe tu nombre completo.";
    if (!/^\d{10}$/.test((d.telefono || "").replace(/\D/g, ""))) err.telefono = "Ingresa un teléfono de 10 dígitos.";
    if (d.correo && !/^\S+@\S+\.\S+$/.test(d.correo)) err.correo = "Revisa el formato del correo.";
    if (!d.privacidad) err.privacidad = "Necesitamos tu aceptación para agendar.";
    setErrors(err);
    if (Object.keys(err).length) return;
    setBusy(true); setFail(""); setNombre(d.nombre.trim());
    try {
      const res = await fetch("/api/cita", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...d, servicio, fecha, hora }) });
      const j = await res.json();
      if (!res.ok) { setFail(j.error || "No pudimos registrar tu cita."); if (res.status === 409) { setStep(2); setFecha(""); setTimeout(() => setFecha(fecha), 0); } return; }
      setResult(j); setStep(4);
    } catch {
      setFail("No pudimos conectar con la agenda. Intenta de nuevo o escríbenos por WhatsApp.");
    } finally { setBusy(false); }
  }

  const labels = ["Motivo", "Fecha y hora", "Tus datos"];
  const input = "mt-2 w-full rounded-xl border border-ink/15 bg-paper px-4 py-3.5 outline-none transition focus:border-sage focus:ring-2 focus:ring-sage/20";

  return (
    <section id="agenda" className="bg-mist/60 py-24 lg:py-36">
      <div className="wrap grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <p className="label text-sage">04 · Agenda</p>
          <h2 className="mt-5 font-display text-5xl leading-[0.95] lg:text-6xl">Agenda tu valoración en un minuto.</h2>
          <p className="mt-6 max-w-sm leading-relaxed text-ink/70">Elige el motivo, el día y la hora. La agenda muestra solo los horarios libres de la clínica.</p>
          <ul className="mt-10 space-y-4 text-sm text-ink/70">
            <li className="flex gap-3"><Check className="mt-0.5 h-4 w-4 shrink-0 text-sage" />{site.hours}</li>
            <li className="flex gap-3"><Check className="mt-0.5 h-4 w-4 shrink-0 text-sage" />Valoración de {booking.slotMinutes} minutos con la médica responsable</li>
            <li className="flex gap-3"><Check className="mt-0.5 h-4 w-4 shrink-0 text-sage" />No te pedimos información clínica para agendar</li>
          </ul>
        </div>

        <div className="lg:col-span-8">
          <div data-booking className="overflow-hidden rounded-[2rem] border border-ink/10 bg-paper shadow-2xl shadow-ink/5">
            {step < 4 && (
              <ol className="grid grid-cols-3 border-b border-ink/10">
                {labels.map((l, i) => {
                  const n = (i + 1) as Step; const done = step > n; const active = step === n;
                  return (
                    <li key={l}>
                      <button type="button" disabled={!done} onClick={() => setStep(n)}
                        className={`flex w-full items-center gap-3 px-4 py-4 text-left text-sm sm:px-6 ${active ? "text-ink" : done ? "text-ink/70 hover:text-ink" : "text-ink/35"}`}>
                        <span className={`grid h-7 w-7 shrink-0 place-items-center rounded-full font-mono text-xs ${active ? "bg-ink text-paper" : done ? "bg-mint text-ink" : "border border-ink/20"}`}>
                          {done ? <Check className="h-3.5 w-3.5" /> : n}
                        </span>
                        <span className="hidden sm:inline">{l}</span>
                      </button>
                    </li>
                  );
                })}
              </ol>
            )}

            <div className="p-5 sm:p-8 lg:p-10">
              {step === 1 && (
                <div>
                  <h3 className="font-display text-3xl">¿Cuál es el motivo de tu consulta?</h3>
                  <div className="mt-6 grid gap-3 sm:grid-cols-2">
                    {services.map((s) => (
                      <button key={s.id} type="button" onClick={() => { setServicio(s.id); setStep(2); }}
                        className={`group flex items-center justify-between gap-4 rounded-2xl border p-5 text-left transition ${servicio === s.id ? "border-sage bg-mint/40" : "border-ink/15 hover:border-ink/40"}`}>
                        <span className="font-medium">{s.name}</span>
                        <ArrowRight className="h-4 w-4 shrink-0 text-ink/40 transition group-hover:translate-x-1 group-hover:text-ink" />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {step === 2 && (
                <div>
                  <h3 className="font-display text-3xl">Elige día y hora</h3>
                  <p className="mt-1 text-sm text-ink/60">{srv?.name}</p>
                  <div className="-mx-5 mt-6 flex gap-2 overflow-x-auto px-5 pb-2 sm:-mx-8 sm:px-8 lg:-mx-10 lg:px-10" role="listbox" aria-label="Días disponibles">
                    {dias.length === 0 && <p className="text-sm text-ink/60">Cargando días…</p>}
                    {dias.map((d) => (
                      <button key={d} type="button" role="option" aria-selected={fecha === d} onClick={() => setFecha(d)}
                        className={`flex w-[4.5rem] shrink-0 flex-col items-center rounded-2xl border py-3 transition ${fecha === d ? "border-ink bg-ink text-paper" : "border-ink/15 hover:border-ink/40"}`}>
                        <span className="label opacity-70">{formatDay(d, { weekday: "short" }).replace(".", "")}</span>
                        <span className="mt-1 font-display text-3xl leading-none">{formatDay(d, { day: "numeric" })}</span>
                        <span className="mt-1 text-xs opacity-70">{formatDay(d, { month: "short" }).replace(".", "")}</span>
                      </button>
                    ))}
                  </div>
                  <div className="mt-6 min-h-[9rem]">
                    {fecha && <p className="label mb-3 text-ink/50 first-letter:uppercase">{formatDay(fecha)}</p>}
                    {!slots && fecha && <p className="text-sm text-ink/60">Consultando horarios…</p>}
                    {slots && (
                      <div className="grid grid-cols-3 gap-2 sm:grid-cols-5">
                        {slots.map((s) => (
                          <button key={s.hora} type="button" disabled={!s.libre} onClick={() => setHora(s.hora)}
                            className={`rounded-xl border py-3 font-mono text-sm transition ${hora === s.hora ? "border-sage bg-sage text-paper" : s.libre ? "border-ink/15 hover:border-ink" : "cursor-not-allowed border-transparent bg-ink/[0.04] text-ink/25 line-through"}`}>
                            {s.hora}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                  {fail && <p role="alert" className="mt-4 text-sm text-red-800">{fail}</p>}
                  <div className="mt-8 flex items-center justify-between gap-4 border-t border-ink/10 pt-6">
                    <button type="button" onClick={() => setStep(1)} className="inline-flex items-center gap-2 text-sm text-ink/60 hover:text-ink"><ArrowLeft className="h-4 w-4" /> Motivo</button>
                    <button type="button" disabled={!hora} onClick={() => { setFail(""); setStep(3); }} className="btn-ink disabled:cursor-not-allowed disabled:opacity-30">Continuar <ArrowRight className="h-4 w-4" /></button>
                  </div>
                </div>
              )}

              {step === 3 && (
                <form onSubmit={submit} noValidate>
                  <h3 className="font-display text-3xl">Tus datos de contacto</h3>
                  <p className="mt-2 rounded-xl bg-mint/40 px-4 py-3 text-sm first-letter:uppercase">{resumen}</p>
                  <div className="mt-6 grid gap-5 sm:grid-cols-2">
                    <div className="sm:col-span-2">
                      <label htmlFor="b-nombre" className="text-sm">Nombre completo</label>
                      <input id="b-nombre" name="nombre" autoComplete="name" aria-invalid={!!errors.nombre} className={input} />
                      {errors.nombre && <p className="mt-1 text-sm text-red-800">{errors.nombre}</p>}
                    </div>
                    <div>
                      <label htmlFor="b-telefono" className="text-sm">Teléfono (WhatsApp)</label>
                      <input id="b-telefono" name="telefono" type="tel" inputMode="numeric" autoComplete="tel" aria-invalid={!!errors.telefono} className={input} />
                      {errors.telefono && <p className="mt-1 text-sm text-red-800">{errors.telefono}</p>}
                    </div>
                    <div>
                      <label htmlFor="b-correo" className="text-sm">Correo (opcional)</label>
                      <input id="b-correo" name="correo" type="email" autoComplete="email" aria-invalid={!!errors.correo} className={input} />
                      {errors.correo && <p className="mt-1 text-sm text-red-800">{errors.correo}</p>}
                    </div>
                  </div>
                  <input type="text" name="empresa" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />
                  <label className="mt-6 flex items-start gap-3 text-sm text-ink/70">
                    <input type="checkbox" name="privacidad" className="mt-1 h-4 w-4 accent-[#2F6B5A]" />
                    <span>Acepto el <a href="/aviso-de-privacidad" className="underline underline-offset-2">aviso de privacidad</a>. No incluyas información clínica en este formulario.</span>
                  </label>
                  {errors.privacidad && <p className="mt-1 text-sm text-red-800">{errors.privacidad}</p>}
                  {fail && <p role="alert" className="mt-4 text-sm text-red-800">{fail}</p>}
                  <div className="mt-8 flex items-center justify-between gap-4 border-t border-ink/10 pt-6">
                    <button type="button" onClick={() => setStep(2)} className="inline-flex items-center gap-2 text-sm text-ink/60 hover:text-ink"><ArrowLeft className="h-4 w-4" /> Fecha y hora</button>
                    <button disabled={busy} className="btn-ink disabled:opacity-50">{busy ? "Agendando…" : "Confirmar cita"}</button>
                  </div>
                </form>
              )}

              {step === 4 && result && fecha && hora && srv && (
                <div role="status" className="py-4">
                  <span className="grid h-14 w-14 place-items-center rounded-full bg-mint"><Check className="h-6 w-6 text-sage" /></span>
                  <h3 className="mt-6 font-display text-4xl">
                    {result.estado === "confirmada" ? "Tu cita está agendada." : result.canal === "whatsapp" ? "Último paso: envíanos tu solicitud." : "Recibimos tu solicitud."}
                  </h3>
                  <p className="mt-3 text-lg capitalize">{formatDay(fecha)} · {hora} h</p>
                  <p className="text-ink/60">{srv.name} · {site.city}</p>
                  <p className="mt-4 max-w-md text-sm leading-relaxed text-ink/70">
                    {result.estado === "confirmada"
                      ? "Te escribiremos por WhatsApp para enviarte la dirección e indicaciones."
                      : result.canal === "whatsapp"
                        ? "Envía el mensaje ya preparado por WhatsApp para reservar este horario."
                        : "Te contactaremos por WhatsApp para confirmar tu horario."}
                  </p>
                  <div className="mt-8 flex flex-wrap gap-3">
                    {site.whatsapp && (
                      <a href={waLink(waMsg)} target="_blank" rel="noopener noreferrer" className={result.canal === "whatsapp" ? "btn-ink" : "btn-line"}>
                        <MessageCircle className="h-4 w-4" /> {result.canal === "whatsapp" ? "Enviar por WhatsApp" : "Escribir por WhatsApp"}
                      </a>
                    )}
                    <a href={googleCalendarLink(`Valoración en ARTHEA · ${srv.short}`, fecha, hora, `${srv.name}. ${site.fullName}, ${site.city}.`)} target="_blank" rel="noopener noreferrer" className="btn-line">
                      <CalendarPlus className="h-4 w-4" /> Agregar a mi calendario
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
