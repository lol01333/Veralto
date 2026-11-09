"use client";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { site, waLink } from "@/lib/config";

const links = [["Servicios", "#servicios"], ["Método", "#metodo"], ["Médica", "#medica"], ["Preguntas", "#faq"], ["Ubicación", "#ubicacion"]];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [solid, setSolid] = useState(false);
  useEffect(() => {
    const on = () => setSolid(window.scrollY > 24);
    on(); window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  return (
    <header data-nav className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${solid || open ? "border-b border-ink/10 bg-paper/90 backdrop-blur-md" : "bg-transparent"}`}>
      <nav aria-label="Principal" className="wrap flex h-[4.5rem] items-center justify-between gap-6">
        <a href="#inicio" className="flex items-baseline gap-2.5">
          <span className="font-display text-[1.7rem] leading-none tracking-[0.14em]">{site.name}</span>
          <span className="label hidden text-ink/50 sm:inline">Soluciones Médicas</span>
        </a>
        <ul className="hidden items-center gap-8 text-sm lg:flex">
          {links.map(([l, h]) => <li key={h}><a href={h} className="text-ink/70 transition hover:text-ink">{l}</a></li>)}
        </ul>
        <div className="hidden items-center gap-3 lg:flex">
          {site.whatsapp && <a href={waLink()} target="_blank" rel="noopener noreferrer" className="text-sm text-ink/70 transition hover:text-ink">WhatsApp</a>}
          <a href="#agenda" className="btn-ink !py-2.5">Agendar valoración</a>
        </div>
        <button data-menu-btn className="-mr-2 p-2 lg:hidden" onClick={() => setOpen(!open)} aria-expanded={open} aria-label={open ? "Cerrar menú" : "Abrir menú"}>
          {open ? <X strokeWidth={1.5} /> : <Menu strokeWidth={1.5} />}
        </button>
      </nav>
      {open && (
        <div className="wrap pb-6 lg:hidden">
          <ul className="flex flex-col">
            {links.map(([l, h]) => <li key={h}><a href={h} onClick={() => setOpen(false)} className="block border-b border-ink/10 py-4 font-display text-2xl">{l}</a></li>)}
          </ul>
          <a href="#agenda" onClick={() => setOpen(false)} className="btn-ink mt-6 w-full">Agendar valoración</a>
        </div>
      )}
    </header>
  );
}
