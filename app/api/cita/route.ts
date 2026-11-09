import { NextResponse } from "next/server";
import { Resend } from "resend";
import { booking, services, site } from "@/lib/config";
import { formatDay, isValidSlot, slotsFor, toInstant } from "@/lib/booking";
import { busyFor, calendarConfigured, createEvent } from "@/lib/gcal";

// Recibe solo datos administrativos: servicio (categoría general), fecha, hora, nombre, teléfono, correo opcional.
export async function POST(req: Request) {
  const b = await req.json().catch(() => ({}));
  const { servicio, fecha, hora, nombre, telefono, correo, empresa } = b as Record<string, string>;
  if (empresa) return NextResponse.json({ ok: true, estado: "solicitud" }); // honeypot
  const srv = services.find((s) => s.id === servicio);
  const tel = String(telefono || "").replace(/\D/g, "");
  if (!srv || !nombre || String(nombre).trim().length < 3 || tel.length !== 10 || !isValidSlot(fecha, hora))
    return NextResponse.json({ ok: false, error: "Revisa los datos de tu cita." }, { status: 400 });

  const start = toInstant(fecha, hora);
  const end = new Date(start.getTime() + booking.slotMinutes * 60_000);
  const cuando = `${formatDay(fecha)} a las ${hora} h`;
  const detalle = `Paciente: ${nombre}\nTeléfono: ${tel}\nCorreo: ${correo || "No proporcionado"}\nMotivo: ${srv.name}\nOrigen: sitio web`;

  let estado: "confirmada" | "solicitud" = "solicitud";
  if (calendarConfigured()) {
    try {
      const libre = slotsFor(fecha, await busyFor(fecha)).find((s) => s.hora === hora)?.libre;
      if (!libre) return NextResponse.json({ ok: false, error: "Ese horario acaba de ocuparse. Elige otro." }, { status: 409 });
      await createEvent({ summary: `Valoración · ${srv.short} · ${nombre}`, description: detalle, start, end });
      estado = "confirmada";
    } catch { /* si Google falla, queda como solicitud y se avisa por correo */ }
  }

  let correoEnviado = false;
  if (process.env.RESEND_API_KEY && process.env.CITAS_EMAIL) {
    const resend = new Resend(process.env.RESEND_API_KEY);
    const { error } = await resend.emails.send({
      from: process.env.CITAS_FROM || "ARTHEA web <onboarding@resend.dev>",
      to: process.env.CITAS_EMAIL,
      subject: `${estado === "confirmada" ? "Cita agendada" : "Solicitud de cita"}: ${nombre} — ${cuando}`,
      text: `${detalle}\nFecha: ${cuando}\nEstado: ${estado === "confirmada" ? "registrada en Google Calendar" : "pendiente de confirmar"}`,
    });
    correoEnviado = !error;
  }

  // Sin calendario ni correo configurados, el cliente confirma por WhatsApp.
  return NextResponse.json({ ok: true, estado, canal: estado === "confirmada" || correoEnviado ? "sistema" : "whatsapp", sitio: site.name });
}
