// Fig 2 · Función de puntuación: la suma ponderada de ref2015 como una romana.
//
// Cada término de energía cuelga del brazo como una pesa: su masa es la energía del término y su
// distancia al pivote, su peso en ref2015 (database/scoring/weights/ref2015.wts). El momento de cada
// pesa es peso × energía, así que el contrapeso que equilibra el brazo se detiene donde la regla marca
// la puntuación total. Los términos que penalizan cuelgan a la izquierda y los favorables a la derecha.
// La perilla de la visita recorre las rampas de fa_rep de MonomerRelax2019 (FastRelax).
//
// Uso: node build.mjs [--light]

import { writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import * as k from "../_kit/iso-kit.mjs";
import { kitScript } from "../_kit/inline-kit.mjs";

const HERE = dirname(fileURLToPath(import.meta.url));
const theme = process.argv.includes("--light") ? "light" : "dark";

const WIDTH = 620;
const HEIGHT = 380;

// Modelo. Energías crudas de ejemplo, del orden de una proteína de 76 residuos tras relax.
const REP_BASE = 0.55; // peso de fa_rep en ref2015
const TERMS = [
  { name: "fa_atr", weight: 1.0, energy: -430 },
  { name: "fa_elec", weight: 1.0, energy: -130 },
  { name: "hbond", weight: 1.0, energy: -110 },
  { name: "fa_sol", weight: 1.0, energy: 260 },
  { name: "fa_dun", weight: 0.7, energy: 140 },
  { name: "fa_rep", weight: REP_BASE, energy: 91 },
];
const RAMP = [0.265, 0.28, 0.559, 0.581, 1]; // scale:fa_rep de MonomerRelax2019 que caben fuera del pivote
const ARM = 90; // unidades de brazo por unidad de peso
const K = 0.42; // unidades de regla por unidad de energía: posición del contrapeso = K · total
const H_PER_E = 0.072; // altura de pesa por unidad de energía
const W_R = 6.5; // radio de las pesas

const total = (repScale) =>
  TERMS.reduce((sum, t) => sum + (t.name === "fa_rep" ? REP_BASE * repScale : t.weight) * t.energy, 0);
const hookX = (t, weight = t.weight) => -Math.sign(t.energy) * weight * ARM;

const PLATE = { x: -168, y: -46, w: 336, d: 96, r: 8 };
const PLATE_H = 12;
const FOOT_H = 5;
const BEAM = { x: -160, y: -3, w: 320, d: 6, r: 1.2 };
const BEAM_Z = 112;
const BEAM_H = 7;
const BEAM_TOP = BEAM_Z + BEAM_H;
const PIVOT_Z = BEAM_Z - 3;
const HANG_BOTTOM = 18; // donde terminan las varillas más largas

const P = k.fitProjection(
  [...k.boxCorners(PLATE, -PLATE_H - FOOT_H, 0), [BEAM.x, 0, BEAM_TOP + 6], [BEAM.x + BEAM.w, 0, BEAM_TOP + 6]],
  WIDTH,
  HEIGHT,
  { pad: 30, azimuth: 62 },
);

const at = (point) => k.iso(point, P);
const S = (paths, style) => k.solidSvg(paths, style);
const L = (d, style) => k.lineSvg(d, style);
const D = (points, style) => k.dotsSvg(points, style);
const byDepth = (points) => [...points].sort((a, b) => k.depthOf([a[0], a[1], 0], P) - k.depthOf([b[0], b[1], 0], P));

function base() {
  const out = [`<path class="iso-halo" d="${k.haloOf(PLATE, -PLATE_H - FOOT_H, PLATE_H, P)}"/>`];
  for (const [x, y] of byDepth(k.corners(PLATE, 20))) {
    out.push(S(k.cylinder(x, y, 7, -PLATE_H - FOOT_H, 1.6, P, 28), { tone: "lo" }));
    out.push(S(k.cylinder(x, y, 5.4, -PLATE_H - FOOT_H + 1.6, FOOT_H - 1.6, P, 28), { tone: "mid" }));
  }
  out.push(S(k.slabOf(PLATE, -PLATE_H, PLATE_H, P, 8, 1.6), { tone: "mid" }));
  out.push(L(k.planOutline(k.insetPlan(PLATE, 5), 0, P), { tone: "lo" }));
  const screws = k.corners(PLATE, 10);
  out.push(L(screws.map(([x, y]) => k.ring(x, y, 2.2, 0, P, 16)).join(""), { tone: "lo" }));
  out.push(D(screws.map(([x, y]) => at([x, y, 0])), { size: 0.5 }));
  // Placa de identificación al frente, con tres renglones.
  const label = { x: 70, y: 26, w: 56, d: 14, r: 1.6 };
  out.push(S(k.slabOf(label, 0, 0.8, P, 4), { tone: "lo", crease: "none" }));
  out.push(L(k.planOutline(k.insetPlan(label, 1.6), 0.8, P, 4), { tone: "faint" }));
  for (const [y, len] of [[30.5, 36], [33.5, 26], [36.5, 31]]) out.push(L(k.lineOnTop([label.x + 7, y], [label.x + 7 + len, y], 0.8, P), { tone: "lo", free: true }));
  out.push(D([at([label.x + 3, 33.5, 0.8]), at([label.x + label.w - 3, 33.5, 0.8])], { size: 0.45 }));
  // Nivel de burbuja: una romana solo marca bien si la base está a nivel.
  const vial = [-120, 28];
  out.push(S(k.cylinder(vial[0], vial[1], 7, 0, 2.4, P, 36, 0.4), { tone: "mid" }));
  out.push(L(k.ring(vial[0], vial[1], 5, 2.4, P, 32), { tone: "lo" }));
  out.push(L(k.ring(vial[0], vial[1], 1.8, 2.4, P, 16), { tone: "faint" }));
  out.push(D([at([vial[0], vial[1], 2.4])], { size: 0.9, tone: "hi" }));
  out.push(D([0, 1, 2].map((q) => at([vial[0] + Math.cos(q * 2.1 + 0.5) * 6.2, vial[1] + Math.sin(q * 2.1 + 0.5) * 6.2, 2.4])), { size: 0.35 }));
  return out.join("");
}

function stops() {
  // Topes bajo los extremos del brazo: una romana real descansa en ellos cuando no está equilibrada.
  const out = [];
  for (const x of [-150, 150]) {
    out.push(S(k.cylinder(x, 0, 5.5, 0, 2, P, 24), { tone: "mid" }));
    out.push(S(k.cylinder(x, 0, 2.4, 2, BEAM_Z - 6, P, 16), { tone: "mid", crease: "none" }));
    out.push(S(k.cylinder(x, 0, 3.6, BEAM_Z - 4, 2, P, 20), { tone: "mid" }));
    out.push(L(k.sideArc(x, 0, 2.4, 40, P, 12), { tone: "faint" }));
  }
  return out.join("");
}

function stand() {
  const out = [];
  const foot = { x: -16, y: -16, w: 32, d: 32, r: 3 };
  out.push(S(k.slabOf(foot, 0, 6, P, 4, 0.6), { tone: "mid" }));
  out.push(D(k.corners(foot, 4).map(([x, y]) => at([x, y, 6])), { size: 0.45 }));
  out.push(S(k.cylinder(0, 0, 7, 6, 3, P, 32), { tone: "mid" }));
  out.push(S(k.cylinder(0, 0, 4.5, 9, PIVOT_Z - 12 - 9, P, 28), { tone: "mid", crease: "none" }));
  out.push(L([40, 72].map((z) => k.sideArc(0, 0, 4.5, z, P, 16)).join(""), { tone: "faint" }));
  // Horquilla y filo del pivote.
  const yoke = { x: -6, y: -9, w: 12, d: 18, r: 1.4 };
  out.push(S(k.slabOf(yoke, PIVOT_Z - 12, 6, P, 3, 0.5), { tone: "mid" }));
  out.push(S(k.slabOf({ x: -6, y: -9, w: 12, d: 3, r: 0.6 }, PIVOT_Z - 6, 18, P, 2, 0.3), { tone: "mid" }));
  return out.join("");
}

function yokeFront() {
  // La mejilla delantera de la horquilla va después del brazo.
  return S(k.slabOf({ x: -6, y: 6, w: 12, d: 3, r: 0.6 }, PIVOT_Z - 6, 18, P, 2, 0.3), { tone: "mid" }) +
    D([at([0, 9, PIVOT_Z + 6])], { size: 0.55, tone: "hi" });
}

function beam() {
  const out = [S(k.slabOf(BEAM, BEAM_Z, BEAM_H, P, 3, 0.5), { tone: "hi", crease: "lo" })];
  // Graduación en la cara delantera: una marca cada 10 de energía, mayor cada 50.
  const ticks = k.sideTicks(-35 * 10 * K, 35 * 10 * K, 10 * K, 5, BEAM.y + BEAM.d, BEAM_TOP, [1.6, 3.2], P, "x");
  out.push(L(ticks.minor, { tone: "lo" }), L(ticks.major, { tone: "mid" }));
  out.push(L(k.segment([0, BEAM.y + BEAM.d, BEAM_TOP], [0, BEAM.y + BEAM.d, BEAM_Z], P), { tone: "hi" }));
  for (const x of [BEAM.x, BEAM.x + BEAM.w - 4]) out.push(S(k.slabOf({ x, y: -4, w: 4, d: 8, r: 1 }, BEAM_Z - 0.6, BEAM_H + 1.2, P, 2, 0.3), { tone: "mid" }));
  return out.join("");
}

// Una percha: varilla, estribo alrededor del brazo y la pila de pesas, construida en x = 0.
function hanger(terms, part) {
  const back = [], front = [];
  const stirrupBack = { x: -2.4, y: -5.2, w: 4.8, d: 2, r: 0.5 };
  const stirrupFront = { x: -2.4, y: 3.2, w: 4.8, d: 2, r: 0.5 };
  back.push(S(k.slabOf(stirrupBack, BEAM_Z - 4, BEAM_H + 6, P, 2, 0.3), { tone: "mid" }));
  back.push(S(k.slabOf({ x: -2.4, y: -5.2, w: 4.8, d: 10.4, r: 0.6 }, BEAM_Z - 4, 2.4, P, 2, 0.3), { tone: "mid" }));
  front.push(S(k.slabOf(stirrupFront, BEAM_Z - 4, BEAM_H + 6, P, 2, 0.3), { tone: "mid" }));
  front.push(S(k.slabOf({ x: -2.4, y: -5.2, w: 4.8, d: 10.4, r: 0.6 }, BEAM_TOP + 0.6, 1.4, P, 2, 0.3), { tone: "mid" }));
  front.push(D([at([0, 4.2, BEAM_TOP + 1.4])], { size: 0.45 }));

  // Pesas de arriba abajo, unidas por eslabones cortos.
  const heights = terms.map((t) => Math.abs(t.energy) * H_PER_E);
  const stackH = heights.reduce((a, h) => a + h, 0) + 2.4 * (terms.length - 1);
  let zTop = HANG_BOTTOM + stackH + 8;
  const rodTop = BEAM_Z - 4;
  const below = [];
  below.push(S(k.cylinder(0, 0, 0.9, zTop, rodTop - zTop, P, 12), { tone: "mid", crease: "none" }));
  terms.forEach((t, i) => {
    const h = heights[i];
    const z0 = zTop - h;
    const lit = part === "rep";
    below.push(S(k.cylinder(0, 0, 1.6, zTop - 0.2, 1.6, P, 14), { tone: "mid" }));
    below.push(S(k.cylinder(0, 0, W_R, z0, h - 0.2, P, 40, 0.5), { tone: lit ? "hi" : "hi", crease: "lo", lit }));
    if (h > 6) below.push(L(k.sideArc(0, 0, W_R, z0 + 1.6, P, 24), { tone: "faint" }));
    if (i < terms.length - 1) below.push(S(k.cylinder(0, 0, 0.9, z0 - 2.4, 2.4, P, 12), { tone: "mid", crease: "none" }));
    zTop = z0 - 2.4;
  });
  return { back: back.join(""), below: below.join(""), front: front.join("") };
}

function poise() {
  // El contrapeso: un jinete sobre el brazo, construido en x = 0. Su índice apunta a la regla.
  const back = S(k.slabOf({ x: -5, y: -6, w: 10, d: 2.4, r: 0.6 }, BEAM_Z - 2, BEAM_H + 4, P, 2, 0.3), { tone: "hi", lit: true });
  const front = [
    S(k.slabOf({ x: -5, y: -6, w: 10, d: 12, r: 1.2 }, BEAM_TOP + 0.4, 5, P, 3, 0.5), { tone: "hi", crease: "lo", lit: true }),
    S(k.slabOf({ x: -5, y: 3.6, w: 10, d: 2.4, r: 0.6 }, BEAM_Z - 2, BEAM_H + 2.4, P, 2, 0.3), { tone: "hi", lit: true }),
    L(k.segment([0, 6, BEAM_Z + 2], [0, 6, BEAM_Z - 2], P), { tone: "lit" }),
    S(k.cylinder(0, 0, 2.2, BEAM_TOP + 5.4, 2.6, P, 18), { tone: "mid" }),
    L(k.knurl(0, 0, 2.2, BEAM_TOP + 5.4, BEAM_TOP + 8, 14, P), { tone: "lo" }),
  ];
  return { back, front: front.join("") };
}

const right = TERMS.filter((t) => t.energy < 0);
const leftFixed = TERMS.filter((t) => t.energy > 0 && t.name !== "fa_rep");
const rep = TERMS.find((t) => t.name === "fa_rep");
const hangers = [
  { id: "right", x: hookX(right[0]), terms: right },
  ...leftFixed.map((t) => ({ id: t.name, x: hookX(t), terms: [t] })),
];
const REP0 = 1;
const repHanger = hanger([rep], "rep");
const repX = (scale) => hookX(rep, REP_BASE * scale);
const poiseX = (scale) => K * total(scale);
const P0 = poise();

const order = byDepth([...hangers.map((h) => [h.x, 0, h]), [0, 0, "stand"], [repX(REP0), 0, "rep"]]);

const below = order
  .map(([x, , item]) => {
    if (item === "stand") return stand();
    if (item === "rep") return `<g data-part="rep-below" transform="${k.translateAlong(P, [repX(REP0), 0, 0])}">${repHanger.below}</g>`;
    return `<g transform="${k.translateAlong(P, [item.x, 0, 0])}">${hanger(item.terms).below}</g>`;
  })
  .join("");

const backs = [
  ...hangers.map((h) => `<g transform="${k.translateAlong(P, [h.x, 0, 0])}">${hanger(h.terms).back}</g>`),
  `<g data-part="rep-back" transform="${k.translateAlong(P, [repX(REP0), 0, 0])}">${repHanger.back}</g>`,
  `<g data-part="poise-back" transform="${k.translateAlong(P, [poiseX(REP0), 0, 0])}">${P0.back}</g>`,
].join("");

const fronts = [
  ...hangers.map((h) => `<g transform="${k.translateAlong(P, [h.x, 0, 0])}">${hanger(h.terms).front}</g>`),
  `<g data-part="rep-front" transform="${k.translateAlong(P, [repX(REP0), 0, 0])}">${repHanger.front}</g>`,
  yokeFront(),
  `<g data-part="poise-front" transform="${k.translateAlong(P, [poiseX(REP0), 0, 0])}">${P0.front}</g>`,
].join("");

const svg = k.figureSvg({
  width: WIDTH,
  height: HEIGHT,
  label:
    "Una romana sobre una base. Del brazo cuelgan pesas que son términos de energía de ref2015: su masa es la energía del término y su distancia al pivote es su peso. Los términos que penalizan cuelgan a la izquierda y los favorables a la derecha. Un contrapeso se desliza sobre el brazo hasta equilibrarlo, y su posición en la regla marca la puntuación total. La pesa de fa_rep se acerca o se aleja del pivote según la rampa de FastRelax.",
  body: [base(), stops(), below, backs, beam(), fronts],
});

const live = `
const P = ${JSON.stringify(P)};
const TERMS = ${JSON.stringify(TERMS)};
const RAMP = ${JSON.stringify(RAMP)};
const REP_BASE = ${REP_BASE}, ARM = ${ARM}, K = ${K};
const total = ${total.toString()};
const hookX = ${hookX.toString()};
const rep = TERMS.find((t) => t.name === "fa_rep");
const repX = (scale) => hookX(rep, REP_BASE * scale);
const stage = document.querySelector(".iso-stage");
const svg = stage.querySelector("svg");
const $ = (name) => svg.querySelector('[data-part="' + name + '"]');
const repEls = ["rep-below", "rep-back", "rep-front"].map($);
const poiseEls = ["poise-back", "poise-front"].map($);
const readout = document.querySelector("[data-readout]");
const still = matchMedia("(prefers-reduced-motion: reduce)");
const MIN = RAMP[0], MAX = RAMP[RAMP.length - 1];

let scale = ${REP0}, target = scale, poise = K * total(scale);
let frame = 0, last = 0, visible = false, touring = !still.matches, clock = 0, idleTimer = 0, lastWords = "";
const tourAt = (t) => RAMP[Math.floor(t / 2.4) % RAMP.length];

function draw() {
  const rx = repX(scale);
  for (const el of repEls) el.setAttribute("transform", translateAlong(P, [rx, 0, 0]));
  for (const el of poiseEls) el.setAttribute("transform", translateAlong(P, [poise, 0, 0]));
  const shown = poise / K;
  const text = "fa_rep × " + (REP_BASE * scale).toFixed(3) + " · total " + (shown < 0 ? "−" : "+") + Math.abs(shown).toFixed(1);
  if (readout.textContent !== text) readout.textContent = text;
}
function describe() {
  const t = total(target);
  const words = "Peso de fa_rep " + (REP_BASE * target).toFixed(3) + ". Puntuación total " + t.toFixed(1) + ".";
  if (words !== lastWords) { lastWords = words; stage.setAttribute("aria-valuetext", words); stage.setAttribute("aria-valuenow", target.toFixed(3)); }
}
function tick(now) {
  const dt = last ? Math.min((now - last) / 1000, 1 / 30) : 1 / 60;
  last = now;
  const calm = still.matches;
  if (touring) { clock += dt; target = tourAt(clock); }
  scale = calm ? target : scale + (target - scale) * (1 - Math.exp(-dt / 0.3));
  if (Math.abs(target - scale) < 1e-4) scale = target;
  // El contrapeso va detrás de la pesa: se desliza hasta el nuevo equilibrio.
  const goal = K * total(scale);
  poise = calm ? goal : poise + (goal - poise) * (1 - Math.exp(-dt / 0.35));
  if (Math.abs(goal - poise) < 0.01) poise = goal;
  draw();
  describe();
  const settled = !touring && scale === target && poise === goal;
  frame = visible && !settled ? requestAnimationFrame(tick) : 0;
}
const run = () => { if (!frame && visible) { last = 0; frame = requestAnimationFrame(tick); } };
const steer = (next) => {
  touring = false;
  target = Math.min(MAX, Math.max(MIN, next));
  clearTimeout(idleTimer);
  idleTimer = setTimeout(() => { touring = !still.matches; clock = 0; run(); }, 3600);
  run();
};
new IntersectionObserver((entries) => { visible = entries[entries.length - 1].isIntersecting; if (visible) run(); }, { rootMargin: "120px 0px" }).observe(stage);
if (still.matches) touring = false;
stage.addEventListener("pointermove", (event) => {
  const box = svg.getBoundingClientRect();
  const share = Math.min(1, Math.max(0, ((event.clientX - box.left) / box.width - 0.2) / 0.6));
  steer(MIN + share * (MAX - MIN));
});
stage.addEventListener("keydown", (event) => {
  const here = RAMP.reduce((best, s, i) => (Math.abs(s - target) < Math.abs(RAMP[best] - target) ? i : best), 0);
  let to = null;
  if (event.key === "ArrowRight" || event.key === "ArrowUp") to = Math.min(RAMP.length - 1, here + 1);
  if (event.key === "ArrowLeft" || event.key === "ArrowDown") to = Math.max(0, here - 1);
  if (event.key === "Home") to = 0;
  if (event.key === "End") to = RAMP.length - 1;
  if (to === null) return;
  event.preventDefault();
  steer(RAMP[to]);
});
draw();
describe();
`;

const fmt = (v) => (v < 0 ? "−" : "+") + Math.abs(v).toFixed(1);
const body = k.plateHtml({
  fig: "Fig 2",
  title: "Función de puntuación",
  hint: "Mueve el cursor",
  readout: `fa_rep × ${(REP_BASE * REP0).toFixed(3)} · total ${fmt(total(REP0))}`,
  keys: [
    { mark: "lit", label: "Contrapeso: marca la puntuación total en la regla" },
    { mark: "raised", label: "Derecha (favorables): fa_atr, fa_elec y hbond, apilados a peso 1.0" },
    { mark: "raised", label: "Izquierda (penalizan), de fuera adentro: fa_sol 1.0, fa_dun 0.7 y fa_rep 0.55" },
  ],
  caption:
    "Rosetta puntúa una estructura como la suma de sus términos de energía, cada uno multiplicado por su peso. En la romana, el peso es la distancia al pivote y la energía es la masa de la pesa, así que el contrapeso que equilibra el brazo marca la suma. Las energías son de ejemplo, del orden de una proteína de 76 residuos; los pesos son los de ref2015. La visita recorre las rampas de fa_rep de FastRelax con la estructura fija (en un relax real la estructura también cambia en cada ciclo); las dos primeras rampas, 0.040 y 0.051, quedarían casi sobre el pivote y se omiten.",
  body: `<div class="iso-stage" tabindex="0" role="slider" aria-label="Función de puntuación: flechas para recorrer las rampas de fa_rep" aria-valuemin="${RAMP[0]}" aria-valuemax="1" aria-valuenow="${REP0}">${svg}</div>`,
});

const file = theme === "light" ? "funcion-de-puntuacion-light.html" : "funcion-de-puntuacion.html";
writeFileSync(join(HERE, file), k.pageHtml({ title: "Función de puntuación", theme, body, script: kitScript() + live }));
console.log("escrito", file, "· total", total(REP0).toFixed(1), "· contrapeso en x =", poiseX(REP0).toFixed(1));
