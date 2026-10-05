# Feature: 5 landing pages de propuesta — demo-landin

## Objective
Producir 5 landing pages estaticas profesionales (una por rubro local) mas un hub que
presenta las propuestas y los entregables comerciales (hosting anual, dominio anual,
certificado SSL), listo para publicar con SSL en cualquier hosting estatico.

## Problem / Why
El cliente final debe recibir una propuesta visual concreta, no una descripcion.
El usuario necesita demos navegables que muestren Inicio / Quienes somos / Servicios /
Contacto para distintos rubros, con imagenes reales y contenido creible.

## Scope
In:
- `index.html` (hub) con las 5 propuestas y la lista de entregables.
- 5 landing pages, una por rubro, cada una con las 4 secciones.
- `assets/css/base.css` + `assets/js/main.js` compartidos.
- `README.md` con entregables, hosting, dominio y SSL (procedimiento real).
- Imagenes externas verificadas (HTTP 200) de Unsplash.

Out (no se implementa):
- Backend, CMS, base de datos, envio real de formularios (el form es demo).
- Aprovisionamiento real de hosting/dominio/SSL (solo se documenta el procedimiento).
- Pagos, analitica, i18n multilingue.

## Constraints
- HTML/CSS/JS estatico, sin build ni dependencias obligatorias. Publicable tal cual.
- Responsive en 375 / 768 / 1280 px. Accesible (alt, labels, focus, contraste).
- Contenido en espanol neutro, profesional. Sin slang regional.
- Sin logos ni trademarks de terceros. Nombres comerciales plausibles y propios.
- Imagenes: URLs de Unsplash ya verificadas (todas responden 200).
- Los formularios de contacto son demostrativos (validacion client-side, sin backend).

## Rubros y marcas
1. Restaurante — "Sabor Andino" — cocina andina de autor, menu, reservas.
2. Gimnasio — "Impulso Fitness Club" — funcional, musculacion, clases, planes.
3. Clinica dental — "OdontoVida" — general, ortodoncia, implantes, estetica.
4. Inmobiliaria — "Terra Propiedades" — venta, alquiler, tasaciones.
5. Estudio contable — "ContaFirma Asesores" — contabilidad, impuestos, laboral, sociedades.

## Estructura de archivos
```
demo-landin/
  index.html                  # hub: propuestas + entregables
  README.md                   # entregables + hosting/dominio/SSL
  assets/css/base.css
  assets/js/main.js
  propuestas/
    restaurante-sabor-andino/index.html + styles.css
    gimnasio-impulso-fitness/index.html + styles.css
    clinica-odontovida/index.html + styles.css
    inmobiliaria-terra/index.html + styles.css
    estudio-contafirma/index.html + styles.css
```

## Contrato de secciones (cada landing)
- `#inicio` — hero con propuesta de valor + CTA.
- `#nosotros` — quienes somos (historia, valores, numeros).
- `#servicios` — grilla de servicios/productos (3-6 tarjetas).
- `#contacto` — datos reales de contacto + formulario demo + horarios.
- Header con nav anclas + menu mobile. Footer con aviso de entregables y ano dinamico.

## Tasks
- [ ] T1 — Scaffold: git init, estructura, `assets/css/base.css`, `assets/js/main.js`, `README.md`.
- [ ] T2 — Hub `index.html` con 5 tarjetas de propuesta + entregables (hosting/dominio/SSL).
- [ ] T3 — Landing Restaurante "Sabor Andino".
- [ ] T4 — Landing Gimnasio "Impulso Fitness Club".
- [ ] T5 — Landing Clinica Dental "OdontoVida".
- [ ] T6 — Landing Inmobiliaria "Terra Propiedades".
- [ ] T7 — Landing Estudio Contable "ContaFirma Asesores".
- [ ] T8 — QA: imagenes 200, integridad de anclas/links, responsive, sin errores.

## Acceptance criteria
- 7 paginas HTML presentes y enlazadas (hub -> 5 landings -> volver al hub).
- Cada landing tiene los 4 ids de seccion y nav funcional con scroll suave.
- Menu mobile funcional; layout no rompe en 375/768/1280.
- Todas las imagenes usadas responden HTTP 200.
- Sin errores en consola; sin recursos faltantes.
- README documenta hosting anual, dominio anual y SSL con pasos reales.
- Un work-unit commit por task (Conventional Commits, sin atribucion a IA).

## Checks
- `curl -o /dev/null -w '%{http_code}' <img>` para cada imagen.
- `grep` de anclas `#inicio/#nosotros/#servicios/#contacto` por landing.
- Revision visual/responsive y de consola.

## Delivery
Forecast: ~1800 lineas autoradas (5 landings + hub + base + README), por encima del
presupuesto de ~400. No hay remoto ni PRs en este entorno, por lo que la estrategia de
cadena (stacked / feature-branch-chain) no aplica: entrega local en una sola rama
`feat/5-landing-pages`. Si luego se publica en un remoto, se recomienda un PR por landing.

## Route per task
Todas las tasks de escritura: **delegated direct** con un writer (`general`), por el
writer trigger (2+ archivos no triviales). El orquestador valida (gate) y hace QA final.
Skill registry: no disponible en este proyecto; se procede sin skills inyectadas.
