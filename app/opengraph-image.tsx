import { ImageResponse } from "next/og";

export const alt = "ARTHEA Soluciones Médicas | Clínica privada en Culiacán, Sinaloa";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", background: "#0C1B2A", color: "#F5F4F0" }}>
        <div style={{ fontSize: 120, letterSpacing: 24, fontFamily: "serif" }}>ARTHEA</div>
        <div style={{ fontSize: 34, marginTop: 24, opacity: 0.8, fontFamily: "serif" }}>Soluciones Médicas</div>
        <div style={{ fontSize: 26, marginTop: 48, opacity: 0.6 }}>Clínica privada en Culiacán, Sinaloa</div>
      </div>
    ),
    size,
  );
}
