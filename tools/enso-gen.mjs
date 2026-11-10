// Genera el trazo del enso (円相) con grosor variable y lo escribe como módulo TS.
//
// El trazo no es un círculo con stroke: es una forma rellena cuyos dos bordes se
// separan más o menos según t. Así arranca grueso, engorda en el centro y muere
// en punta, que es lo que hace un pincel real.
//
// Uso (desde la raíz del repo): node tools/enso-gen.mjs
import { writeFileSync } from 'node:fs';

const cx = 160;
const cy = 160;
const r = 148;
const samples = 90;
const startDeg = -50;
const sweepDeg = 330;

const widthAt = (t) => {
  const taper = Math.pow(1 - t, 0.55);
  const belly = 0.82 + 0.28 * Math.sin(Math.PI * Math.min(1, t * 1.15));
  return 1.6 + 11.4 * taper * belly;
};

const point = (deg, radius) => {
  const rad = (deg * Math.PI) / 180;
  return [cx + radius * Math.cos(rad), cy + radius * Math.sin(rad)];
};

const outer = [];
const inner = [];

for (let i = 0; i <= samples; i++) {
  const t = i / samples;
  const deg = startDeg + sweepDeg * t;
  const w = widthAt(t);
  outer.push(point(deg, r + w / 2));
  inner.push(point(deg, r - w / 2));
}

const round = (n) => n.toFixed(2).replace(/\.?0+$/, '');
const fmt = ([x, y]) => `${round(x)} ${round(y)}`;

const d = [
  `M${fmt(outer[0])}`,
  ...outer.slice(1).map((p) => `L${fmt(p)}`),
  ...inner.reverse().map((p) => `L${fmt(p)}`),
  'Z',
].join(' ');

const file = `/**
 * Generado por \`tools/enso-gen.mjs\` — no editar a mano.
 *
 * 円相 dibujado como un trazo de pincel: 330° de arco con grosor variable que
 * arranca grueso, engorda en el centro y muere en punta. El hueco queda arriba.
 * La rugosidad de la tinta la pone el filtro SVG del componente.
 */
export const ENSO_PATH =
  '${d}';
`;

writeFileSync('src/app/sections/hero/enso.path.ts', file, 'utf8');
console.log(`enso generado: ${d.length} caracteres de path`);
