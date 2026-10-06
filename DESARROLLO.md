# Guía de desarrollo — demo-landin

Este documento es para quien retome el proyecto: qué es, cómo está armado,
cómo se agrega una propuesta nueva y cómo se genera una landing con el agente
de IA (así se hizo `panaderia-la-espiga`).

## Qué es

Un sitio **100% estático** (HTML5 + CSS3 + JS vanilla, sin build ni
dependencias) con un **hub** en la raíz y **una landing por rubro** en
`propuestas/`. Se publica tal cual en cualquier hosting estático.

## Estructura

```
index.html                     hub: presenta las propuestas y entregables
assets/css/base.css            sistema de diseño compartido (tokens, componentes, nav móvil)
assets/js/main.js              comportamiento compartido (menú móvil, reveal, validación demo, año)
propuestas/<rubro>/index.html  una landing por rubro
propuestas/<rubro>/styles.css  tokens y estilos propios de esa landing
propuestas/panaderia-la-espiga/contact.php   backend real del form de La Espiga
odd/tasks/5-landing-pages.md   plan de tareas del feature original
.nojekyll                      GitHub Pages: evita el procesado Jekyll
```

## Correr en local

```bash
# Sitio completo (hub + propuestas)
python3 -m http.server 8000
# → http://localhost:8000

# La Espiga con su formulario REAL (requiere PHP)
php -S localhost:8092 -t propuestas/panaderia-la-espiga
# → http://localhost:8092/index.html   (el form escribe contacts.log)
```

## Convenciones de una propuesta

Cada `propuestas/<rubro>/index.html`:

1. Linkea **primero** `../../assets/css/base.css` y **después** su `styles.css`.
   La identidad visual propia (colores, tipografías) vive en `styles.css`;
   la estructura y los componentes vienen de `base.css`.
2. Usa las clases del sistema: `container`, `site-header`, `nav`, `btn`,
   `card`, `section`, `badge`, etc. No inventar variantes si ya existen.
3. Accesibilidad obligatoria: `skip-link`, `label` en todos los campos,
   `alt` en todas las imágenes, foco visible, `prefers-reduced-motion`.
4. Secciones estándar: Inicio, Quiénes somos, Servicios, Contacto.
5. El menú móvil y las animaciones de aparición funcionan solos vía
   `data-nav`, `data-nav-toggle` y la clase `reveal` de `main.js`.
6. SEO mínimo: `<title>` con marca + rubro y `<meta name="description">`.

## Agregar una propuesta nueva

1. Crear `propuestas/<rubro>/` con `index.html` + `styles.css`
   (copiar una existente como base es lo más rápido: p. ej. `estudio-contafirma`).
2. Completar los textos, el `<title>`, la meta description y las imágenes.
3. Agregar la card en el hub `index.html` (buscar el bloque `<!-- Panadería -->`
   y copiar ese patrón: `card__media` con imagen, `badge` del rubro, título,
   texto, `tags` y link `Ver propuesta &rarr;`).
4. Agregar la fila en la tabla de propuestas del `README.md`.
5. Probar en 375 px, 768 px y 1280 px. Correr el html con
   `python3 -m http.server` y navegar el hub.

## Formularios: demo vs real

- **Todas las propuestas menos La Espiga**: el formulario es **demostrativo**
  (valida en cliente y muestra un mensaje de éxito; no envía nada).
- **La Espiga**: `contact.php` recibe el POST (`nombre`, `email`, `mensaje`),
  valida, y agrega una línea a `contacts.log`. Requiere PHP.
  En un hosting estático el POST va a fallar: reconectar el form a un servicio
  de correo (Formspree, Resend) o a un backend, y avisar al cliente.

## Generar una landing con IA (flujo usado para La Espiga)

La landing de La Espiga fue generada y corregida por **Meta AI** a través del
agente del proyecto `meta-api` (`/home/test/test/meta-api`; su guía interna es
`AGENTE.md` en ese repo). El flujo:

1. El agente expone `POST http://127.0.0.1:8055/v1/agent` con un `task` en
   lenguaje natural. Meta escribe comandos shell, el broker los ejecuta en un
   sandbox Docker aislado (sin red, workspace montado) y le devuelve la salida.
2. Para trabajos visuales, adjuntar **capturas** al job (`images: [dataURL]`):
   Meta ve el estado actual y corrige. Capturar con Chrome headless:
   `google-chrome --headless=new --screenshot=out.png --window-size=1280,900 URL`.
3. Para ver un estado no capturable (menú móvil abierto), forzarlo por CDP
   (`Emulation.setDeviceMetricsOverride` + `Page.captureScreenshot`) antes de
   capturar.
4. **Regla de oro**: pedirle que escriba el archivo completo en UN comando
   (`echo '<BASE64>' | base64 -d > archivo`) — el límite por comando del parser
   es 50000 chars. Reescribir por partes corrompe el archivo.
5. **Post-proceso obligatorio** del output de la IA: validar balance de tags,
   URLs de imágenes (200), acentos, y renderizar/capturar para revisar. La IA
   no ve el resultado: el humano (o un script) verifica.

## Publicación

- **GitHub Pages**: el repo ya tiene `.nojekyll`; Settings → Pages → branch.
- **Netlify / Vercel / Cloudflare Pages**: importar el repo, build vacío,
  directorio de publicación = raíz (`.`).
- **cPanel**: subir el contenido a `public_html/` + AutoSSL.
- Detalles completos (dominio, SSL, checklist) en el `README.md`.

## Flujo git

- Ramas `feat/<n>-<tema>` para features; merge a `main` por PR.
- Commits convencionales en inglés, con scope:
  `feat(landing): ...`, `fix(responsive): ...`, `chore: ...`.
- Cada propuesta nueva = un commit propio + su card de hub + README en el
  mismo commit.
