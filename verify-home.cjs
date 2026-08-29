const { chromium } = require("playwright");
const OUT = "C:/Users/MICHCO~1/AppData/Local/Temp/claude/c--Users-MICH-CONCEPTION-KrestDevInternship2026-Krestholding-new/6147d8d0-ff09-47e3-9bdc-5ff723193ea2/scratchpad";

(async () => {
  const browser = await chromium.launch({
    executablePath: "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe",
    args: ["--no-sandbox"],
  });
  const errors = [];

  const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
  page.on("console", (m) => { if (m.type() === "error") errors.push(`[desktop] ${m.text()}`); });
  page.on("pageerror", (e) => errors.push(`[desktop pageerror] ${e.message}`));
  await page.goto("http://localhost:3000/", { waitUntil: "domcontentloaded" });
  await page.waitForSelector("text=Une courte phrase", { timeout: 30000 });
  await page.waitForTimeout(500);

  const shots = [
    ["home-01-hero.png", 0],
    ["home-02-poles.png", 0.10],
    ["home-03-process.png", 0.20],
    ["home-04-faq.png", 0.30],
    ["home-05-subsidiaries.png", 0.40],
    ["home-06-certifications.png", 0.48],
    ["home-07-news.png", 0.55],
    ["home-08-aboutintro.png", 0.65],
    ["home-09-testimonials.png", 0.75],
    ["home-10-contact.png", 0.85],
    ["home-11-newsletter-footer.png", 0.97],
  ];
  for (const [name, frac] of shots) {
    await page.evaluate((f) => window.scrollTo(0, document.body.scrollHeight * f), frac);
    await page.waitForTimeout(250);
    await page.screenshot({ path: `${OUT}/${name}` });
  }

  // toggle to light theme, re-shoot a few key spots
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(150);
  await page.click('button[aria-label="Passer au thème clair"]');
  await page.waitForTimeout(400);
  await page.screenshot({ path: `${OUT}/home-12-light-hero.png` });

  for (const [name, frac] of shots.slice(1)) {
    await page.evaluate((f) => window.scrollTo(0, document.body.scrollHeight * f), frac);
    await page.waitForTimeout(250);
    await page.screenshot({ path: `${OUT}/home-light-${name}` });
  }
  await page.close();

  // mobile viewport, fresh (dark default)
  const mpage = await browser.newPage({ viewport: { width: 390, height: 844 } });
  mpage.on("console", (m) => { if (m.type() === "error") errors.push(`[mobile] ${m.text()}`); });
  mpage.on("pageerror", (e) => errors.push(`[mobile pageerror] ${e.message}`));
  await mpage.goto("http://localhost:3000/", { waitUntil: "domcontentloaded" });
  await mpage.waitForSelector("text=Une courte phrase", { timeout: 30000 });
  await mpage.waitForTimeout(500);
  const mShots = [0, 0.15, 0.25, 0.35, 0.45, 0.55, 0.65, 0.75, 0.85, 0.95];
  for (let i = 0; i < mShots.length; i++) {
    await mpage.evaluate((f) => window.scrollTo(0, document.body.scrollHeight * f), mShots[i]);
    await mpage.waitForTimeout(250);
    await mpage.screenshot({ path: `${OUT}/home-mobile-${String(i).padStart(2, "0")}.png` });
  }
  await mpage.close();

  await browser.close();
  console.log("DONE");
  console.log("ERRORS:", JSON.stringify(errors, null, 2));
})().catch((e) => { console.error("FAILED", e); process.exit(1); });
