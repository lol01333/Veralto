import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";
import { site } from "@/lib/config";

export const metadata: Metadata = { title: "Términos y condiciones | ARTHEA Soluciones Médicas", robots: { index: true, follow: true } };

// IMPORTANTE: texto base. Debe ser revisado por un abogado antes de publicarse como definitivo.
export default function Page() {
  return (
    <LegalPage title="Términos y condiciones">
      <p>Al usar este sitio web de {site.fullName} usted acepta los siguientes términos.</p>
      <h2>Carácter informativo</h2>
      <p>El contenido de este sitio es de carácter educativo e informativo y no sustituye una valoración, diagnóstico o tratamiento médico profesional. Ninguna información del sitio constituye una promesa de resultados.</p>
      <h2>Valoración médica</h2>
      <p>Cualquier indicación, estudio o tratamiento se define exclusivamente por el médico en consulta, tras la valoración individual de cada paciente. Los resultados pueden variar entre personas.</p>
      <h2>Solicitudes de cita</h2>
      <p>El envío del formulario o de un mensaje de WhatsApp es una solicitud de contacto y no garantiza una cita hasta que ARTHEA la confirme.</p>
      <h2>Propiedad intelectual</h2>
      <p>Los textos, marcas e imágenes de este sitio pertenecen a ARTHEA o a sus titulares y no pueden reproducirse sin autorización.</p>
      <h2>Privacidad</h2>
      <p>El tratamiento de sus datos personales se rige por nuestro <a className="text-ink underline underline-offset-4" href="/aviso-de-privacidad">Aviso de privacidad</a>.</p>
    </LegalPage>
  );
}
