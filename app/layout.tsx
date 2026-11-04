import type { Metadata } from "next";
import { Newsreader, Instrument_Sans } from "next/font/google";
import "./globals.css";
import { site } from "@/lib/config";

const serif = Newsreader({ subsets: ["latin"], variable: "--font-serif", style: ["normal", "italic"] });
const sans = Instrument_Sans({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: "VERALTO Soluciones Médicas | Clínica privada en Culiacán, Sinaloa",
  description: "Medicina especializada en Culiacán: valoración médica, evaluación integral, salud metabólica y seguimiento profesional. Agenda tu valoración.",
  keywords: ["clínica privada Culiacán", "medicina metabólica Culiacán", "valoración médica Culiacán", "médico especialista Sinaloa"],
  openGraph: { title: site.fullName, description: "Medicina especializada. Atención con propósito.", locale: "es_MX", type: "website" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const ld = { "@context": "https://schema.org", "@type": "MedicalClinic", name: site.fullName, url: site.url,
    address: { "@type": "PostalAddress", addressLocality: "Culiacán", addressRegion: "Sinaloa", addressCountry: "MX" },
    ...(site.phone && { telephone: site.phone }) };
  return (
    <html lang="es-MX" className={`${serif.variable} ${sans.variable}`}>
      <body className="font-sans antialiased">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
        {children}
      </body>
    </html>
  );
}
