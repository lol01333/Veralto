import { MessageCircle } from "lucide-react";
import { site, waLink } from "@/lib/config";

/** Barra fija inferior en móvil: las dos acciones de conversión siempre a un toque. */
export default function MobileBar() {
  return (
    <div className="fixed inset-x-3 bottom-3 z-40 flex gap-2 rounded-full border border-ink/10 bg-paper/90 p-1.5 shadow-xl shadow-ink/15 backdrop-blur-md lg:hidden" style={{ marginBottom: "env(safe-area-inset-bottom)" }}>
      <a href="#agenda" className="btn-ink flex-1 !py-3">Agendar valoración</a>
      {site.whatsapp && (
        <a href={waLink()} target="_blank" rel="noopener noreferrer" aria-label="Escribir por WhatsApp" className="grid w-12 place-items-center rounded-full bg-mint text-ink">
          <MessageCircle className="h-5 w-5" />
        </a>
      )}
    </div>
  );
}
