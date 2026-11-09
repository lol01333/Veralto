import { NextResponse } from "next/server";
import { bookableDays, slotsFor } from "@/lib/booking";
import { busyFor, calendarConfigured } from "@/lib/gcal";

export const dynamic = "force-dynamic";

// GET /api/disponibilidad            → días reservables
// GET /api/disponibilidad?fecha=YYYY-MM-DD → horarios de ese día
export async function GET(req: Request) {
  const fecha = new URL(req.url).searchParams.get("fecha");
  const conectado = calendarConfigured();
  if (!fecha) return NextResponse.json({ dias: bookableDays(), conectado });
  if (!bookableDays().includes(fecha)) return NextResponse.json({ slots: [], conectado });
  let busy: { start: string; end: string }[] = [];
  if (conectado) {
    try { busy = await busyFor(fecha); } catch { /* si Google falla, se muestra el horario base */ }
  }
  return NextResponse.json({ slots: slotsFor(fecha, busy), conectado }, { headers: { "Cache-Control": "no-store" } });
}
