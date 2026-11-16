/**
 * MARK II — real-browser verification (puppeteer-core + system Chrome).
 * Usage: node scripts/verify-ui.mjs [baseUrl]   (default http://localhost:3200)
 * Writes screenshots to %LOCALAPPDATA%\Temp\opencode\mark2-shots
 */
import puppeteer from "puppeteer-core";
import { mkdirSync } from "node:fs";
import { join } from "node:path";

const BASE = process.argv[2] ?? "http://localhost:3200";
const OUT = join(process.env.LOCALAPPDATA ?? ".", "Temp", "opencode", "mark2-shots");
mkdirSync(OUT, { recursive: true });

const CHROME =
  process.env.CHROME_PATH ??
  "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";

const consoleLog = [];
const pageErrors = [];

function watch(page, tag) {
  page.on("console", (msg) => {
    if (["error", "warning"].includes(msg.type())) {
      consoleLog.push(`[${tag}] console.${msg.type()}: ${msg.text()}`);
    }
  });
  page.on("pageerror", (err) => pageErrors.push(`[${tag}] ${err.message}`));
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: "new",
  args: [
    "--no-sandbox",
    "--use-angle=swiftshader",
    "--enable-unsafe-swiftshader",
    "--hide-scrollbars",
    "--force-device-scale-factor=1",
  ],
});

async function shot(page, name) {
  const path = join(OUT, name);
  await page.screenshot({ path, fullPage: false });
  console.log("shot:", path);
}

try {
  // ── 1. Desktop home ──────────────────────────────────────────
  const page = await browser.newPage();
  watch(page, "home");
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto(BASE, { waitUntil: "networkidle2", timeout: 60000 });
  await sleep(2500); // let GSAP + 3D settle
  await shot(page, "01-home-desktop.png");

  const heroInfo = await page.evaluate(() => ({
    hasCanvas: Boolean(document.querySelector("#home canvas")),
    headline: document.querySelector("h1")?.textContent?.replace(/\s+/g, " ").trim(),
    navLinks: [...document.querySelectorAll("header nav a")].map((a) => a.textContent.trim()),
    resumeHref: document.querySelector('a[download][href*="resume"]')?.getAttribute("href"),
    bodyOverflow: document.body.style.overflow,
  }));
  console.log("hero:", JSON.stringify(heroInfo, null, 2));

  // ── 2. Expertise: click Backend node chip ───────────────────
  await page.evaluate(() => document.querySelector("#expertise")?.scrollIntoView());
  await sleep(1500);
  const beforeBackend = await page.evaluate(() => document.body.innerText.includes("Node.js"));
  const cards = await page.$$eval("button[aria-pressed]", (els) =>
    els.map((e) => ({ text: e.textContent.trim(), pressed: e.getAttribute("aria-pressed") }))
  );
  console.log("expertise chips:", JSON.stringify(cards));
  const backendBtn = (await page.$$("button[aria-pressed]")).find(async (b) =>
    (await b.evaluate((el) => el.textContent))?.includes("Backend")
  );
  await backendBtn?.click();
  await sleep(800);
  const afterBackend = await page.evaluate(() => document.body.innerText.includes("REST APIs"));
  console.log("backend chip before->after:", beforeBackend, "->", afterBackend);
  await shot(page, "02-expertise-desktop.png");

  // ── 3. Contact form: empty submit shows validation ──────────
  await page.evaluate(() => document.querySelector("#contact")?.scrollIntoView());
  await sleep(1000);
  await page.click("button[type=submit]");
  await sleep(800);
  const validation = await page.evaluate(() => ({
    nameErr: document.querySelector("#err-name")?.textContent ?? null,
    emailErr: document.querySelector("#err-email")?.textContent ?? null,
    messageErr: document.querySelector("#err-message")?.textContent ?? null,
  }));
  console.log("validation:", JSON.stringify(validation));

  // ── 4. Contact form: valid submit reaches server (503 w/o key) ──
  await page.type("#contact-name", "Test Person");
  await page.type("#contact-email", "test@example.com");
  await page.type("#contact-subject", "Browser verification");
  await page.type("#contact-message", "Automated verification of the contact pipeline.");
  await page.click("button[type=submit]");
  await sleep(1500);
  const submitResult = await page.evaluate(() => document.body.innerText.match(/(Email service is not configured|Message received|Could not send|Transmitting)/i)?.[0] ?? "unknown");
  console.log("submit result:", submitResult);
  await shot(page, "03-contact-desktop.png");

  // ── 5. Projects + case study ────────────────────────────────
  await page.evaluate(() => document.querySelector("#projects")?.scrollIntoView());
  await sleep(1500);
  await shot(page, "04-projects-desktop.png");
  await page.goto(`${BASE}/projects/nova-bike`, { waitUntil: "networkidle2", timeout: 60000 });
  await sleep(1200);
  await shot(page, "05-casestudy-novabike.png");
  const caseStudy = await page.evaluate(() => ({
    h1: document.querySelector("h1")?.textContent?.trim(),
    hasStack: document.body.innerText.includes("AOS"),
  }));
  console.log("case study:", JSON.stringify(caseStudy));

  // ── 6. Mobile 390px ─────────────────────────────────────────
  const mobile = await browser.newPage();
  watch(mobile, "mobile");
  await mobile.setViewport({ width: 390, height: 844, isMobile: true, hasTouch: true });
  await mobile.goto(BASE, { waitUntil: "networkidle2", timeout: 60000 });
  await sleep(2000);
  await shot(mobile, "06-home-mobile.png");
  const toggle = await mobile.$('button[aria-label="Open menu"]');
  await toggle?.click();
  await sleep(600);
  await shot(mobile, "07-mobile-menu.png");
  await mobile.keyboard.press("Escape");
  await sleep(400);
  const menuClosed = await mobile.evaluate(() => !document.querySelector("#mobile-menu"));
  console.log("mobile menu closes on Escape:", menuClosed);

  // ── 7. Reduced motion ───────────────────────────────────────
  const rm = await browser.newPage();
  watch(rm, "reduced-motion");
  await rm.emulateMediaFeatures([{ name: "prefers-reduced-motion", value: "reduce" }]);
  await rm.setViewport({ width: 1440, height: 900 });
  await rm.goto(BASE, { waitUntil: "networkidle2", timeout: 60000 });
  await sleep(1500);
  await shot(rm, "08-reduced-motion.png");

  console.log("\n── SUMMARY ──────────────────────────────────");
  console.log("page errors:", pageErrors.length ? pageErrors : "none");
  console.log("console errors/warnings:", consoleLog.length ? consoleLog : "none");
} finally {
  await browser.close();
}
