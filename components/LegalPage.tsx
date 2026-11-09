import Link from "next/link";
import { site } from "@/lib/config";

export default function LegalPage({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <>
      <header className="border-b border-ink/15 bg-paper">
        <div className="mx-auto flex h-16 max-w-3xl items-center justify-between px-6">
          <Link href="/" className="font-display text-2xl tracking-[0.18em] text-ink">{site.name}</Link>
          <Link href="/" className="text-sm text-ink underline-offset-4 hover:underline">Volver al inicio</Link>
        </div>
      </header>
      <main className="mx-auto max-w-3xl px-6 py-16 lg:py-24">
        <h1 className="font-display text-4xl text-ink lg:text-5xl">{title}</h1>
        <div className="mt-10 space-y-6 leading-relaxed text-ink/80 [&_h2]:mt-10 [&_h2]:font-display [&_h2]:text-2xl [&_h2]:text-ink [&_ul]:list-disc [&_ul]:space-y-1 [&_ul]:pl-6">{children}</div>
      </main>
    </>
  );
}
