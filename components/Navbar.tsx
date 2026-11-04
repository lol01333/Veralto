"use client";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { site } from "@/lib/config";

const links = [["Inicio","#inicio"],["Nosotros","#nosotros"],["Servicios médicos","#servicios"],["Nuestro enfoque","#enfoque"],["Preguntas frecuentes","#faq"],["Contacto","#contacto"]];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-navy/15 bg-warm/90 backdrop-blur">
      <nav aria-label="Principal" className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <a href="#inicio" className="font-serif text-2xl tracking-[0.18em] text-navy">{site.name}</a>
        <ul className="hidden items-center gap-7 text-sm lg:flex">
          {links.map(([l, h]) => <li key={h}><a href={h} className="text-ink/80 transition hover:text-navy">{l}</a></li>)}
        </ul>
        <a href="#contacto" className="hidden rounded-full bg-navy px-5 py-2.5 text-sm text-warm transition hover:bg-ink lg:inline-block">Agendar valoración</a>
        <button className="lg:hidden" onClick={() => setOpen(!open)} aria-expanded={open} aria-label={open ? "Cerrar menú" : "Abrir menú"}>
          {open ? <X /> : <Menu />}
        </button>
      </nav>
      {open && (
        <div className="border-t border-navy/10 bg-warm px-6 pb-6 lg:hidden">
          <ul className="flex flex-col py-2">
            {links.map(([l, h]) => <li key={h}><a href={h} onClick={() => setOpen(false)} className="block border-b border-navy/10 py-3">{l}</a></li>)}
          </ul>
          <a href="#contacto" onClick={() => setOpen(false)} className="mt-4 block rounded-full bg-navy py-3 text-center text-warm">Agendar valoración</a>
        </div>
      )}
    </header>
  );
}
