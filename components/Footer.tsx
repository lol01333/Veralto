import { site } from "@/lib/config";

const col = "space-y-2 text-sm text-warm/75";
export default function Footer() {
  return (
    <footer className="bg-ink py-16 text-warm">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 md:grid-cols-4">
        <div>
          <p className="font-serif text-2xl tracking-[0.18em]">{site.name}</p>
          <p className="mt-4 text-sm text-warm/75">Soluciones Médicas. Clínica privada en {site.city}.</p>
        </div>
        <ul className={col}><li className="text-warm">Servicios</li><li><a href="#servicios">Medicina metabólica</a></li><li><a href="#servicios">Evaluación integral</a></li><li><a href="#servicios">Seguimiento</a></li></ul>
        <ul className={col}><li className="text-warm">Contacto</li><li><a href="#contacto">Solicitar una cita</a></li>{site.email && <li>{site.email}</li>}{site.phone && <li>{site.phone}</li>}</ul>
        <ul className={col}><li className="text-warm">Legal</li><li><a href="/aviso-de-privacidad">Aviso de privacidad</a></li><li><a href="/terminos">Términos y condiciones</a></li></ul>
      </div>
      <p className="mx-auto mt-14 max-w-7xl border-t border-warm/15 px-6 pt-6 text-xs leading-relaxed text-warm/60">
        La información de este sitio es educativa y no sustituye una valoración médica profesional. © {new Date().getFullYear()} {site.fullName}.
      </p>
    </footer>
  );
}
