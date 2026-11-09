import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";
import { site } from "@/lib/config";

export const metadata: Metadata = { title: "Aviso de privacidad | ARTHEA Soluciones Médicas", robots: { index: true, follow: true } };

// IMPORTANTE: texto base. Debe ser revisado por un abogado y completarse con el domicilio del responsable (LFPDPPP).
export default function Page() {
  return (
    <LegalPage title="Aviso de privacidad">
      <p>{site.fullName} (en adelante, “ARTHEA”), con ubicación en {site.city}, es responsable del tratamiento de los datos personales que usted proporcione a través de este sitio web, conforme a la Ley Federal de Protección de Datos Personales en Posesión de los Particulares.</p>
      <h2>Datos que recabamos</h2>
      <p>Únicamente datos de contacto para atender su solicitud de cita:</p>
      <ul><li>Nombre completo</li><li>Motivo general de consulta (categoría de servicio) y fecha/hora elegidas</li><li>Teléfono</li><li>Correo electrónico (opcional)</li><li>Horario de contacto preferido</li></ul>
      <p>A través de este formulario no se solicitan datos clínicos ni diagnósticos. Le pedimos no incluirlos.</p>
      <h2>Finalidades</h2>
      <p>Usamos sus datos para contactarle, confirmar disponibilidad y agendar su valoración médica. Las citas se registran en el calendario interno de la clínica. No los utilizamos para fines publicitarios sin su consentimiento.</p>
      <h2>Transferencia de datos</h2>
      <p>No transferimos sus datos personales a terceros, salvo a proveedores tecnológicos necesarios para operar el sitio y el envío de solicitudes, o cuando la ley lo exija.</p>
      <h2>Derechos ARCO</h2>
      <p>Usted puede ejercer sus derechos de acceso, rectificación, cancelación y oposición, así como revocar su consentimiento, escribiéndonos{site.whatsapp ? " por WhatsApp" : ""}{site.email ? ` o a ${site.email}` : ""}. Atenderemos su solicitud en los plazos que establece la ley.</p>
      <h2>Cambios al aviso</h2>
      <p>Cualquier modificación se publicará en esta página.</p>
    </LegalPage>
  );
}
