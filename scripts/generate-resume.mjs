/**
 * Generates public/resume/Daniel-Adepitan-Resume.pdf
 * Content rule: verified facts only (owner brief + prior resume + edu history).
 * Re-run after any content update:  npm run generate:resume
 */
import pdfmake from "pdfmake";
import Roboto from "pdfmake/fonts/Roboto.js";
import { mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

pdfmake.addFonts(Roboto);

const here = dirname(fileURLToPath(import.meta.url));
const out = join(here, "..", "public", "resume", "Daniel-Adepitan-Resume.pdf");
mkdirSync(dirname(out), { recursive: true });

const AMBER = "#d4a017";
const INK = "#14171c";
const GREY = "#4c545f";

const section = (title) => ({
  columns: [
    {
      text: title.toUpperCase(),
      style: "sectionTitle",
      width: "auto",
    },
    {
      canvas: [{ type: "line", x1: 0, y1: 5, x2: 460, y2: 5, lineWidth: 0.75, lineColor: AMBER }],
      width: "*",
    },
  ],
  columnGap: 10,
  margin: [0, 14, 0, 6],
});

const skillRow = (label, value) => ({
  columns: [
    { text: label.toUpperCase(), style: "skillLabel", width: 78 },
    { text: value, style: "body", width: "*" },
  ],
  margin: [0, 2.5, 0, 2.5],
});

const project = (name, line, stack) => [
  {
    columns: [
      { text: name, style: "projectName", width: "auto" },
      { text: stack, style: "projectStack", width: "*", alignment: "right" },
    ],
  },
  { text: line, style: "body", margin: [0, 1, 0, 5] },
];

const docDefinition = {
  pageSize: "A4",
  pageMargins: [46, 44, 46, 40],
  defaultStyle: {
    font: "Roboto",
    color: INK,
    fontSize: 9.5,
    lineHeight: 1.18,
  },
  styles: {
    name: { fontSize: 26, bold: true, color: INK, characterSpacing: 0.5 },
    role: { fontSize: 10, color: AMBER, bold: true, characterSpacing: 2.4, margin: [0, 2, 0, 6] },
    contact: { fontSize: 8.5, color: GREY, characterSpacing: 0.4 },
    sectionTitle: { fontSize: 9.5, bold: true, color: INK, characterSpacing: 1.8 },
    body: { fontSize: 9.5, color: "#242a32" },
    skillLabel: { fontSize: 7.5, bold: true, color: "#6a7078", characterSpacing: 0.8, margin: [0, 1.5, 0, 0] },
    projectName: { fontSize: 10, bold: true, color: INK },
    projectStack: { fontSize: 7.5, color: GREY, characterSpacing: 0.5, margin: [0, 2, 0, 0] },
  },
  content: [
    { text: "DANIEL SIMILOLUWA ADEPITAN", style: "name" },
    { text: "SOFTWARE DEVELOPER · FULL-STACK ENGINEER", style: "role" },
    {
      text: "Ikeja, Lagos, Nigeria   ·   simidaniels0506@gmail.com   ·   +234 913 999 8795   ·   github.com/Simidaniels",
      style: "contact",
    },

    section("Objective"),
    {
      text: "Software developer building modern web applications, scalable digital products and thoughtful user experiences — from frontend interfaces to backend architecture, database design and deployment. Currently focused on SaaS products and full-stack application engineering.",
      style: "body",
    },

    section("Technical Skills"),
    skillRow("Frontend", "HTML5, CSS3, JavaScript, TypeScript, React, Next.js, Tailwind CSS, Material UI"),
    skillRow("Backend", "Node.js, Express.js, Laravel, PHP, REST APIs"),
    skillRow("Databases", "PostgreSQL, MySQL, Prisma, Convex"),
    skillRow("Infra", "Vercel, Render, Railway, Cloudflare R2"),
    skillRow("Tools", "Git, GitHub, VS Code, Docker"),

    section("Selected Projects — Concept Studies"),
    ...project(
      "Nova Bike (NOVABIKE)",
      "Fictionally branded electric-mobility launch page — model lineup, spec sheets, pre-order and subsidy narrative. Solo design & build.",
      "HTML5 · CSS3 · JavaScript · AOS"
    ),
    ...project(
      "Nova Crypto (CryptoNova)",
      "Crypto-platform concept exploring a trust-first fintech identity — onboarding, staking and ecosystem narrative. Solo design & build.",
      "HTML5 · CSS3 · JavaScript · AOS"
    ),
    ...project(
      "Nova Sport (NOVASPORT)",
      "Basketball performance-club concept — programs, coaches, membership pricing and community. Solo design & build.",
      "HTML5 · CSS3 · JavaScript · AOS"
    ),
    ...project(
      "Nova Fashion",
      "Luxury editorial fashion concept — collections, campaign direction and lookbook-style storytelling. Solo design & build.",
      "HTML5 · CSS3 · JavaScript · AOS"
    ),
    ...project(
      "NovaLeap",
      "Hypercar showroom concept — garage lineup, spec-led comparison matrix and reservation desk. Solo design & build.",
      "HTML5 · CSS3 · JavaScript · AOS"
    ),
    ...project(
      "Nova Finance",
      "Private-banking concept — wealth dashboard, portfolio allocation and client reports, calm and premium. Solo design & build.",
      "HTML5 · CSS3 · JavaScript · AOS"
    ),

    section("Education"),
    { text: "BSc Physics — Federal University, Oye-Ekiti, Nigeria  ·  Graduate, 2025", style: "body" },
    {
      text: "WAEC / WASSCE — Cathedral Church of Our Savior College  ·  2019",
      style: "body",
      margin: [0, 3, 0, 0],
    },

    section("Additional"),
    { text: "Python (Udemy) · Self-paced learning and open-source practice · Available for freelance and full-time opportunities", style: "body" },
  ],
};

await pdfmake.createPdf(docDefinition).write(out);
console.log(`Resume written to ${out}`);
