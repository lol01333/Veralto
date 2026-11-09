import { site, waLink } from "@/lib/config";

export default function Footer() {
  return (
    <footer className="border-t border-ink/10 pb-28 pt-16 lg:pb-12">
      <div className="wrap grid gap-10 md:grid-cols-12">
        <div className="md:col-span-5">
          <p className="font-display text-4xl tracking-[0.14em]">{site.name}</p>
          <p className="label mt-2 text-ink/50">Soluciones Médicas · {site.city}</p>
        </div>
        <ul className="space-y-2 text-sm text-ink/70 md:col-span-3">
          <li className="label mb-3 text-ink/40">Contacto</li>
          <li><a href="#agenda" className="hover:text-ink">Agendar valoración</a></li>
          {site.whatsapp && <li><a href={waLink()} target="_blank" rel="noopener noreferrer" className="hover:text-ink">WhatsApp {site.whatsappDisplay}</a></li>}
          <li>{site.hours}</li>
        </ul>
        <ul className="space-y-2 text-sm text-ink/70 md:col-span-3">
          <li className="label mb-3 text-ink/40">Legal</li>
          <li><a href="/aviso-de-privacidad" className="hover:text-ink">Aviso de privacidad</a></li>
          <li><a href="/terminos" className="hover:text-ink">Términos y condiciones</a></li>
        </ul>
      </div>
      <p className="wrap mt-14 border-t border-ink/10 pt-6 text-xs leading-relaxed text-ink/50">
        La información de este sitio es educativa y no sustituye una valoración médica profesional. © {new Date().getFullYear()} {site.fullName}.
      </p>
    </footer>
  );
}
