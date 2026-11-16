/** Mascot integration check: hero desktop/mobile, greeting, about plate. */
import puppeteer from "puppeteer-core";
import { join } from "node:path";

const BASE = process.argv[2] ?? "http://localhost:3200";
const OUT = join(process.env.LOCALAPPDATA ?? ".", "Temp", "opencode", "mark2-mascot");
const { mkdirSync } = await import("node:fs");
mkdirSync(OUT, { recursive: true });
const CHROME = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: "new",
  args: ["--no-sandbox", "--enable-unsafe-swiftshader", "--hide-scrollbars"],
});

try {
  const page = await browser.newPage();
  const errors = [];
  page.on("pageerror", (e) => errors.push(e.message));
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto(BASE, { waitUntil: "networkidle2", timeout: 60000 });
  await sleep(2200);
  await page.screenshot({ path: join(OUT, "01-hero-desktop.png") });

  // Greeting interaction
  const mascot = await page.$('[aria-label*="MARK II mascot"]');
  if (mascot) {
    await mascot.click();
    await sleep(500);
    await page.screenshot({ path: join(OUT, "02-greeting.png") });
    const greetingShown = await page.evaluate(() => document.body.innerText.includes("HELLO, HUMAN") || document.body.innerText.includes("Hello, human"));
    console.log("greeting visible on click:", greetingShown);
  } else {
    console.log("mascot button NOT found");
  }

  // Scroll drift
  await page.evaluate(() => window.scrollTo(0, window.innerHeight * 0.6));
  await sleep(700);
  await page.screenshot({ path: join(OUT, "03-scroll.png") });

  // About plate
  await page.evaluate(() => document.querySelector("#about")?.scrollIntoView());
  await sleep(1500);
  await page.screenshot({ path: join(OUT, "04-about.png") });

  // Mobile
  const mobile = await browser.newPage();
  mobile.on("pageerror", (e) => errors.push(e.message));
  await mobile.setViewport({ width: 390, height: 844, isMobile: true, hasTouch: true });
  await mobile.goto(BASE, { waitUntil: "networkidle2", timeout: 60000 });
  await sleep(1800);
  await mobile.screenshot({ path: join(OUT, "05-hero-mobile.png") });
  const h = await mobile.evaluate(() => ({
    overflowX: document.documentElement.scrollWidth > document.documentElement.clientWidth,
    mascotVisible: Boolean(document.querySelector('[aria-label*="MARK II mascot"]')),
  }));
  console.log("mobile:", JSON.stringify(h));

  console.log("page errors:", errors.length ? errors : "none");
} finally {
  await browser.close();
}
