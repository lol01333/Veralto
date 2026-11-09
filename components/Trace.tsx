/** Motivo gráfico de la marca: una línea continua, como un registro metabólico. */
export default function Trace({ className = "" }: { className?: string }) {
  return (
    <svg aria-hidden viewBox="0 0 1200 220" fill="none" preserveAspectRatio="none" className={`trace pointer-events-none ${className}`}>
      <path d="M0 160 C 120 160, 160 150, 220 150 S 300 60, 340 60 S 400 190, 450 190 S 520 120, 600 120 S 700 120, 760 110 S 860 40, 920 40 S 1010 140, 1080 140 S 1160 120, 1200 118"
        stroke="currentColor" strokeWidth="1.2" vectorEffect="non-scaling-stroke" />
    </svg>
  );
}
