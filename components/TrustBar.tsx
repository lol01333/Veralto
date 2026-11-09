import { booking, doctor, site } from "@/lib/config";

export default function TrustBar() {
  const items = [
    ["Cédula profesional", doctor.license],
    ["Horario", `Lun–Vie, ${booking.open}–${booking.close} h`],
    ["Ubicación", site.city],
    ["Agenda", "En línea o por WhatsApp"],
  ];
  return (
    <section aria-label="Datos de la clínica" className="border-y border-ink/10 bg-bone/60">
      <dl className="wrap grid grid-cols-2 lg:grid-cols-4">
        {items.map(([k, v], i) => (
          <div key={k} className={`py-6 lg:py-8 ${i % 2 ? "pl-5 border-l border-ink/10" : ""} ${i > 1 ? "border-t border-ink/10 lg:border-t-0" : ""} ${i === 2 ? "lg:pl-5 lg:border-l" : ""}`}>
            <dt className="label text-ink/50">{k}</dt>
            <dd className="mt-2 font-display text-lg leading-snug sm:text-2xl">{v}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
