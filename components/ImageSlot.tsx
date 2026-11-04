"use client";
import { useState } from "react";
import { ImageIcon } from "lucide-react";

/** Muestra /public/images/<archivo>; si no existe, un marcador elegante. */
export default function ImageSlot({ src, alt, className = "", hint }: { src: string; alt: string; className?: string; hint?: string }) {
  const [ok, setOk] = useState(true);
  return (
    <div className={`relative overflow-hidden bg-sand/50 ${className}`}>
      {ok ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={src} alt={alt} loading="lazy" onError={() => setOk(false)} className="absolute inset-0 h-full w-full object-cover" />
      ) : (
        <div role="img" aria-label={alt} className="absolute inset-0 flex flex-col items-center justify-center gap-2 p-6 text-center text-navy/60">
          <ImageIcon strokeWidth={1.2} className="h-8 w-8" />
          <span className="text-xs leading-relaxed">{hint ?? `Coloca tu imagen en public${src}`}</span>
        </div>
      )}
    </div>
  );
}
