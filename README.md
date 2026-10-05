# Propuestas de sitios web profesionales

Sitio de demostración con **5 landing pages** para distintos rubros locales, más un
**hub** en la raíz que presenta cada propuesta y los entregables incluidos.

Es un sitio 100% estático (HTML5 + CSS3 + JavaScript vanilla): no requiere build,
ni frameworks, ni base de datos. Puede publicarse tal cual en cualquier hosting estático.

## Contenido de la demo

- `index.html` — hub con las 5 propuestas y la lista de entregables comerciales.
- `assets/css/base.css` — sistema de diseño compartido (tokens, tipografía fluida,
  componentes, navegación móvil, accesibilidad y `prefers-reduced-motion`).
- `assets/js/main.js` — comportamiento compartido (menú móvil, scroll suave, link
  activo, animación de aparición, validación del formulario demo y año dinámico).
- `propuestas/<rubro>/index.html` — una landing por rubro, con `styles.css` propio.

## Las 5 propuestas

| Rubro | Marca | Enfoque | Ruta |
| --- | --- | --- | --- |
| Restaurante | Sabor Andino | Cocina andina de autor, menú y reservas | `propuestas/restaurante-sabor-andino/index.html` |
| Gimnasio | Impulso Fitness Club | Funcional, musculación, clases y planes | `propuestas/gimnasio-impulso-fitness/index.html` |
| Clínica dental | OdontoVida | General, ortodoncia, implantes y estética | `propuestas/clinica-odontovida/index.html` |
| Inmobiliaria | Terra Propiedades | Venta, alquiler y tasaciones | `propuestas/inmobiliaria-terra/index.html` |
| Estudio contable | ContaFirma Asesores | Contabilidad, impuestos, laboral y sociedades | `propuestas/estudio-contafirma/index.html` |

Cada landing incluye las secciones `Inicio`, `Quiénes somos`, `Servicios` y `Contacto`,
con navegación de anclas, menú móvil y formulario de contacto demostrativo.

> **Importante:** los formularios son **demostrativos**. Validan del lado del cliente y
> muestran un mensaje de éxito, pero **no envían datos a ningún servidor**. Para un sitio
> real habría que conectarlos a un servicio de correo o backend.

## Entregables incluidos

- Sitio **Inicio**.
- Sección **Quiénes somos**.
- Sección **Servicios**.
- Sección **Contacto**.
- **Hosting anual**: puede proveerlo el cliente o gestionarlo el desarrollador.
- **Dominio anual**: se adquiere a nombre del cliente.
- **Certificado SSL**: sitio publicado y funcionando con HTTPS.

## Cómo publicar un sitio estático

El proyecto es una carpeta de archivos estáticos. Publicar es subir el contenido y
apuntar el dominio al hosting. Opciones habituales:

### Opción A — Hosting con despliegue desde repositorio (recomendado)

Netlify, Vercel, Cloudflare Pages o GitHub Pages pueden publicar el sitio directamente
desde un repositorio Git:

1. Crear un repositorio y subir el contenido del proyecto.
2. En la plataforma, elegir **Import / New site from Git** y conectar el repositorio.
3. Configurar:
   - **Build command**: dejar vacío (no hay build).
   - **Publish / output directory**: la raíz del proyecto (`.`).
4. Desplegar. La plataforma entrega una URL temporal `*.netlify.app`, `*.vercel.app`,
   `*.pages.dev` o `*.github.io`.
5. Cargar el dominio propio en la configuración de dominios de la plataforma.

El SSL lo emite la plataforma de forma automática (Let's Encrypt) al conectar el dominio.

### Opción B — Hosting con cPanel (tradicional)

1. Contratar un plan de hosting con cPanel.
2. Entrar al **Administrador de archivos** y subir el contenido a `public_html/`.
3. (Opcional) Subir un archivo `.zip` y usar **Extract** para descomprimir en el servidor.
4. Verificar que `index.html` quede en la raíz de `public_html/`.
5. Activar **AutoSSL** (Let's Encrypt) desde la sección SSL/TLS del cPanel.

### Verificación en local (antes de publicar)

```bash
# Desde la raíz del proyecto
python3 -m http.server 8000
# Luego abrir http://localhost:8000
```

## Hosting anual

El hosting es el espacio donde viven los archivos. Hay dos modalidades:

- **Lo provee el cliente**: el cliente contrata (o ya tiene) un plan y entrega los
  accesos al desarrollador para publicar. El desarrollador no factura el hosting.
- **Lo gestiona el desarrollador**: el desarrollador contrata el plan a nombre del
  cliente o de la agencia, y lo renueva cada año. Se recomienda documentar en la
  propuesta si el costo del hosting está incluido o se factura aparte.

En ambos casos, el ciclo es **anual**: al vencimiento hay que renovar para que el sitio
siga en línea.

## Dominio anual

El dominio (por ejemplo `saborandino.com`) se **compra para el cliente** y se registra
a su nombre o con sus datos de titular, para que sea dueño de su marca. Recomendaciones:

1. Elegir el nombre y verificar disponibilidad en un registrador (Namecheap, Cloudflare
   Registrar, Google Domains/Squarespace, o el registrador incluido en el hosting).
2. Registrarlo por un año (o varios) indicando los datos del cliente como titular.
3. Configurar los **DNS** apuntando al hosting:
   - Si el hosting da nameservers, usar esos nameservers.
   - Si no, crear los registros `A` (y `AAAA` si aplica) o el `CNAME` que indique el proveedor.
4. Renovar cada año antes del vencimiento para evitar la pérdida del dominio.

## Certificado SSL (sitio con HTTPS)

El objetivo del entregable es que el sitio quede **publicado y funcionando sobre HTTPS**.
Existen dos caminos:

- **Automático vía plataforma**: Netlify, Vercel, Cloudflare Pages y GitHub Pages emiten
  y renuevan el certificado con Let's Encrypt cuando el dominio apunta a ellos. No hay
  que hacer nada manual.
- **Automático vía cPanel (AutoSSL)**: cPanel puede emitir el certificado con Let's
  Encrypt desde *SSL/TLS → SSL/TLS Status → Run AutoSSL*.

## Checklist de verificación: dominio + SSL

- [ ] El dominio resuelve al hosting correcto (propagación DNS completa).
- [ ] La URL `https://<dominio>` carga el sitio sin errores.
- [ ] La URL `http://<dominio>` redirige a `https://` (forzar HTTPS / redirect).
- [ ] El candado de SSL aparece en el navegador, sin advertencias de certificado.
- [ ] La versión `www` funciona o redirige a la versión canónica elegida.
- [ ] No hay contenido mixto (recursos cargados por `http://`) en la consola.
- [ ] El certificado es válido y su fecha de expiración es visible en el detalle del candado.
- [ ] La renovación automática está activa (Let's Encrypt o AutoSSL).
- [ ] Los formularios y enlaces internos funcionan en producción.

## Accesibilidad y calidad

- HTML semántico con landmarks (`header`, `main`, `footer`, `nav`).
- `alt` en todas las imágenes, `label` en todos los campos y skip link.
- Foco visible (`:focus-visible`) y respeto por `prefers-reduced-motion`.
- Layout probado para no romperse en 375 px, 768 px y 1280 px.

## Notas

- Las imágenes son fotografías de Unsplash con URLs directas. Para un cliente real
  conviene descargarlas y servirlas localmente (evita dependencias externas).
- No se incluyen logos ni marcas de terceros; los nombres comerciales de las propuestas
  son ficticios y propios de la demo.
