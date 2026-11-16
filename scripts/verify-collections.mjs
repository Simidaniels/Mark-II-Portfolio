/** Screenshot the regrouped gallery + collections + animated NovaLeap. */
import puppeteer from "puppeteer-core";
import { mkdirSync } from "node:fs";
import { join } from "node:path";

const BASE = process.argv[2] ?? "http://localhost:3200";
const OUT = join(process.env.LOCALAPPDATA ?? ".", "Temp", "opencode", "mark2-collections");
mkdirSync(OUT, { recursive: true });
const CHROME = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: "new",
  args: ["--no-sandbox", "--use-angle=swiftshader", "--enable-unsafe-swiftshader", "--hide-scrollbars"],
});

try {
  const page = await browser.newPage();
  const errors = [];
  page.on("pageerror", (e) => errors.push(e.message));
  await page.setViewport({ width: 1440, height: 900 });

  // Gallery
  await page.goto(BASE, { waitUntil: "networkidle2", timeout: 60000 });
  await sleep(1800);
  await page.evaluate(() => document.querySelector("#projects")?.scrollIntoView());
  await sleep(1800);
  await page.screenshot({ path: join(OUT, "01-gallery.png") });
  const gallery = await page.evaluate(() => ({
    collections: [...document.querySelectorAll("#projects a")].filter((a) => a.getAttribute("href")?.startsWith("/collections")).length,
    brooksTile: Boolean(document.querySelector('#projects a[href="/projects/design-brooks"]')),
    count: [...document.querySelectorAll("#projects a")].length,
  }));
  console.log("gallery:", JSON.stringify(gallery));

  // Collections
  await page.goto(`${BASE}/collections/nova-core`, { waitUntil: "networkidle2", timeout: 60000 });
  await sleep(1200);
  await page.screenshot({ path: join(OUT, "02-nova-core.png") });
  await page.goto(`${BASE}/collections/design-brooks`, { waitUntil: "networkidle2", timeout: 60000 });
  await sleep(1200);
  await page.screenshot({ path: join(OUT, "03-design-brooks.png") });

  // Design Brooks case study
  await page.goto(`${BASE}/projects/design-brooks`, { waitUntil: "networkidle2", timeout: 60000 });
  await sleep(1200);
  await page.screenshot({ path: join(OUT, "04-brooks-case-study.png") });
  const cs = await page.evaluate(() => ({
    h1: document.querySelector("h1")?.textContent?.trim(),
    live: [...document.querySelectorAll("a")].find((a) => (a.textContent ?? "").match(/visit live/i))?.getAttribute("href") ?? null,
  }));
  console.log("case study:", JSON.stringify(cs));

  // Animated NovaLeap
  await page.goto(`${BASE}/concepts/novaleap`, { waitUntil: "networkidle2", timeout: 60000 });
  await sleep(1500);
  await page.screenshot({ path: join(OUT, "05-novaleap-hero.png") });
  const anim = await page.evaluate(() => ({
    wheel: Boolean(document.querySelector(".leap-wheel")),
    speed: document.querySelectorAll(".leap-speed").length,
  }));
  console.log("novaleap anim nodes:", JSON.stringify(anim));

  console.log("page errors:", errors.length ? errors : "none");
} finally {
  await browser.close();
}
