import { NextResponse } from "next/server";
import { Resend } from "resend";
// Punto de integración: conecta aquí tu CRM, correo o base de datos protegida.
// Recibe solo datos administrativos: nombre, teléfono, correo (opcional), horario.
export async function POST(req: Request) {
  const { nombre, telefono, correo, horario } = await req.json();
  if (!nombre || !telefono) return NextResponse.json({ ok: false }, { status: 400 });
  
  const resend = new Resend(process.env.RESEND_API_KEY);
  const { error } = await resend.emails.send({
    from: "VERALTO web <onboarding@resend.dev>",
    to: process.env.CITAS_EMAIL!,
    subject: `Nueva solicitud de cita: ${nombre}`,
    text: `Nombre: ${nombre}\nTelefono: ${telefono}\nCorreo: ${correo || "No proprcionado"}\nHorario Preferido: ${horario}`,
  });

  if (error) return NextResponse.json({ok: false }, {status: 500});
  return NextResponse.json({ ok: true });
}
