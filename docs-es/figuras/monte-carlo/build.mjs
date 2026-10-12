// Fig 1 · Monte Carlo (criterio de Metropolis), como lo implementa protocols/moves/MonteCarlo.cc.
//
// Un banco de bloques: cada bloque es un estado y su altura, su energía. Un cabezal en un pórtico apoya
// un palpador sobre el estado actual. Para cada movimiento propuesto a un vecino, la rueda de aceptación
// pinta un sector del tamaño de p = exp(−ΔE/kT) (entero si la energía baja) y una aguja gira hasta un
// número al azar: si cae dentro del sector, el palpador se muda; si no, se queda. Un tope en la regla
// delantera marca el mejor estado visto, que es lo que Rosetta recupera al final (recover_low).
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
const HEIGHT = 400;

// Modelo: energías de los 9 estados (altura de cada bloque, en unidades de energía).
const ENERGIES = [24, 14, 20, 9, 17, 28, 19, 4, 15];
const STEP = 24;
const XS = ENERGIES.map((_, i) => -96 + STEP * i);
const BLOCK_W = 19;
const BED = { x: -110, y: -16, w: 220, d: 32, r: 2 };
const BED_H = 3;
const LIFT = 38; // altura del palpador mientras viaja, por encima del bloque más alto
const TIP_R = 2.4;
const ROD_L = 70;
const PER_TURN = 40; // una vuelta de la aguja del cabezal = 40 unidades de energía

const PLATE = { x: -150, y: -62, w: 300, d: 130, r: 8 };
const PLATE_H = 12;
const FOOT_H = 5;

const POSTS = [-134, 130];
const POST_Y = -34;
const RAIL = { x: -142, y: -38, w: 280, d: 8, r: 1.5 };
const RAIL_Z = 78;
const RAIL_H = 6;
const RAIL_TOP = RAIL_Z + RAIL_H;

const ARM = { x: -5, y: -27, w: 10, d: 33, r: 2 };
const ARM_Z = 76;
const ARM_TOP = 84;
const TUBE_TOP = 100;
const DIAL_R = 12;
const DIAL_Z = TUBE_TOP;
const DIAL_H = 6;
const DIAL_TOP = DIAL_Z + DIAL_H;

const STRIP = { x: -112, y: 24, w: 224, d: 8, r: 1 };
const KNOB = [-124, 44];
const WHEEL = [120, 44];
const WHEEL_R = 17;
const WHEEL_Z = 3;
const WHEEL_TOP = WHEEL_Z + 4;
const KNOB_TOP = 10;
const T_MIN = 0.2;
const T_MAX = 6;
const KNOB_FROM = -0.75 * Math.PI; // la escala de temperatura cubre 270°
const KNOB_SPAN = 1.5 * Math.PI;

const P = k.fitProjection(
  [...k.boxCorners(PLATE, -PLATE_H - FOOT_H, 0), [0, 0, DIAL_TOP + 2], [RAIL.x, RAIL.y, RAIL_TOP], [RAIL.x + RAIL.w, RAIL.y, RAIL_TOP]],
  WIDTH,
  HEIGHT,
  { pad: 30, azimuth: 56 },
);

const at = (point) => k.iso(point, P);
const S = (paths, style) => k.solidSvg(paths, style);
const L = (d, style) => k.lineSvg(d, style);
const D = (points, style) => k.dotsSvg(points, style);
const byDepth = (points) => [...points].sort((a, b) => k.depthOf([a[0], a[1], 0], P) - k.depthOf([b[0], b[1], 0], P));
const top = (i) => BED_H + ENERGIES[i];

function base() {
  const out = [`<path class="iso-halo" d="${k.haloOf(PLATE, -PLATE_H - FOOT_H, PLATE_H, P)}"/>`];
  for (const [x, y] of byDepth(k.corners(PLATE, 22))) {
    out.push(S(k.cylinder(x, y, 7, -PLATE_H - FOOT_H, 1.6, P, 28), { tone: "lo" }));
    out.push(S(k.cylinder(x, y, 5.4, -PLATE_H - FOOT_H + 1.6, FOOT_H - 1.6, P, 28), { tone: "mid" }));
  }
  out.push(S(k.slabOf(PLATE, -PLATE_H, PLATE_H, P, 8, 1.6), { tone: "mid" }));
  out.push(L(k.planOutline(k.insetPlan(PLATE, 5), 0, P), { tone: "lo" }));
  const screws = k.corners(PLATE, 10);
  out.push(L(screws.map(([x, y]) => k.ring(x, y, 2.2, 0, P, 16)).join(""), { tone: "lo" }));
  out.push(D(screws.map(([x, y]) => at([x, y, 0])), { size: 0.5 }));
  return out.join("");
}

function post(x) {
  const out = [];
  out.push(S(k.cylinder(x, POST_Y, 7, 0, 3, P, 28), { tone: "mid" }));
  out.push(D([0, 1, 2, 3].map((q) => at([x + Math.cos(q * Math.PI / 2 + 0.6) * 5.4, POST_Y + Math.sin(q * Math.PI / 2 + 0.6) * 5.4, 3])), { size: 0.4 }));
  out.push(S(k.cylinder(x, POST_Y, 4, 3, RAIL_Z - 3, P, 28), { tone: "mid", crease: "none" }));
  out.push(L([24, 50].map((z) => k.sideArc(x, POST_Y, 4, z, P, 16)).join(""), { tone: "faint" }));
  return out.join("");
}

function rail() {
  const out = [];
  out.push(S(k.slabOf(RAIL, RAIL_Z, RAIL_H, P, 3, 0.5), { tone: "mid" }));
  const guide = { x: RAIL.x + 6, y: RAIL.y + 2.4, w: RAIL.w - 12, d: 3.2, r: 0.8 };
  out.push(S(k.slabOf(guide, RAIL_TOP, 1, P, 2), { tone: "mid", crease: "none" }));
  const bolts = [];
  for (let x = guide.x + 10; x < guide.x + guide.w - 4; x += 20) bolts.push(at([x, guide.y + guide.d / 2, RAIL_TOP + 1]));
  out.push(D(bolts, { size: 0.4, tone: "lo" }));
  for (const x of POSTS) out.push(D([at([x - 3, RAIL.y + 1.6, RAIL_TOP]), at([x + 3, RAIL.y + RAIL.d - 1.6, RAIL_TOP])], { size: 0.45 }));
  return out.join("");
}

function bed() {
  const out = [S(k.slabOf(BED, 0, BED_H, P, 3, 0.4), { tone: "lo" })];
  out.push(D([at([BED.x + 4, 0, BED_H]), at([BED.x + BED.w - 4, 0, BED_H])], { size: 0.45 }));
  return out.join("");
}

function block(i) {
  const plan = { x: XS[i] - BLOCK_W / 2, y: -12, w: BLOCK_W, d: 24, r: 1 };
  const z = top(i);
  return [
    S(k.slabOf(plan, BED_H, ENERGIES[i], P, 3, 0.5), { tone: "hi", crease: "lo" }),
    L(k.planOutline(k.insetPlan(plan, 2), z, P, 3), { tone: "faint" }),
  ].join("");
}

function plunger() {
  // Construido con la punta en z = 0; se traslada a (x, 0, z).
  return [
    S(k.cylinder(0, 0, TIP_R, 0, 2, P, 20), { tone: "hi", lit: true }),
    S(k.cylinder(0, 0, 1.3, 2, ROD_L, P, 16), { tone: "hi", crease: "none", lit: true }),
  ].join("");
}

function head() {
  // Construido en x = 0; se traslada a lo largo del riel.
  const out = [];
  const carriage = { x: -13, y: RAIL.y - 2, w: 26, d: RAIL.d + 4, r: 2 };
  out.push(S(k.slabOf(carriage, RAIL_TOP + 1, 9, P, 3, 0.6), { tone: "mid" }));
  out.push(D([-8, 8].flatMap((x) => [at([x, carriage.y + 2.4, RAIL_TOP + 10]), at([x, carriage.y + carriage.d - 2.4, RAIL_TOP + 10])]), { size: 0.45 }));
  const plateFront = { x: -12, y: RAIL.y + RAIL.d + 2, w: 24, d: 3, r: 0.8 };
  out.push(S(k.slabOf(plateFront, ARM_Z - 2, RAIL_TOP + 10 - ARM_Z + 2, P, 2, 0.4), { tone: "mid" }));
  out.push(S(k.slabOf(ARM, ARM_Z, ARM_TOP - ARM_Z, P, 3, 0.5), { tone: "mid" }));
  out.push(L(k.lineOnTop([0, ARM.y], [0, -4.6], ARM_TOP, P), { tone: "faint" }));
  out.push(S(k.cylinder(0, 0, 3.4, ARM_Z - 4, 4, P, 20), { tone: "mid" }));
  out.push(S(k.cylinder(0, 0, 4.6, ARM_TOP, 2, P, 24), { tone: "mid" }));
  out.push(S(k.cylinder(0, 0, 3.2, ARM_TOP + 2, TUBE_TOP - ARM_TOP - 2, P, 20), { tone: "mid", crease: "none" }));
  out.push(L(k.sideArc(0, 0, 3.2, ARM_TOP + 8, P, 12), { tone: "faint" }));
  out.push(S(k.cylinder(0, 0, DIAL_R, DIAL_Z, DIAL_H, P, 56, 0.6), { tone: "hi", crease: "lo" }));
  out.push(L(k.knurl(0, 0, DIAL_R, DIAL_TOP - 2.4, DIAL_TOP, 60, P, 0.3), { tone: "lo" }));
  out.push(L(k.sideArc(0, 0, DIAL_R, DIAL_TOP - 2.4, P, 32), { tone: "faint" }));
  out.push(L(k.ring(0, 0, DIAL_R - 1.6, DIAL_TOP, P, 48), { tone: "lo" }));
  const ticks = k.radialTicks(0, 0, DIAL_R - 2.2, 40, 5, DIAL_TOP, [1, 2], P);
  out.push(L(ticks.minor, { tone: "lo" }), L(ticks.major, { tone: "mid" }));
  out.push(L(k.ring(0, 0, 1.2, DIAL_TOP, P, 12), { tone: "mid" }));
  return out.join("");
}

const dialNeedle = (turn, x) => {
  const a = turn * Math.PI * 2;
  return k.lineOnTop([x - Math.sin(a) * 2.4, Math.cos(a) * 2.4], [x + Math.sin(a) * (DIAL_R - 3), -Math.cos(a) * (DIAL_R - 3)], DIAL_TOP + 0.2, P);
};

function strip() {
  const out = [S(k.slabOf(STRIP, 0, 0.8, P, 3), { tone: "lo", crease: "none" })];
  const ticks = k.topTicks(STRIP.x + 4, STRIP.x + STRIP.w - 4, 4, 6, STRIP.y + 0.8, 0.8, [1.8, 3.4], P);
  out.push(L(ticks.minor, { tone: "lo" }), L(ticks.major, { tone: "mid" }));
  out.push(D([at([STRIP.x + 2, STRIP.y + 4, 0.8]), at([STRIP.x + STRIP.w - 2, STRIP.y + 4, 0.8])], { size: 0.45 }));
  return out.join("");
}

function marker() {
  // El tope del mejor estado, construido en x = 0 sobre la regla.
  const shoe = { x: -4, y: STRIP.y - 1, w: 8, d: STRIP.d + 2, r: 1 };
  return [
    S(k.slabOf(shoe, 0.8, 3, P, 2, 0.4), { tone: "hi", crease: "lo" }),
    S(k.cylinder(0, STRIP.y + STRIP.d / 2, 1.6, 3.8, 2.4, P, 16), { tone: "mid" }),
    L(k.lineOnTop([0, shoe.y], [0, shoe.y + 2.4], 3.8, P), { tone: "hi" }),
  ].join("");
}

function knob() {
  const [x, y] = KNOB;
  const out = [];
  out.push(S(k.cylinder(x, y, 15, 0, 2.4, P, 56, 0.5), { tone: "mid" }));
  const scale = k.radialTicks(x, y, 13.6, 28, 7, 2.4, [1.2, 2.4], P, KNOB_FROM + 2 * Math.PI, KNOB_SPAN);
  out.push(L(scale.minor, { tone: "lo" }), L(scale.major, { tone: "mid" }));
  out.push(S(k.cylinder(x, y, 7, 2.4, KNOB_TOP - 2.4, P, 36), { tone: "mid" }));
  out.push(L(k.knurl(x, y, 7, 2.4, KNOB_TOP, 40, P), { tone: "lo" }));
  out.push(k.faceTextSvg(k.topMatrix([x, y + 10.6], 2.4, P, "x"), "kT", { size: 2.4, tone: "lo", anchor: "middle" }));
  return out.join("");
}

const knobPointer = (t) => {
  const share = Math.log(t / T_MIN) / Math.log(T_MAX / T_MIN);
  const a = KNOB_FROM + share * KNOB_SPAN;
  const [x, y] = KNOB;
  return k.lineOnTop([x, y], [x + Math.sin(a) * 6, y - Math.cos(a) * 6], KNOB_TOP, P);
};

function wheel() {
  const [x, y] = WHEEL;
  const out = [];
  out.push(S(k.cylinder(x, y, WHEEL_R + 3, 0, WHEEL_Z, P, 64, 0.5), { tone: "lo" }));
  out.push(D([0, 1, 2, 3].map((q) => at([x + Math.cos(q * Math.PI / 2 + 0.4) * (WHEEL_R + 1.6), y + Math.sin(q * Math.PI / 2 + 0.4) * (WHEEL_R + 1.6), WHEEL_Z])), { size: 0.45 }));
  out.push(S(k.cylinder(x, y, WHEEL_R, WHEEL_Z, WHEEL_TOP - WHEEL_Z, P, 64, 0.6), { tone: "hi", crease: "lo" }));
  out.push(L(k.ring(x, y, WHEEL_R - 1.4, WHEEL_TOP, P, 64), { tone: "lo" }));
  return out.join("");
}

const wheelTicks = () => {
  const [x, y] = WHEEL;
  const t = k.radialTicks(x, y, WHEEL_R - 1.4, 40, 10, WHEEL_TOP, [1, 2.2], P);
  return L(t.minor, { tone: "lo" }) + L(t.major, { tone: "mid" });
};

// Sector de aceptación: ángulo 0 hacia −y, creciendo en sentido horario visto desde arriba (como radialTicks).
const sectorPath = (p) => {
  const [x, y] = WHEEL;
  const r = WHEEL_R - 1.4;
  if (p >= 0.999) return k.ring(x, y, r, WHEEL_TOP, P, 64);
  if (p <= 0.001) return "";
  const n = Math.max(2, Math.ceil(64 * p));
  const pts = [at([x, y, WHEEL_TOP])];
  for (let i = 0; i <= n; i++) {
    const a = (i / n) * p * Math.PI * 2;
    pts.push(at([x + Math.sin(a) * r, y - Math.cos(a) * r, WHEEL_TOP]));
  }
  return "M" + pts.map(([sx, sy]) => `${sx.toFixed(1)} ${sy.toFixed(1)}`).join("L") + "Z";
};

const wheelNeedle = (a) => {
  const [x, y] = WHEEL;
  return k.lineOnTop([x - Math.sin(a) * 3, y + Math.cos(a) * 3], [x + Math.sin(a) * (WHEEL_R - 2.6), y - Math.cos(a) * (WHEEL_R - 2.6)], WHEEL_TOP + 0.2, P);
};

function labelPlate() {
  const plan = { x: -26, y: 40, w: 52, d: 14, r: 1.6 };
  const out = [S(k.slabOf(plan, 0, 0.8, P, 4), { tone: "lo", crease: "none" })];
  out.push(L(k.planOutline(k.insetPlan(plan, 1.6), 0.8, P, 4), { tone: "faint" }));
  out.push(L(k.lineOnTop([-18, 44.5], [14, 44.5], 0.8, P), { tone: "lo", free: true }));
  out.push(L(k.lineOnTop([-18, 47.5], [6, 47.5], 0.8, P), { tone: "lo", free: true }));
  out.push(L(k.lineOnTop([-18, 50.5], [10, 50.5], 0.8, P), { tone: "lo", free: true }));
  out.push(D([at([-23, 47, 0.8]), at([23, 47, 0.8])], { size: 0.45 }));
  return out.join("");
}

const START = 0;
const T0 = 2.4;
const behindFirst = byDepth(XS.map((x, i) => [x, 0, i])).map((p) => p[2]);

const blocksSvg = behindFirst.map((i) => `<g data-block="${i}">${block(i)}</g>`).join("");
const rowSvg = `<g data-part="row">${blocksSvg}<g data-part="plunger" transform="${k.translateAlong(P, [XS[START], 0, top(START)])}">${plunger()}</g></g>`;

const svg = k.figureSvg({
  width: WIDTH,
  height: HEIGHT,
  label:
    "Un banco de pruebas para el criterio de Metropolis. Nueve bloques de alturas distintas son nueve estados y su altura es su energía. Un cabezal en un pórtico apoya un palpador sobre el estado actual. Para cada movimiento propuesto a un bloque vecino, una rueda pinta un sector del tamaño de la probabilidad de aceptarlo y una aguja gira hasta un número al azar: si cae en el sector, el palpador se muda. Una perilla fija la temperatura y un tope en la regla marca el mejor estado visto.",
  body: [
    `<style>.mc-sector{fill:var(--anatomy-lo);fill-opacity:.38;stroke:var(--anatomy-mid);stroke-width:.5}</style>`,
    base(),
    byDepth(POSTS.map((x) => [x, POST_Y])).map(([x]) => post(x)).join(""),
    rail(),
    bed(),
    rowSvg,
    strip(),
    `<g data-part="marker" transform="${k.translateAlong(P, [XS[START], 0, 0])}">${marker()}</g>`,
    `<g data-part="head" transform="${k.translateAlong(P, [XS[START], 0, 0])}">${head()}</g>`,
    `<path data-part="dial-needle" class="iso-line" data-tone="hi" data-free="start" d="${dialNeedle(ENERGIES[START] / PER_TURN, XS[START])}" style="stroke-width:.9"/>`,
    knob(),
    `<path data-part="knob-pointer" class="iso-line" data-tone="hi" data-free="end" d="${knobPointer(T0)}" style="stroke-width:1"/>`,
    labelPlate(),
    wheel(),
    `<path data-part="sector" class="mc-sector" d="${sectorPath(1)}"/>`,
    wheelTicks(),
    `<path data-part="wheel-needle" class="iso-line" data-tone="hi" data-free="both" d="${wheelNeedle(0)}" style="stroke-width:1"/>`,
    L(k.ring(WHEEL[0], WHEEL[1], 1.4, WHEEL_TOP, P, 12), { tone: "mid" }),
  ],
});

const live = `
const P = ${JSON.stringify(P)};
const ENERGIES = ${JSON.stringify(ENERGIES)};
const XS = ${JSON.stringify(XS)};
const BED_H = ${BED_H}, LIFT = ${LIFT}, TIP_R = ${TIP_R}, BLOCK_W = ${BLOCK_W}, PER_TURN = ${PER_TURN};
const DIAL_R = ${DIAL_R}, DIAL_TOP = ${DIAL_TOP};
const WHEEL = ${JSON.stringify(WHEEL)}, WHEEL_R = ${WHEEL_R}, WHEEL_TOP = ${WHEEL_TOP};
const KNOB = ${JSON.stringify(KNOB)}, KNOB_TOP = ${KNOB_TOP}, KNOB_FROM = ${KNOB_FROM}, KNOB_SPAN = ${KNOB_SPAN};
const T_MIN = ${T_MIN}, T_MAX = ${T_MAX};
const dialNeedle = ${dialNeedle.toString().replace("k.lineOnTop", "lineOnTop")};
const knobPointer = ${knobPointer.toString().replace("k.lineOnTop", "lineOnTop")};
const sectorPath = ${sectorPath.toString().replace("k.ring", "ring")};
const wheelNeedle = ${wheelNeedle.toString().replace("k.lineOnTop", "lineOnTop")};
const at = (point) => iso(point, P);
const top = (i) => BED_H + ENERGIES[i];

const stage = document.querySelector(".iso-stage");
const svg = stage.querySelector("svg");
const $ = (name) => svg.querySelector('[data-part="' + name + '"]');
const row = $("row"), plungerEl = $("plunger"), headEl = $("head"), markerEl = $("marker");
const dialEl = $("dial-needle"), knobEl = $("knob-pointer"), sectorEl = $("sector"), wheelEl = $("wheel-needle");
const blockEls = [...row.querySelectorAll("[data-block]")];
const readout = document.querySelector("[data-readout]");
const still = matchMedia("(prefers-reduced-motion: reduce)");

// Metropolis tal como MonteCarlo::boltzmann: p = exp(clamp(−ΔE/kT, −40, 40)); se rechaza si uniforme ≥ p.
const acceptance = (dE, t) => Math.min(1, Math.exp(Math.min(40, Math.max(-40, -dE / t))));

let state = ${START}, best = ${START}, temp = ${T0}, userTemp = null;
let px = XS[state], hx = px, tip = { at: top(state), rate: 0 };
let phase = "rest", phaseClock = 0, proposal = null, sector = 1, sectorTarget = 1;
let needle = 0, needleFrom = 0, needleTo = 0, stepsTaken = 0, accepted = 0;
let lastWords = "en reposo";
let frame = 0, last = 0, visible = false, touring = !still.matches, tourClock = 0, idleTimer = 0;

// Recocido simulado en la visita guiada: la temperatura baja de 6 a 0.2 en 40 s, se queda 6 s y vuelve a empezar.
const tourTemp = (t) => (t < 40 ? T_MAX * Math.pow(T_MIN / T_MAX, t / 40) : T_MIN);

function order() {
  // Los bloques más cercanos que el palpador (y que no lo sostienen) se pintan después de él.
  const pd = depthOf([px, 0, 0], P);
  const behind = [], front = [];
  for (const el of blockEls) {
    const i = +el.dataset.block;
    const holds = Math.abs(XS[i] - px) < BLOCK_W / 2 + TIP_R;
    (!holds && depthOf([XS[i], 0, 0], P) > pd ? front : behind).push(el);
  }
  const want = [...behind, plungerEl, ...front];
  if (want.some((el, i) => row.children[i] !== el)) for (const el of want) row.appendChild(el);
}

function propose() {
  const step = state === 0 ? 1 : state === ENERGIES.length - 1 ? -1 : Math.random() < 0.5 ? -1 : 1;
  const to = state + step;
  const dE = ENERGIES[to] - ENERGIES[state];
  const p = acceptance(dE, temp);
  const u = Math.random();
  proposal = { to, dE, p, u, accept: u < p };
  sectorTarget = p;
  needleFrom = needle % (Math.PI * 2);
  needleTo = Math.PI * 2 * (2 + u);
  phase = "spin"; phaseClock = 0;
}

function words() {
  if (!proposal) return "kT " + temp.toFixed(1) + " · estado " + (state + 1) + " · E " + ENERGIES[state] + " · mejor " + ENERGIES[best];
  const sign = proposal.dE > 0 ? "+" : proposal.dE < 0 ? "−" : "±";
  const verdict = phase === "spin" ? "girando" : proposal.accept ? "aceptado" : "rechazado";
  return "kT " + temp.toFixed(1) + " · ΔE " + sign + Math.abs(proposal.dE) + " · p " + (proposal.p >= 1 ? "1" : proposal.p.toFixed(2)) + " · " + verdict + " · mejor " + ENERGIES[best];
}

function draw() {
  plungerEl.setAttribute("transform", translateAlong(P, [px, 0, tip.at]));
  headEl.setAttribute("transform", translateAlong(P, [hx, 0, 0]));
  markerEl.setAttribute("transform", translateAlong(P, [XS[best], 0, 0]));
  dialEl.setAttribute("d", dialNeedle((tip.at - BED_H) / PER_TURN, hx));
  knobEl.setAttribute("d", knobPointer(temp));
  sectorEl.setAttribute("d", sectorPath(sector));
  wheelEl.setAttribute("d", wheelNeedle(needle));
  order();
  const text = words();
  if (readout.textContent !== text) readout.textContent = text;
}

function describe() {
  const text = "Temperatura " + temp.toFixed(1) + ". Estado " + (state + 1) + " con energía " + ENERGIES[state] + ". Mejor energía vista: " + ENERGIES[best] + ".";
  if (text !== lastWords) { lastWords = text; stage.setAttribute("aria-valuetext", text); stage.setAttribute("aria-valuenow", temp.toFixed(1)); }
}

const ease = (t) => 1 - Math.pow(1 - t, 3);
function springTo(target, dt, calm) {
  if (calm) { tip.at = target; tip.rate = 0; return; }
  for (let i = 0; i < 8; i++) { tip.rate += ((target - tip.at) * 380 - tip.rate * 30) * dt / 8; tip.at += tip.rate * dt / 8; }
  if (Math.abs(target - tip.at) < 0.01 && Math.abs(tip.rate) < 0.01) { tip.at = target; tip.rate = 0; }
}

function advance(dt, calm) {
  phaseClock += dt;
  const speed = calm ? 1e9 : 1;
  sector += (sectorTarget - sector) * (calm ? 1 : 1 - Math.exp(-dt / 0.12));
  if (phase === "rest") {
    springTo(top(state), dt, calm);
    if (phaseClock * speed > 0.45 && (touring || auto)) propose();
  } else if (phase === "spin") {
    const t = Math.min(1, (phaseClock * speed) / 0.8);
    needle = needleFrom + (needleTo - needleFrom) * ease(t);
    if (t >= 1) {
      stepsTaken++;
      if (proposal.accept) { accepted++; phase = "lift"; } else { phase = "hold"; }
      phaseClock = 0;
    }
  } else if (phase === "hold") {
    if (phaseClock * speed > 0.5) { phase = "rest"; phaseClock = 0; }
  } else if (phase === "lift") {
    springTo(LIFT, dt, calm);
    if (tip.at > LIFT - 1.5 || calm) { phase = "move"; phaseClock = 0; }
  } else if (phase === "move") {
    const goal = XS[proposal.to];
    px += (goal - px) * (calm ? 1 : 1 - Math.exp(-dt / 0.16));
    springTo(LIFT, dt, calm);
    if (Math.abs(goal - px) < 0.05) {
      px = goal; state = proposal.to;
      if (ENERGIES[state] < ENERGIES[best]) best = state;
      phase = "drop"; phaseClock = 0;
    }
  } else if (phase === "drop") {
    springTo(top(state), dt, calm);
    if (tip.at === top(state) || phaseClock > 0.6) { phase = "rest"; phaseClock = 0; }
  }
  hx += (px - hx) * (calm ? 1 : 1 - Math.exp(-dt / 0.05));
  if (Math.abs(px - hx) < 0.01) hx = px;
}

let auto = !still.matches;
function tick(now) {
  const dt = last ? Math.min((now - last) / 1000, 1 / 30) : 1 / 60;
  last = now;
  const calm = still.matches;
  if (touring) {
    tourClock += dt;
    if (tourClock > 46) { tourClock = 0; best = state; }
    temp = tourTemp(tourClock);
  } else if (userTemp !== null) {
    temp += (userTemp - temp) * (calm ? 1 : 1 - Math.exp(-dt / 0.2));
  }
  advance(dt, calm);
  draw();
  describe();
  const settled = !touring && !auto && phase === "rest" && tip.rate === 0 && Math.abs(sector - sectorTarget) < 1e-3 && (userTemp === null || Math.abs(temp - userTemp) < 1e-3);
  frame = visible && !settled ? requestAnimationFrame(tick) : 0;
}
const run = () => { if (!frame && visible) { last = 0; frame = requestAnimationFrame(tick); } };
const steer = (t) => {
  touring = false; auto = !still.matches;
  userTemp = Math.min(T_MAX, Math.max(T_MIN, t));
  clearTimeout(idleTimer);
  idleTimer = setTimeout(() => { if (!still.matches) { touring = true; tourClock = 0; } run(); }, 3600);
  run();
};
new IntersectionObserver((entries) => { visible = entries[entries.length - 1].isIntersecting; if (visible) run(); }, { rootMargin: "120px 0px" }).observe(stage);
stage.addEventListener("pointermove", (event) => {
  const box = svg.getBoundingClientRect();
  const share = Math.min(1, Math.max(0, ((event.clientX - box.left) / box.width - 0.15) / 0.7));
  steer(T_MIN * Math.pow(T_MAX / T_MIN, share));
});
stage.addEventListener("keydown", (event) => {
  const factor = event.shiftKey ? 1.6 : 1.2;
  const now = userTemp ?? temp;
  let next = null;
  if (event.key === "ArrowRight" || event.key === "ArrowUp") next = now * factor;
  if (event.key === "ArrowLeft" || event.key === "ArrowDown") next = now / factor;
  if (event.key === "Home") next = T_MIN;
  if (event.key === "End") next = T_MAX;
  if (event.key === " " || event.key === "Enter") {
    event.preventDefault();
    touring = false; clearTimeout(idleTimer);
    if (phase === "rest") { propose(); run(); }
    return;
  }
  if (next === null) return;
  event.preventDefault();
  steer(next);
});
draw();
describe();
`;

const body = k.plateHtml({
  fig: "Fig 1",
  title: "Monte Carlo",
  hint: "Mueve el cursor para cambiar kT",
  readout: `kT ${T0.toFixed(1)} · estado ${START + 1} · E ${ENERGIES[START]} · mejor ${ENERGIES[START]}`,
  keys: [
    { mark: "lit", label: "Palpador: el estado aceptado ahora" },
    { mark: "raised", label: "Bloques: nueve estados, la altura es su energía" },
    { mark: "flat", label: "Sector de la rueda: p = exp(−ΔE/kT), entero si la energía baja" },
  ],
  caption:
    "Cada paso propone mudarse a un bloque vecino. Si la energía baja, se acepta siempre; si sube, solo cuando la aguja cae dentro del sector, que mide exp(−ΔE/kT). Con kT alto el palpador salta casi a cualquier lado; al enfriar se queda en los valles. El tope de la regla guarda el mejor estado visto: es lo que Rosetta devuelve al final con recover_low.",
  body: `<div class="iso-stage" tabindex="0" role="slider" aria-label="Monte Carlo: flechas para cambiar la temperatura, espacio para proponer un paso" aria-valuemin="${T_MIN}" aria-valuemax="${T_MAX}" aria-valuenow="${T0}">${svg}</div>`,
});

const file = theme === "light" ? "monte-carlo-light.html" : "monte-carlo.html";
writeFileSync(join(HERE, file), k.pageHtml({ title: "Monte Carlo", theme, body, script: kitScript() + live }));
console.log("escrito", file);
