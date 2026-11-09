"use client";
import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import { bookableDays, formatDay, slotsFor } from "@/lib/booking";

/** Muestra el próximo horario libre real (Google Calendar si está conectado). */
export default function NextSlot() {
  const [next, setNext] = useState<{ fecha: string; hora: string } | null>(null);
  useEffect(() => {
    let alive = true;
    (async () => {
      let dias: string[] = [];
      try { dias = (await (await fetch("/api/disponibilidad")).json()).dias; } catch { dias = bookableDays(); }
      for (const fecha of dias.slice(0, 5)) {
        let slots;
        try { slots = (await (await fetch(`/api/disponibilidad?fecha=${fecha}`)).json()).slots; } catch { slots = slotsFor(fecha); }
        const s = slots.find((x: { libre: boolean }) => x.libre);
        if (s) { if (alive) setNext({ fecha, hora: s.hora }); return; }
      }
    })();
    return () => { alive = false; };
  }, []);
  return (
    <a data-next-slot href="#agenda" className="group inline-flex max-w-full items-center gap-4 rounded-2xl border border-ink/10 bg-paper/80 py-3 pl-4 pr-3 backdrop-blur transition hover:border-sage/40">
      <span className="pulse-dot h-2.5 w-2.5 shrink-0 rounded-full bg-sage" />
      <span className="min-w-0">
        <span className="label block text-ink/50">Próximo horario disponible</span>
        <span data-next-text className="mt-1 block truncate text-sm font-medium first-letter:uppercase">
          {next ? `${formatDay(next.fecha, { weekday: "long", day: "numeric", month: "short" })} · ${next.hora} h` : "Consultando agenda…"}
        </span>
      </span>
      <span className="ml-2 grid h-9 w-9 shrink-0 place-items-center rounded-full bg-ink text-paper transition group-hover:bg-sage"><ArrowRight className="h-4 w-4" /></span>
    </a>
  );
}
