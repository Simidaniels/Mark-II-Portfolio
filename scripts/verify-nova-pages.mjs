/** Screenshot all six rebuilt NOVA case studies + gallery + collection. */
import puppeteer from "puppeteer-core";
import { mkdirSync } from "node:fs";
import { join } from "node:path";

const BASE = process.argv[2] ?? "http://localhost:3200";
const OUT = join(process.env.LOCALAPPDATA ?? ".", "Temp", "opencode", "mark2-nova-pages");
mkdirSync(OUT, { recursive: true });
const CHROME = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: "new",
  args: ["--no-sandbox", "--use-angle=swiftshader", "--enable-unsafe-swiftshader", "--hide-scrollbars"],
});

const pages = ["nova-crypto", "nova-sport", "nova-bike", "nova-fashion", "novaleap", "nova-finance"];
try {
  for (const slug of pages) {
    const page = await browser.newPage();
    const errors = [];
    page.on("pageerror", (e) => errors.push(e.message));
    await page.setViewport({ width: 1440, height: 900 });
    await page.goto(`${BASE}/projects/${slug}`, { waitUntil: "networkidle2", timeout: 60000 });
    await sleep(1400);
    await page.screenshot({ path: join(OUT, `${slug}-top.png`) });
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight * 0.6));
    await sleep(800);
    await page.screenshot({ path: join(OUT, `${slug}-mid.png`) });
    const info = await page.evaluate(() => ({
      h1: document.querySelector("h1")?.textContent?.replace(/\s+/g, " ").trim(),
      breadcrumb: [...document.querySelectorAll("nav[aria-label='Breadcrumb'] li")].map((li) => li.textContent.trim()).join(" > "),
      back: Boolean([...document.querySelectorAll("a")].find((a) => (a.textContent ?? "").includes("Back to nova core"))),
      built: document.body.innerText.includes("IN THE CONCEPT BUILD"),
      proposed: document.body.innerText.includes("PROPOSED DIRECTION"),
      images: [...document.querySelectorAll("img")].map((i) => i.currentSrc || i.src).filter((s) => s.includes("/images/nova/")).length,
    }));
    console.log(slug.padEnd(14), JSON.stringify(info), "| errors:", errors.length ? errors : "none");
    await page.close();
  }

  // Gallery — covers use new images
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 1100 });
  await page.goto(BASE, { waitUntil: "networkidle2", timeout: 60000 });
  await sleep(2000);
  await page.evaluate(() => document.querySelector("#projects")?.scrollIntoView());
  await sleep(1800);
  await page.screenshot({ path: join(OUT, "gallery.png") });
  const covers = await page.evaluate(() =>
    [...document.querySelectorAll("#projects img")].map((i) => (i.currentSrc || i.src || "").split("?")[0].split("/").pop())
  );
  console.log("gallery covers:", JSON.stringify(covers));
  await page.close();
} finally {
  await browser.close();
}
