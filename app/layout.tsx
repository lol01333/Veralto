import type { Metadata, Viewport } from "next";
import { Instrument_Serif, Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { booking, doctor, site } from "@/lib/config";

const display = Instrument_Serif({ subsets: ["latin"], weight: "400", style: ["normal", "italic"], variable: "--font-display" });
const sans = Geist({ subsets: ["latin"], variable: "--font-sans" });
const mono = Geist_Mono({ subsets: ["latin"], variable: "--font-mono" });

export const viewport: Viewport = { themeColor: "#0C1B2A" };

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: "ARTHEA Soluciones Médicas | Medicina metabólica y control de peso en Culiacán",
  description: "Clínica privada en Culiacán: medicina metabólica, control de peso y tratamientos con péptidos, siempre con valoración médica previa. Agenda tu cita en línea.",
  keywords: ["medicina metabólica Culiacán", "control de peso Culiacán", "clínica privada Culiacán", "valoración médica Culiacán", "tratamientos con péptidos Culiacán"],
  alternates: { canonical: "/" },
  openGraph: { title: site.fullName, description: "Medicina especializada. Para el nuevo tú. Agenda tu valoración en línea.", locale: "es_MX", type: "website", url: "/", siteName: site.fullName },
  twitter: { card: "summary_large_image", title: site.fullName, description: "Medicina metabólica y control de peso en Culiacán." },
};

const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const ld = {
    "@context": "https://schema.org", "@type": "MedicalClinic", name: site.fullName, url: site.url,
    image: `${site.url}${doctor.photo}`,
    address: { "@type": "PostalAddress", ...(site.address && { streetAddress: site.address }), addressLocality: "Culiacán", addressRegion: "Sinaloa", addressCountry: "MX" },
    areaServed: "Culiacán, Sinaloa",
    ...(site.whatsapp && { telephone: `+${site.whatsapp}` }),
    openingHoursSpecification: [{ "@type": "OpeningHoursSpecification", dayOfWeek: booking.days.map((d) => dayNames[d]), opens: `${String(booking.open).padStart(2, "0")}:00`, closes: `${booking.close}:00` }],
  };
  return (
    <html lang="es-MX" className={`${display.variable} ${sans.variable} ${mono.variable}`}>
      <body className="font-sans antialiased">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
        {children}
      </body>
    </html>
  );
}
