/**
 * 内容 — Single source of truth for every string on the site.
 *
 * Edit `PROFILE` and the two dictionaries in `CONTENT` and the whole page follows.
 * The Japanese text is decorative (kanji / kana accents), not translated content.
 */

export type Lang = 'es' | 'en';

export interface NavItem {
  /** Visible label in the active language. */
  label: string;
  /** In-page anchor. */
  href: string;
  /** Single kanji accent shown above the label. */
  kanji: string;
}

export interface Project {
  index: string;
  kanji: string;
  name: string;
  /** Year for open-source work; omit it and set `site` for client sites. */
  year?: string;
  /** Domain shown instead of the year, e.g. `reformasbenlloch.es`. */
  site?: string;
  role: string;
  summary: string;
  tags: string[];
  href: string;
}

export interface WorkGroup {
  id: string;
  kanji: string;
  label: string;
  note: string;
  projects: Project[];
}

export interface SkillGroup {
  kanji: string;
  title: string;
  items: string[];
}

export interface Fact {
  label: string;
  value: string;
}

export interface PortfolioContent {
  meta: { title: string; description: string };
  nav: NavItem[];
  ui: {
    navLabel: string;
    language: string;
    menu: string;
    close: string;
    skipToContent: string;
    themeDark: string;
    themeLight: string;
    workTabs: string;
  };
  hero: {
    kicker: string;
    nameKana: string;
    tagline: string;
    lead: string;
    ctaWork: string;
    ctaContact: string;
    scroll: string;
    est: string;
  };
  about: {
    label: string;
    kanji: string;
    vertical: string;
    title: string;
    paragraphs: string[];
    factsLabel: string;
    facts: Fact[];
  };
  work: {
    label: string;
    kanji: string;
    vertical: string;
    title: string;
    note: string;
    groups: WorkGroup[];
  };
  skills: {
    label: string;
    kanji: string;
    vertical: string;
    title: string;
    note: string;
    groups: SkillGroup[];
  };
  contact: {
    label: string;
    kanji: string;
    vertical: string;
    title: string;
    lead: string;
    mailLabel: string;
    socialsLabel: string;
    note: string;
  };
  footer: {
    note: string;
    rights: string;
    toTop: string;
  };
}

export const PROFILE = {
  name: 'Salva Romero',
  location: 'Valencia, ES',
  // Placeholder: swap it for your real address before publishing.
  email: 'salromagu@gmail.com',
  socials: [
    { label: 'GitHub', handle: '@Salromag', href: 'https://github.com/Salromag' },
    {
      label: 'LinkedIn',
      handle: 'in/salva-romero-aguilar',
      href: 'https://www.linkedin.com/in/salva-romero-aguilar/',
    },
    { label: 'Npm', handle: '~salromagu', href: 'https://www.npmjs.com/~salromagu' },
    { label: 'Email', handle: 'salromagu@gmail.com', href: 'salromagu@gmail.co' },
  ],
};

export const CONTENT: Record<Lang, PortfolioContent> = {
  es: {
    meta: {
      title: 'Salva Romero — Desarrollador frontend',
      description:
        'Salva Romero, desarrollador frontend con diez años de experiencia en Angular, formularios dinámicos y librerías open source publicadas en npm.',
    },
    nav: [
      { label: 'Inicio', href: '#inicio', kanji: '序' },
      { label: 'Sobre mí', href: '#sobre-mi', kanji: '私' },
      { label: 'Trabajos', href: '#trabajos', kanji: '作' },
      { label: 'Herramientas', href: '#herramientas', kanji: '具' },
      { label: 'Contacto', href: '#contacto', kanji: '信' },
    ],
    ui: {
      navLabel: 'Navegación principal',
      language: 'Idioma',
      menu: 'Abrir menú',
      close: 'Cerrar menú',
      skipToContent: 'Saltar al contenido',
      themeDark: 'Activar tema oscuro',
      themeLight: 'Activar tema claro',
      workTabs: 'Categorías de trabajos',
    },
    hero: {
      kicker: 'Desarrollador frontend — Valencia, ES',
      nameKana: 'サルバ・ロメロ',
      tagline: 'Interfaces que respiran.',
      lead: 'Diez años construyendo producto digital con criterio: menos ruido, más intención. Trabajo entre Figma y el navegador cuidando tipografía, accesibilidad y rendimiento, y mantengo varias librerías de Angular publicadas en npm.',
      ctaWork: 'Ver trabajos',
      ctaContact: 'Hablemos',
      scroll: 'Desliza',
      est: 'Desde 2015',
    },
    about: {
      label: 'Sobre mí',
      kanji: '私',
      vertical: 'について',
      title: 'Menos ruido, más intención.',
      paragraphs: [
        'Soy Salva Romero, desarrollador frontend con diez años de experiencia. Empecé maquetando sitios a mano y he acabado construyendo aplicaciones Angular, sistemas de diseño y librerías que otros equipos instalan desde npm.',
        'Me especializo en Angular y en diseño de componentes: APIs que no necesitan manual, formularios que se generan a partir de un esquema y paquetes que se publican con versionado semántico.',
        'Trabajo bien donde diseño y código comparten mesa: reviso, documento y dejo el proyecto mejor de como lo encontré.',
      ],
      factsLabel: 'Datos rápidos',
      facts: [
        { label: 'Base', value: 'Valencia, ES' },
        { label: 'Experiencia', value: '10 años' },
        { label: 'Enfoque', value: 'Angular · Librerías' },
        { label: 'Estado', value: 'Abierto a proyectos' },
      ],
    },
    work: {
      label: 'Trabajos',
      kanji: '仕事',
      vertical: 'せいか',
      title: 'Trabajos seleccionados',
      note: 'Librerías que otros equipos instalan con npm y webs que hoy sostienen negocios reales. Código que puedes leer, demos que puedes probar y sitios que puedes visitar.',
      groups: [
        {
          id: 'open-source',
          kanji: '源',
          label: 'Open source',
          note: 'Librerías y herramientas con el código abierto: dos paquetes en npm y dos utilidades de navegador con demo en GitHub Pages.',
          projects: [
            {
              index: '01',
              kanji: '型',
              name: 'ngx-mat-form',
              year: '2025',
              role: 'Librería Angular · Open source',
              summary:
                'Formularios dinámicos para Angular: describes el formulario con un esquema JSON y la librería genera los campos de Angular Material con su apariencia y sus validaciones, sin escribir plantillas a mano.',
              tags: ['Angular', 'Angular Material', 'Reactive Forms', 'npm'],
              href: 'https://github.com/Salromag/ngx-mat-form',
            },
            {
              index: '02',
              kanji: '報',
              name: 'ngx-alertifying',
              year: '2023',
              role: 'Librería Angular · Open source',
              summary:
                'Librería de alertas y notificaciones para aplicaciones Angular, con estilos propios y compatibilidad con Material y Bootstrap. Publicada en npm y mantenida con versionado semántico.',
              tags: ['Angular', 'TypeScript', 'Material', 'npm'],
              href: 'https://github.com/Salromag/ngx-alertifying',
            },
            {
              index: '03',
              kanji: '察',
              name: 'hover-inspector',
              year: '2025',
              role: 'Herramienta de navegador · Open source',
              summary:
                'Overlay que se inyecta en cualquier página para inspeccionar en detalle el elemento bajo el cursor y copiar sus estilos al portapapeles, sin abrir las DevTools.',
              tags: ['JavaScript', 'DOM', 'CSS', 'DevTools'],
              href: 'https://github.com/Salromag/hover-inspector',
            },
            {
              index: '04',
              kanji: '色',
              name: 'palette-inspector',
              year: '2025',
              role: 'Herramienta de navegador · Open source',
              summary:
                'Extrae la paleta de colores de la página que estés viendo: agrupa los colores realmente usados y los deja listos para copiar en tu diseño o en tus variables CSS.',
              tags: ['JavaScript', 'CSS', 'Color', 'GitHub Pages'],
              href: 'https://github.com/Salromag/palette-inspector',
            },
          ],
        },
        {
          id: 'clientes',
          kanji: '客',
          label: 'Clientes',
          note: 'Webs a medida para negocios: diseño, desarrollo y publicación, de principio a fin.',
          projects: [
            {
              index: '01',
              kanji: '家',
              name: 'Reformas Benlloch',
              site: 'reformasbenlloch.es',
              role: 'Web corporativa · Reformas integrales',
              summary:
                'Web para una empresa de reformas integrales en Llíria (Valencia): servicios de cocina y baño, trabajos realizados y una forma directa de pedir presupuesto. Tono cercano y lectura cómoda en el móvil.',
              tags: ['Angular', 'Diseño web', 'Responsive'],
              href: 'https://reformasbenlloch.es/',
            },
          ],
        },
      ],
    },
    skills: {
      label: 'Herramientas',
      kanji: '道具',
      vertical: 'どうぐ',
      title: 'Con qué trabajo',
      note: 'Un oficio, cuatro cajones. Lo que uso a diario y lo que defiendo en cada entrega.',
      groups: [
        {
          kanji: '言語',
          title: 'Lenguajes',
          items: ['TypeScript', 'JavaScript (ES2023)', 'HTML', 'SCSS'],
        },
        {
          kanji: '枠組',
          title: 'Frameworks y librerías',
          items: ['Angular', 'Angular Material', 'RxJS', 'Signals'],
        },
        {
          kanji: '道具',
          title: 'Herramientas',
          items: ['Git', 'npm', 'Vite', 'Storybook', 'Playwright', 'Figma'],
        },
        {
          kanji: '作法',
          title: 'Buenas prácticas',
          items: ['Accesibilidad WCAG AA', 'Core Web Vitals', 'Versionado semántico', 'Testing'],
        },
      ],
    },
    contact: {
      label: 'Contacto',
      kanji: '連絡',
      vertical: 'れんらく',
      title: 'Hablemos.',
      lead: '¿Tienes un proyecto, una idea a medio dibujar o una duda sobre alguna de mis librerías? Escríbeme: leo todo.',
      mailLabel: 'Escríbeme a',
      socialsLabel: 'Encuéntrame en',
      note: 'Respondo en 24–48 h. Sin formalidades.',
    },
    footer: {
      note: 'Hecho con espacio negativo, en Valencia.',
      rights: 'Todos los derechos reservados.',
      toTop: 'Volver arriba',
    },
  },

  en: {
    meta: {
      title: 'Salva Romero — Frontend developer',
      description:
        'Salva Romero, a frontend developer with ten years of experience in Angular, dynamic forms and open-source libraries published on npm.',
    },
    nav: [
      { label: 'Home', href: '#inicio', kanji: '序' },
      { label: 'About', href: '#sobre-mi', kanji: '私' },
      { label: 'Work', href: '#trabajos', kanji: '作' },
      { label: 'Tools', href: '#herramientas', kanji: '具' },
      { label: 'Contact', href: '#contacto', kanji: '信' },
    ],
    ui: {
      navLabel: 'Main navigation',
      language: 'Language',
      menu: 'Open menu',
      close: 'Close menu',
      skipToContent: 'Skip to content',
      themeDark: 'Switch to dark theme',
      themeLight: 'Switch to light theme',
      workTabs: 'Work categories',
    },
    hero: {
      kicker: 'Frontend developer',
      nameKana: 'サルバ・ロメロ',
      tagline: 'Interfaces that breathe.',
      lead: 'Ten years building digital product with intent: less noise, more purpose. I work between Figma and the browser caring about typography, accessibility and performance — and I maintain a handful of Angular libraries published on npm.',
      ctaWork: 'See the work',
      ctaContact: "Let's talk",
      scroll: 'Scroll',
      est: 'Since 2015',
    },
    about: {
      label: 'About',
      kanji: '私',
      vertical: 'について',
      title: 'Less noise, more intent.',
      paragraphs: [
        "I'm Salva Romero, a frontend developer with ten years of experience. I started hand-coding websites and ended up building Angular applications, design systems and libraries that other teams install from npm.",
        'I specialise in Angular and component design: APIs nobody needs a manual for, forms generated from a schema, and packages shipped with semantic versioning.',
        'I do my best work where design and code share a table: reviewing, documenting and leaving the project better than I found it.',
      ],
      factsLabel: 'Quick facts',
      facts: [
        { label: 'Based in', value: 'Valencia, ES' },
        { label: 'Experience', value: '10 years' },
        { label: 'Focus', value: 'Angular · Libraries' },
        { label: 'Status', value: 'Open to work' },
      ],
    },
    work: {
      label: 'Work',
      kanji: '仕事',
      vertical: 'せいか',
      title: 'Selected work',
      note: 'Libraries other teams install from npm and websites that keep real businesses running. Code you can read, demos you can try and sites you can visit.',
      groups: [
        {
          id: 'open-source',
          kanji: '源',
          label: 'Open source',
          note: 'Libraries and tools with the source open: two packages on npm and two browser utilities with a live demo on GitHub Pages.',
          projects: [
            {
              index: '01',
              kanji: '型',
              name: 'ngx-mat-form',
              year: '2025',
              role: 'Angular library · Open source',
              summary:
                'Dynamic forms for Angular: describe the form with a JSON schema and the library renders the Angular Material fields, appearance and validations for you — no templates by hand.',
              tags: ['Angular', 'Angular Material', 'Reactive Forms', 'npm'],
              href: 'https://github.com/Salromag/ngx-mat-form',
            },
            {
              index: '02',
              kanji: '報',
              name: 'ngx-alertifying',
              year: '2023',
              role: 'Angular library · Open source',
              summary:
                'Alert and notification library for Angular applications, with its own styles and Material and Bootstrap compatibility. Published on npm and maintained with semantic versioning.',
              tags: ['Angular', 'TypeScript', 'Material', 'npm'],
              href: 'https://github.com/Salromag/ngx-alertifying',
            },
            {
              index: '03',
              kanji: '察',
              name: 'hover-inspector',
              year: '2025',
              role: 'Browser tool · Open source',
              summary:
                'An overlay injected into any page that inspects the element under the cursor in detail and copies its styles to the clipboard — without opening DevTools.',
              tags: ['JavaScript', 'DOM', 'CSS', 'DevTools'],
              href: 'https://github.com/Salromag/hover-inspector',
            },
            {
              index: '04',
              kanji: '色',
              name: 'palette-inspector',
              year: '2025',
              role: 'Browser tool · Open source',
              summary:
                'Extracts the colour palette of the page you are looking at: groups the colours actually in use and leaves them ready to paste into your design or your CSS variables.',
              tags: ['JavaScript', 'CSS', 'Color', 'GitHub Pages'],
              href: 'https://github.com/Salromag/palette-inspector',
            },
          ],
        },
        {
          id: 'clientes',
          kanji: '客',
          label: 'Clients',
          note: 'Bespoke sites for businesses: design, build and launch, end to end.',
          projects: [
            {
              index: '01',
              kanji: '家',
              name: 'Reformas Benlloch',
              site: 'reformasbenlloch.es',
              role: 'Corporate site · Full home renovations',
              summary:
                'Website for a full-renovation company in Llíria, Valencia: kitchen and bathroom services, finished work and a direct way to request a quote. Warm tone and comfortable reading on mobile.',
              tags: ['Angular', 'Web design', 'Responsive'],
              href: 'https://reformasbenlloch.es/',
            },
          ],
        },
      ],
    },
    skills: {
      label: 'Tools',
      kanji: '道具',
      vertical: 'どうぐ',
      title: 'What I work with',
      note: 'One craft, four drawers. What I use daily and what I stand behind on every delivery.',
      groups: [
        {
          kanji: '言語',
          title: 'Languages',
          items: ['TypeScript', 'JavaScript (ES2023)', 'HTML', 'SCSS'],
        },
        {
          kanji: '枠組',
          title: 'Frameworks & libraries',
          items: ['Angular', 'Angular Material', 'RxJS', 'Signals'],
        },
        {
          kanji: '道具',
          title: 'Tooling',
          items: ['Git', 'npm', 'Vite', 'Storybook', 'Playwright', 'Figma'],
        },
        {
          kanji: '作法',
          title: 'Craft',
          items: ['WCAG AA accessibility', 'Core Web Vitals', 'Semantic versioning', 'Testing'],
        },
      ],
    },
    contact: {
      label: 'Contact',
      kanji: '連絡',
      vertical: 'れんらく',
      title: "Let's talk.",
      lead: 'Got a project, a half-drawn idea, or a question about one of my libraries? Write to me — I read everything.',
      mailLabel: 'Email me at',
      socialsLabel: 'Find me on',
      note: 'I reply within 24–48 h. No formalities needed.',
    },
    footer: {
      note: 'Made with negative space, in Valencia.',
      rights: 'All rights reserved.',
      toTop: 'Back to top',
    },
  },
};
