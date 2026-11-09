// Lógica de agenda compartida entre cliente y servidor (funciones puras).
import { booking } from "./config";

export type Slot = { hora: string; libre: boolean };

const pad = (n: number) => String(n).padStart(2, "0");

/** Fecha y hora "de pared" en Culiacán para un instante dado. */
export function localParts(d: Date = new Date()) {
  const f = new Intl.DateTimeFormat("en-CA", {
    timeZone: booking.timeZone, year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit", hourCycle: "h23", weekday: "short",
  }).formatToParts(d);
  const g = (t: string) => f.find((p) => p.type === t)!.value;
  return { date: `${g("year")}-${g("month")}-${g("day")}`, hour: Number(g("hour")), minute: Number(g("minute")) };
}

/** Instante UTC de una fecha/hora local de Culiacán. */
export const toInstant = (fecha: string, hora: string) => new Date(`${fecha}T${hora}:00${booking.utcOffset}`);

export const weekday = (fecha: string) => new Date(`${fecha}T12:00:00${booking.utcOffset}`).getUTCDay();

/** Horas de inicio posibles según el horario de atención. */
export function dayTemplate(): string[] {
  const out: string[] = [];
  for (let m = booking.open * 60; m + booking.slotMinutes <= booking.close * 60; m += booking.slotMinutes) out.push(`${pad(Math.floor(m / 60))}:${pad(m % 60)}`);
  return out;
}

/** Días hábiles reservables a partir de hoy. */
export function bookableDays(now: Date = new Date()): string[] {
  const today = localParts(now).date;
  const out: string[] = [];
  for (let i = 0; i <= booking.daysAhead; i++) {
    const d = new Date(`${today}T12:00:00${booking.utcOffset}`);
    d.setUTCDate(d.getUTCDate() + i);
    const iso = localParts(d).date;
    if (booking.days.includes(weekday(iso)) && slotsFor(iso, [], now).some((s) => s.libre)) out.push(iso);
  }
  return out;
}

/** Horarios de un día; `busy` son intervalos ocupados (p. ej. de Google Calendar). */
export function slotsFor(fecha: string, busy: { start: string; end: string }[] = [], now: Date = new Date()): Slot[] {
  if (!booking.days.includes(weekday(fecha))) return [];
  const limit = now.getTime() + booking.minNoticeHours * 3600_000;
  return dayTemplate().map((hora) => {
    const s = toInstant(fecha, hora).getTime();
    const e = s + booking.slotMinutes * 60_000;
    const choca = busy.some((b) => s < new Date(b.end).getTime() && e > new Date(b.start).getTime());
    return { hora, libre: s >= limit && !choca };
  });
}

export function isValidSlot(fecha: string, hora: string, now: Date = new Date()) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(fecha) || !/^\d{2}:\d{2}$/.test(hora)) return false;
  if (!bookableDays(now).includes(fecha)) return false;
  return slotsFor(fecha, [], now).some((s) => s.hora === hora && s.libre);
}

export const formatDay = (fecha: string, opts: Intl.DateTimeFormatOptions = { weekday: "long", day: "numeric", month: "long" }) =>
  new Intl.DateTimeFormat("es-MX", { ...opts, timeZone: booking.timeZone }).format(new Date(`${fecha}T12:00:00${booking.utcOffset}`));

/** Enlace "Agregar a Google Calendar" para el paciente. */
export function googleCalendarLink(title: string, fecha: string, hora: string, details: string) {
  const s = toInstant(fecha, hora);
  const e = new Date(s.getTime() + booking.slotMinutes * 60_000);
  const z = (d: Date) => d.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
  const q = new URLSearchParams({ action: "TEMPLATE", text: title, dates: `${z(s)}/${z(e)}`, details, ctz: booking.timeZone });
  return `https://calendar.google.com/calendar/render?${q.toString()}`;
}
