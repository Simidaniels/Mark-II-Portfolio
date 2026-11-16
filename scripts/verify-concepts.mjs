/** Screenshot every rebuilt concept page at desktop + the 404-ish checks. */
import puppeteer from "puppeteer-core";
import { join } from "node:path";

const BASE = process.argv[2] ?? "http://localhost:3200";
const OUT = join(process.env.LOCALAPPDATA ?? ".", "Temp", "opencode", "mark2-concepts");
const { mkdirSync } = await import("node:fs");
mkdirSync(OUT, { recursive: true });

const CHROME = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const pages = ["nova", "sport", "store", "fashion", "novaleap", "novaspace"];

const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: "new",
  args: ["--no-sandbox", "--use-angle=swiftshader", "--enable-unsafe-swiftshader", "--hide-scrollbars"],
});
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

try {
  for (const slug of pages) {
    const page = await browser.newPage();
    const errors = [];
    page.on("pageerror", (e) => errors.push(e.message));
    await page.setViewport({ width: 1440, height: 900 });
    await page.goto(`${BASE}/concepts/${slug}`, { waitUntil: "networkidle2", timeout: 60000 });
    await sleep(1200);
    await page.screenshot({ path: join(OUT, `${slug}-top.png`) });
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight * 0.45));
    await sleep(600);
    await page.screenshot({ path: join(OUT, `${slug}-mid.png`) });
    const info = await page.evaluate(() => ({
      title: document.title,
      h1: document.querySelector("h1")?.textContent?.replace(/\s+/g, " ").trim().slice(0, 80),
      backLink: Boolean(document.querySelector('a[aria-label="Back to the NOVA CORE collection"]')),
    }));
    console.log(slug.padEnd(10), JSON.stringify(info), "| errors:", errors.length ? errors : "none");
    await page.close();
  }

  // Legacy redirects
  for (const slug of pages) {
    const res = await fetch(`${BASE}/concepts/${slug}/index.html`, { redirect: "manual" });
    console.log(`redirect /concepts/${slug}/index.html ->`, res.status, res.headers.get("location"));
  }

  // Mobile spot checks
  for (const slug of ["nova", "store", "novaspace"]) {
    const page = await browser.newPage();
    await page.setViewport({ width: 390, height: 844, isMobile: true, hasTouch: true });
    await page.goto(`${BASE}/concepts/${slug}`, { waitUntil: "networkidle2", timeout: 60000 });
    await sleep(1000);
    await page.screenshot({ path: join(OUT, `${slug}-mobile.png`) });
    await page.close();
  }
} finally {
  await browser.close();
}
