import { NextResponse } from "next/server";
// Punto de integración: conecta aquí tu CRM, correo o base de datos protegida.
// Recibe solo datos administrativos: nombre, teléfono, correo (opcional), horario.
export async function POST(req: Request) {
  const { nombre, telefono, correo, horario } = await req.json();
  if (!nombre || !telefono) return NextResponse.json({ ok: false }, { status: 400 });
  console.log("Solicitud de cita:", { nombre, telefono, correo, horario });
  return NextResponse.json({ ok: true });
}
