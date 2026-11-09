// Conexión con Google Calendar mediante una cuenta de servicio (solo servidor).
// Variables de entorno:
//   GOOGLE_SERVICE_ACCOUNT_EMAIL  correo de la cuenta de servicio
//   GOOGLE_PRIVATE_KEY            llave privada (con \n escapados)
//   GOOGLE_CALENDAR_ID            ID del calendario de la clínica (compártelo con la cuenta de servicio
//                                 con permiso "Hacer cambios en los eventos")
import { createSign } from "node:crypto";
import { booking } from "./config";

const SCOPE = "https://www.googleapis.com/auth/calendar";
let cached: { token: string; exp: number } | null = null;

export const calendarConfigured = () =>
  !!(process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL && process.env.GOOGLE_PRIVATE_KEY && process.env.GOOGLE_CALENDAR_ID);

const b64url = (s: string | Buffer) => Buffer.from(s).toString("base64").replace(/=+$/, "").replace(/\+/g, "-").replace(/\//g, "_");

async function token() {
  if (cached && cached.exp > Date.now() + 60_000) return cached.token;
  const now = Math.floor(Date.now() / 1000);
  const head = b64url(JSON.stringify({ alg: "RS256", typ: "JWT" }));
  const claim = b64url(JSON.stringify({ iss: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL, scope: SCOPE, aud: "https://oauth2.googleapis.com/token", iat: now, exp: now + 3600 }));
  const key = process.env.GOOGLE_PRIVATE_KEY!.replace(/\\n/g, "\n");
  const sig = b64url(createSign("RSA-SHA256").update(`${head}.${claim}`).sign(key));
  const res = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer", assertion: `${head}.${claim}.${sig}` }),
  });
  if (!res.ok) throw new Error(`Google token ${res.status}`);
  const j = await res.json();
  cached = { token: j.access_token, exp: Date.now() + j.expires_in * 1000 };
  return cached.token;
}

/** Intervalos ocupados del calendario para un día local de Culiacán. */
export async function busyFor(fecha: string): Promise<{ start: string; end: string }[]> {
  const res = await fetch("https://www.googleapis.com/calendar/v3/freeBusy", {
    method: "POST",
    headers: { Authorization: `Bearer ${await token()}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      timeMin: `${fecha}T00:00:00${booking.utcOffset}`,
      timeMax: `${fecha}T23:59:59${booking.utcOffset}`,
      timeZone: booking.timeZone,
      items: [{ id: process.env.GOOGLE_CALENDAR_ID }],
    }),
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`freeBusy ${res.status}`);
  const j = await res.json();
  return j.calendars?.[process.env.GOOGLE_CALENDAR_ID!]?.busy ?? [];
}

export async function createEvent(e: { summary: string; description: string; start: Date; end: Date }) {
  const res = await fetch(`https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(process.env.GOOGLE_CALENDAR_ID!)}/events`, {
    method: "POST",
    headers: { Authorization: `Bearer ${await token()}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      summary: e.summary,
      description: e.description,
      start: { dateTime: e.start.toISOString(), timeZone: booking.timeZone },
      end: { dateTime: e.end.toISOString(), timeZone: booking.timeZone },
      colorId: "7",
    }),
  });
  if (!res.ok) throw new Error(`events.insert ${res.status}`);
  return (await res.json()).id as string;
}
