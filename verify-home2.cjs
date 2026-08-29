const { chromium } = require("playwright");
const OUT = "C:/Users/MICHCO~1/AppData/Local/Temp/claude/c--Users-MICH-CONCEPTION-KrestDevInternship2026-Krestholding-new/6147d8d0-ff09-47e3-9bdc-5ff723193ea2/scratchpad";

(async () => {
  const browser = await chromium.launch({
    executablePath: "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe",
    args: ["--no-sandbox"],
  });
  const errors = [];
  const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
  page.on("console", (m) => { if (m.type() === "error") errors.push(`[console] ${m.text()}`); });
  page.on("pageerror", (e) => errors.push(`[pageerror] ${e.message}\n${e.stack}`));
  page.on("response", (r) => { if (r.status() >= 400) errors.push(`[http ${r.status()}] ${r.url()}`); });

  await page.goto("http://localhost:3000/", { waitUntil: "domcontentloaded" });
  await page.waitForTimeout(8000);
  await page.screenshot({ path: `${OUT}/debug-01-after8s.png` });
  const bodyText = await page.evaluate(() => document.body.innerText.slice(0, 500));
  console.log("BODY TEXT SNIPPET:", bodyText);
  console.log("ERRORS SO FAR:", JSON.stringify(errors, null, 2));

  await page.waitForTimeout(10000);
  await page.screenshot({ path: `${OUT}/debug-02-after18s.png` });
  const bodyText2 = await page.evaluate(() => document.body.innerText.slice(0, 500));
  console.log("BODY TEXT SNIPPET 2:", bodyText2);
  console.log("ALL ERRORS:", JSON.stringify(errors, null, 2));

  await browser.close();
})().catch((e) => { console.error("FAILED", e); process.exit(1); });
