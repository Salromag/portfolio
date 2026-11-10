# 間 · Portfolio

Portfolio personal bilingüe (ES / EN) de **Salva Romero**, desarrollador frontend con diez años de
experiencia en Angular, formularios dinámicos y librerías open source. Estética japonesa de tinta y
pincel: papel washi, sumi, un único acento bermellón y un enso dibujado a trazo.

Construido con **Angular 22**, componentes standalone y signals. Sin librerías de UI, sin
frameworks de CSS: solo SCSS con design tokens.

![Hero](../shots/01-hero.png)

Perfiles enlazados desde la página:

- GitHub — [@Salromag](https://github.com/Salromag)
- LinkedIn — [in/salva-romero-aguilar](https://www.linkedin.com/in/salva-romero-aguilar/)
- npm — [~salromagu](https://www.npmjs.com/~salromagu)


---

## Arrancar

```bash
cd portfolio
npm install
npm start          # http://localhost:4200
```

```bash
npm run build      # → dist/portfolio/browser
npm test           # vitest + jsdom
```

Requisitos: Node 20+ y npm.

---

## Personalizar el contenido

Todo el texto vive en **`src/app/core/content.ts`**. No hay cadenas sueltas por los componentes.

| Qué                                | Dónde                                     |
| ---------------------------------- | ----------------------------------------- |
| Nombre, email, ubicación, redes    | `PROFILE`                                 |
| Textos en español                  | `CONTENT.es`                              |
| Textos en inglés                   | `CONTENT.en`                              |
| Proyectos (grupos, título, año/`site`, tags, URL) | `CONTENT.<idioma>.work.groups` |
| Secciones del menú                 | `CONTENT.<idioma>.nav`                    |
| Habilidades                        | `CONTENT.<idioma>.skills.groups`          |

Los dos idiomas comparten la misma interfaz `PortfolioContent`, así que TypeScript te avisa si
añades un campo en uno y olvidas el otro.

> **Pendiente:** `PROFILE.email` es un marcador (`hola@salromagu.dev`). Cámbialo por tu dirección
> real antes de publicar.

### Proyectos que aparecen

El trabajo vive en **una sola sección con pestañas**: `work.groups[0]` es **open source** y
`work.groups[1]`, **clientes**. Añadir un grupo nuevo crea una pestaña más sin tocar el componente.

**源 Open source**

| Proyecto            | Qué es                                                       | Enlace                                          |
| ------------------- | ------------------------------------------------------------ | ----------------------------------------------- |
| `ngx-mat-form`      | Formularios dinámicos desde un esquema JSON, con Material    | [GitHub](https://github.com/Salromag/ngx-mat-form)      |
| `ngx-alertifying`   | Alertas y notificaciones para Angular                        | [GitHub](https://github.com/Salromag/ngx-alertifying)   |
| `hover-inspector`   | Overlay para inspeccionar elementos y copiar sus estilos     | [GitHub](https://github.com/Salromag/hover-inspector)   |
| `palette-inspector` | Extrae la paleta de colores de la página que estás viendo    | [GitHub](https://github.com/Salromag/palette-inspector) |

**客 Clientes**

| Proyecto          | Qué es                                                                       | Enlace                                        |
| ----------------- | ---------------------------------------------------------------------------- | --------------------------------------------- |
| Reformas Benlloch | Web corporativa para reformas integrales en Llíria (Valencia), hecha en Angular | [reformasbenlloch.es](https://reformasbenlloch.es/) |

Para añadir otro cliente basta con copiar un objeto dentro de `groups[1].projects`. Los proyectos
de cliente no llevan `year`: usan `site` (`reformasbenlloch.es`) y esa es la etiqueta que aparece a
la derecha de la fila.

### Pestañas

La sección de trabajos es un `tablist` de verdad, no botones con `display: none`:

- `role="tab"` / `role="tabpanel"`, `aria-selected`, `aria-controls` y `aria-labelledby` enlazados.
- Roving `tabindex`: solo la pestaña activa es tabulable (0) y el resto queda en −1.
- Teclado: ← → ↑ ↓ cambian de pestaña y mueven el foco; Inicio y Fin saltan a los extremos.
- El panel inactivo usa el atributo `hidden`, así que sus enlaces tampoco entran en el tabulador.

Añadir un grupo en `work.groups` crea una pestaña nueva sin tocar el componente: el contador, la
numeración y el estado activo se calculan solos.

### Idiomas

`LanguageService` (en `src/app/core/language.service.ts`) guarda el idioma en `localStorage`,
lo detecta desde `navigator.languages` la primera vez y actualiza `<html lang>`, el `<title>` y
la meta description al cambiar. El toggle ES / EN está en la cabecera y también en el menú móvil.

### Tema claro y oscuro (夜)

El botón 月 / 日 de la cabecera alterna entre papel washi y papel sumi. `ThemeService`
(`src/app/core/theme.service.ts`) escribe `data-theme="light|dark"` en `<html>` y guarda la
elección en `localStorage`.

- La primera visita sigue `prefers-color-scheme` del sistema y **no** guarda nada, así que el
  tema sigue cambiando con el sistema hasta que el visitante elija uno.
- Un script diminuto en `src/index.html` resuelve el tema *antes* del primer pintado, así que no
  hay destello del tema equivocado al cargar.
- También actualiza `<meta name="theme-color">` y `color-scheme`, para que la barra del navegador
  y los controles nativos acompañen.

Todo el tema son tokens en `src/styles.scss`: `:root` define el modo claro y
`:root[data-theme='dark']` sobreescribe los mismos nombres. Si añades un color nuevo, defínelo en
los dos bloques.

---

## Estructura

```
src/
├─ index.html                      fuentes, meta y favicon
├─ styles.scss                     tokens, reset, utilidades, grano, reveal
├─ styles/_brush.scss              el trazo de pincel reutilizable (mask)
└─ app/
   ├─ app.ts / .html / .scss       composición de la página + barra de progreso
   ├─ core/
   │  ├─ content.ts                ← todo el contenido editable
   │  ├─ language.service.ts       estado de idioma (signals) + persistencia
   │  ├─ theme.service.ts          tema claro / oscuro + persistencia
   │  └─ reveal.directive.ts       aparición al hacer scroll (IntersectionObserver)
   ├─ components/
   │  ├─ site-header/              navegación, toggle de idioma, menú móvil
   │  └─ site-footer/
   └─ sections/
      ├─ hero/                     nombre, enso 円相 y llamadas a la acción
      │  └─ enso.path.ts           trazo generado (no editar a mano)
      ├─ about/                    biografía + datos rápidos
      ├─ work/                     pestañas + lista editorial de proyectos
      ├─ skills/                   cuatro grupos de herramientas
      └─ contact/                  email, redes y banda seigaiha 青海波
tools/
└─ enso-gen.mjs                    genera el trazo del enso
```

---

## Sistema de diseño

Tokens en `src/styles.scss` (`:root`):

| Token              | Claro     | Oscuro    | Uso                                  |
| ------------------ | --------- | --------- | ------------------------------------ |
| `--paper`          | `#f3efe6` | `#131110` | fondo (washi / sumi)                 |
| `--paper-raised`   | `#faf7f0` | `#1b1816` | bloques de contacto y pie             |
| `--ink`            | `#191814` | `#f1ebdf` | texto principal                      |
| `--shu`            | `#b23a2b` | `#d9614c` | acento bermellón (朱), el único      |
| `--hair`           | 14 % tinta| 13 % tinta| filetes de 1 px                      |
| `--veil`           | 82 % papel| 82 % papel| fondo translúcido de la cabecera     |
| `--font-display`   | Yuji Boku | —      | titulares y kanji (pincel)           |
| `--font-body`      | Zen Kaku Gothic New | — | texto                        |
| `--font-mono`      | JetBrains Mono | — | etiquetas y números              |

Detalles de la estética:

- **円相 (enso)** en el hero: trazo de pincel con grosor variable, generado por
  `tools/enso-gen.mjs`, con un giro lentísimo de 150 s.
- **Pinceladas**: el filete de cada sección, el subrayado de los enlaces y el indicador de las
  pestañas son un mismo trazo irregular, aplicado como `mask` para que tome el color del texto.
- **間 (ma)**: el hueco es parte del diseño; las secciones respiran con `--section-y`.
- **Grano de papel**: capa `feTurbulence` fija en `body::after`.
- **青海波 (seigaiha)**: ondas concéntricas dibujadas con `radial-gradient` al final del contacto.
- **Kanji verticales**: `writing-mode: vertical-rl` en los laterales de sección.

Las fuentes se cargan desde Google Fonts con `display=swap` y una pila de reserva del sistema, así
que la página sigue siendo legible sin conexión.

### Por qué los titulares van en minúscula

Yuji Boku es una fuente de pincel con unas mayúsculas ambiguas: la **R** se lee como **A** y la
**M** como una lambda. «Romero» parecía «Aomero» y «Menos» parecía «Λenos». Sus minúsculas, en
cambio, son puro trazo y se leen perfectamente, así que los titulares (`h1`–`h4` y los nombres de
proyecto) se fuerzan a minúscula.

Eso deja un sistema tipográfico con dos voces: **pincel en minúscula** para lo que se dice y
**mono en mayúscula** para lo que se etiqueta (`OPEN SOURCE`, `LIBRERÍA ANGULAR`). Si algún día
cambias de fuente de display a una con mayúsculas legibles, quita el `text-transform` de `h1–h4`
en `src/styles.scss` y de `.work__name` / `.drawer__label`.

### El trazo del enso

`tools/enso-gen.mjs` no dibuja un círculo con `stroke`: calcula dos bordes separados por un grosor
variable a lo largo de 330° de arco y los une en una forma rellena. Así el trazo arranca grueso,
engorda en el centro y muere en punta, como un pincel de verdad.

```bash
node tools/enso-gen.mjs     # reescribe src/app/sections/hero/enso.path.ts
```

La rugosidad del borde no está en el path, sino en un filtro SVG del componente
(`feTurbulence` + `feDisplacementMap`), que es lo que hace que parezca tinta sobre papel.

---

## Accesibilidad y rendimiento

- Enlace «Saltar al contenido», `aria-pressed` en el toggle de idioma y en el de tema, `aria-live`
  al cambiar de idioma.
- Las pestañas de trabajos siguen el patrón ARIA de tabs (flechas, Inicio/Fin, roving tabindex).
- El tema respeta `prefers-color-scheme` y `color-scheme`, así que los controles nativos y el
  contraste acompañan al sistema.
- Navegación por teclado con `:focus-visible` visible en todos los interactivos.
- `prefers-reduced-motion`: desactiva giro, revelados y scroll suave.
- Contraste de texto principal 13:1 sobre el papel.
- Bundle inicial ≈ 193 kB (~53 kB comprimido); sin dependencias en runtime más allá de Angular.

---

## Desplegar

```bash
npm run build
```

Sube el contenido de `dist/portfolio/browser` a Netlify, Vercel, Cloudflare Pages o similar.

### GitHub Pages

El repo trae el workflow en `.github/workflows/deploy.yml`: en cada push a `main` compila y publica
en GitHub Pages. No hay que tocar la ruta base a mano, la calcula del nombre del repo.

```bash
cd portfolio
git init -b main
git add .
git commit -m "Portfolio"
git remote add origin https://github.com/Salromag/portfolio.git
git push -u origin main
```

Después, en el repo: **Settings → Pages → Source: GitHub Actions**. El primer despliegue arranca
solo y tarda un par de minutos. Queda en `https://salromag.github.io/portfolio/`.

| Caso                          | Base href | URL resultante                        |
| ----------------------------- | --------- | ------------------------------------- |
| Repo normal (`portfolio`)     | `/portfolio/` | `https://salromag.github.io/portfolio/` |
| User site (`salromag.github.io`) | `/`    | `https://salromag.github.io/`         |

Detalles que ya están resueltos:

- La app no usa router, así que no hace falta el truco del `404.html`.
- El workflow usa `npm ci` con el `package-lock.json` incluido y Node 24.
- Los assets se sirven con hash en el nombre (`main-UAVBQNCU.js`), así que el CDN no sirve versiones viejas.

Si prefieres desplegar a mano sin Actions, compila con la base correcta y sube esa carpeta:

```bash
npm run build -- --base-href /nombre-del-repo/
```

---

## Vista previa local del build

El repo incluye un servidor estático sin dependencias en la raíz del workspace:

```bash
node preview.mjs portfolio/dist/portfolio/browser 4200
```
