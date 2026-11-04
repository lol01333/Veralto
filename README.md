# VERALTO Soluciones Médicas — Sitio web

Next.js 14 · React · TypeScript · Tailwind · Lucide.

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
