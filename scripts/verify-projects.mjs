/** Focused re-verification after the project-registry swap. */
import puppeteer from "puppeteer-core";
import { join } from "node:path";

const BASE = process.argv[2] ?? "http://localhost:3200";
const OUT = join(process.env.LOCALAPPDATA ?? ".", "Temp", "opencode", "mark2-shots");
const CHROME = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";

const pageErrors = [];
const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: "new",
  args: ["--no-sandbox", "--use-angle=swiftshader", "--enable-unsafe-swiftshader", "--hide-scrollbars"],
});
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

try {
  const page = await browser.newPage();
  page.on("pageerror", (err) => pageErrors.push(err.message));
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto(BASE, { waitUntil: "networkidle2", timeout: 60000 });
  await sleep(2000);
  await page.evaluate(() => document.querySelector("#projects")?.scrollIntoView());
  await sleep(1800);
  await page.screenshot({ path: join(OUT, "09-projects-restored.png") });
  const gallery = await page.evaluate(() => {
    const text = document.body.innerText;
    return {
      novaBike: text.includes("NOVABIKE") || /NOVA BIKE/i.test(text),
      cryptoNova: /NOVA CRYPTO/i.test(text),
      novaleap: /NOVACLEAP|NOVALEAP/i.test(text),
      rallyProGone: !text.includes("RallyPro"),
      caseStudyLinks: [...document.querySelectorAll('a[href^="/projects/"]')].length,
    };
  });
  console.log("gallery:", JSON.stringify(gallery, null, 2));

  await page.goto(`${BASE}/projects/nova-bike`, { waitUntil: "networkidle2", timeout: 60000 });
  await sleep(1200);
  await page.screenshot({ path: join(OUT, "10-casestudy-novabike.png") });
  const cs = await page.evaluate(() => ({
    h1: document.querySelector("h1")?.textContent?.trim(),
    launchConcept: [...document.querySelectorAll("a")].find((a) => /Launch concept/i.test(a.textContent))?.getAttribute("href") ?? null,
    source: [...document.querySelectorAll("a")].find((a) => /Source/i.test(a.textContent))?.getAttribute("href") ?? null,
  }));
  console.log("case study:", JSON.stringify(cs, null, 2));
  console.log("page errors:", pageErrors.length ? pageErrors : "none");
} finally {
  await browser.close();
}
