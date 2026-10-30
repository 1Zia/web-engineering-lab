import assert from "node:assert/strict";
import { mkdir, writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import { pathToFileURL } from "node:url";
import puppeteer from "puppeteer-core";
import { startFlow } from "lighthouse";

const browser = await puppeteer.launch({
  executablePath:
    process.env.CHROME_PATH ||
    "C:/Program Files/Google/Chrome/Application/chrome.exe",
  headless: true,
});

try {
  await mkdir("docs/evidence", { recursive: true });
  await mkdir("docs/screenshots", { recursive: true });
  const summary = [];
  for (const mode of ["light", "dark"]) {
    const page = await browser.newPage();
    await page.setViewport({ width: 1280, height: 1000 });
    await page.emulateMediaFeatures([
      { name: "prefers-color-scheme", value: mode },
    ]);
    const requests = [];
    const errors = [];
    page.on("request", (request) => requests.push(request.url()));
    page.on("pageerror", (error) => errors.push(error.message));
    page.on("console", (message) => {
      if (message.type() === "error") errors.push(message.text());
    });
    page.on("response", (response) => {
      if (response.status() >= 400)
        errors.push(`${response.status()} ${response.url()}`);
    });
    await page.goto("http://localhost:3000", { waitUntil: "networkidle0" });
    const flow = await startFlow(page, {
      name: `Lab 05 accessibility in ${mode} mode`,
      config: {
        extends: "lighthouse:default",
        settings: {
          onlyCategories: ["accessibility"],
          formFactor: "desktop",
          screenEmulation: { disabled: true },
        },
      },
    });
    await flow.snapshot({ name: "Initial page" });
    await page.click('button[type="submit"]');
    await page.waitForSelector("#email-error");
    await flow.snapshot({ name: "Empty form with validation errors" });
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.screenshot({
      path: `docs/screenshots/Lab-05-Errors-${mode}.png`,
      fullPage: true,
    });

    const result = await flow.createFlowResult();
    const scores = result.steps.map((step) => ({
      name: step.name,
      score: step.lhr.categories.accessibility.score * 100,
      failures: Object.values(step.lhr.audits)
        .filter((audit) => audit.score === 0)
        .map((audit) => ({
          id: audit.id,
          title: audit.title,
          details: audit.details,
        })),
    }));
    await writeFile(
      `docs/evidence/Lab-05-Lighthouse-${mode}.html`,
      await flow.generateReport(),
    );
    await writeFile(
      `docs/evidence/Lab-05-Lighthouse-${mode}.json`,
      JSON.stringify(result, null, 2),
    );
    const reportPage = await browser.newPage();
    await reportPage.setViewport({ width: 1400, height: 1000 });
    await reportPage.goto(
      pathToFileURL(resolve(`docs/evidence/Lab-05-Lighthouse-${mode}.html`))
        .href,
    );
    await reportPage.evaluate(() => {
      const links = [...document.querySelectorAll("a")];
      links
        .findLast(
          (link) =>
            link.textContent.trim() === "Empty form with validation errors",
        )
        ?.click();
    });
    await reportPage.screenshot({
      path: `docs/screenshots/Lab-05-Lighthouse-${mode}.png`,
    });
    await reportPage.close();
    summary.push({
      mode,
      scores,
      requests: [...new Set(requests)].filter((url) =>
        url.startsWith("http://localhost"),
      ),
      runtimeErrors: errors,
    });
    console.log(JSON.stringify({ mode, scores }));
    assert(
      scores.every((entry) => entry.score === 100),
      `${mode} accessibility must be 100`,
    );
    assert(
      !requests.some((url) => /jquery|legacy-feedback/.test(url)),
      "No jQuery requests should remain",
    );
    assert.equal(errors.length, 0, "No JavaScript runtime errors");
    await page.close();
  }
  await writeFile(
    "docs/evidence/Lab-05-Accessibility-Summary.json",
    JSON.stringify(summary, null, 2),
  );
} finally {
  await browser.close();
}
