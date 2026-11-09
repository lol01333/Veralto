# ARTHEA Soluciones Médicas — Sitio web

Next.js 16 · React 18 · TypeScript · Tailwind · Lucide.

## Instalación
```bash
npm install
npm run dev      # http://localhost:3000
npm run build && npm start
```
## Configuración
- `lib/config.ts`: WhatsApp, teléfono, correo, dirección, horarios, mapa y datos del médico (vacíos a propósito; los campos vacíos se ocultan).
- Imágenes en `public/images/`: `hero.jpg`, `consultorio.jpg`, `medico.jpg` (usa fotos con licencia, p. ej. Unsplash/Pexels, o fotos reales de tu clínica; evita imágenes que aparenten ser tu equipo real).
- `app/api/cita/route.ts`: conecta tu CRM o correo. Solo se recaban datos administrativos.
- Cambia `site.url` y crea las páginas `/aviso-de-privacidad` y `/terminos` (requeridas por LFPDPPP).

## Despliegue
Sube a GitHub e impórtalo en Vercel (framework Next.js, sin variables obligatorias), o usa `npm run build && npm start` en tu servidor.

## Variables de entorno (Vercel → Settings → Environment Variables)
- `RESEND_API_KEY`: clave de Resend.
- `CITAS_EMAIL`: correo que recibe las solicitudes. Con el remitente de prueba `onboarding@resend.dev` solo se entrega al correo verificado en Resend; para producción verifica un dominio y cambia `from` en `app/api/cita/route.ts`.

## Pendientes de datos reales
- `lib/config.ts`: dirección, mapa (`mapEmbedUrl`), dominio (`url`), teléfono y correo. Los campos vacíos se ocultan.
- Fotos: `public/images/consultorio.jpg` (hoy se ve el marcador de posición).
- Certificaciones de la médica: se mostrarán automáticamente al agregarlas en `doctor.certifications`.
- Aviso de privacidad y términos (`app/aviso-de-privacidad`, `app/terminos`) son texto base: requieren revisión legal y el domicilio del responsable.
