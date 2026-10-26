import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";
import { routes, viewports } from "./routes";

const shotDir = process.env.QA_SHOTS || "qa-screenshots";

for (const vp of viewports) {
  test.describe(`${vp.name} ${vp.width}px`, () => {
    test.use({ viewport: { width: vp.width, height: vp.height } });

    for (const route of routes) {
      test(`renders ${route}`, async ({ page }) => {
        const errors: string[] = [];
        page.on("pageerror", (e) => errors.push(e.message));
        page.on("console", (m) => m.type() === "error" && errors.push(m.text()));

        const res = await page.goto(route, { waitUntil: "networkidle" });
        expect(res?.status()).toBe(200);
        await expect(page.locator("h1")).toHaveCount(1);

        // No horizontal page scroll.
        const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
        expect(overflow, "horizontal overflow (px)").toBeLessThanOrEqual(0);

        const name = route === "/" ? "home" : route.slice(1).replace(/\//g, "__");
        await page.screenshot({ path: `${shotDir}/${vp.name}/${name}.png`, fullPage: true });
        expect(errors, "console errors").toEqual([]);
      });
    }
  });
}

test.describe("accessibility (axe, WCAG 2 A/AA)", () => {
  for (const route of routes) {
    test(`axe ${route}`, async ({ page }) => {
      await page.goto(route, { waitUntil: "networkidle" });
      const results = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"]).analyze();
      const summary = results.violations.map(
        (v) => `${v.id} (${v.impact}): ${v.nodes.length} node(s), e.g. ${v.nodes[0]?.target.join(" ")}`,
      );
      expect(summary).toEqual([]);
    });
  }
});

test("no dead internal links", async ({ page, request }) => {
  const seen = new Set<string>();
  for (const route of routes) {
    await page.goto(route);
    const hrefs = await page.$$eval("a[href]", (as) => as.map((a) => (a as HTMLAnchorElement).getAttribute("href")!));
    for (const h of hrefs) if (h.startsWith("/")) seen.add(h.split("#")[0].split("?")[0] || "/");
  }
  const bad: string[] = [];
  for (const href of seen) {
    const r = await request.get(href);
    if (r.status() !== 200) bad.push(`${href} → ${r.status()}`);
  }
  expect(bad).toEqual([]);
});

test("unknown route shows custom 404", async ({ page }) => {
  const res = await page.goto("/does-not-exist");
  expect(res?.status()).toBe(404);
  await expect(page.getByRole("heading", { level: 1 })).toContainText("signal");
});

test("mega-menu is keyboard operable", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/");
  const trigger = page.getByRole("button", { name: "Product" });
  await trigger.focus();
  await page.keyboard.press("Enter");
  await expect(trigger).toHaveAttribute("aria-expanded", "true");
  await expect(page.getByRole("link", { name: "Plant Data Historian" }).first()).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(trigger).toHaveAttribute("aria-expanded", "false");
  await expect(trigger).toBeFocused();
});

test("gap tabs switch with arrow keys", async ({ page }) => {
  await page.goto("/");
  const gap = page.locator("#gap");
  await gap.getByRole("tab", { name: /Performance/ }).focus();
  await page.keyboard.press("ArrowRight");
  await expect(gap.getByRole("tab", { name: /Maintenance/ })).toHaveAttribute("aria-selected", "true");
});

test("plant map switches areas and links to area pages", async ({ page }) => {
  await page.goto("/industries/cement");
  await page.getByRole("tab", { name: /Packing/ }).click();
  const panel = page.getByRole("tabpanel");
  await expect(panel.getByRole("heading", { name: "Packing & Dispatch" })).toBeVisible();
  await panel.getByRole("link", { name: /Packing & Dispatch/ }).click();
  await expect(page).toHaveURL(/\/industries\/cement\/packing-dispatch$/);
});

test("demo form validates, then submits", async ({ page }) => {
  await page.goto("/contact");
  await page.getByRole("button", { name: "Request a Demo" }).last().click();
  await expect(page.getByText("Please enter your name.")).toBeVisible();

  await page.getByLabel("Full name").fill("Test Engineer");
  await page.getByLabel("Work email").fill("test@example.com");
  await page.getByLabel("Company").fill("Example Cement");
  await page.getByLabel("Role").selectOption("Plant Head");
  await page.getByRole("combobox", { name: /^Industry/ }).selectOption("Steel");
  await page.getByLabel("Region").selectOption("India");
  await page.locator("#main").getByText("Predictive Failure AI").click();
  await page.getByRole("checkbox", { name: /agree/ }).check();
  await page.waitForTimeout(2600); // stay above the bot-timing threshold
  await page.getByRole("button", { name: "Request a Demo" }).last().click();
  await expect(page.getByRole("status")).toContainText("Thanks");
});

test("api rejects invalid payloads and swallows honeypot", async ({ request }) => {
  const bad = await request.post("/api/lead", { data: { kind: "demo", name: "x" } });
  expect(bad.status()).toBe(422);
  const bot = await request.post("/api/lead", { data: { kind: "demo", website: "spam.example" } });
  expect(bot.status()).toBe(200);
});

test("mobile drawer opens with accordion navigation", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  await page.getByRole("button", { name: "Open menu" }).click();
  const dialog = page.getByRole("dialog");
  await expect(dialog).toBeVisible();
  await dialog.getByRole("button", { name: "Product" }).click();
  await dialog.getByRole("link", { name: "Plant Data Historian" }).click();
  await expect(page).toHaveURL(/\/product\/historian$/);
  await expect(dialog).toBeHidden();
});

test("demo click-through reaches the root-cause view", async ({ page }) => {
  await page.goto("/demo");
  await page.getByRole("button", { name: "Open the alert" }).click();
  await expect(page.getByRole("heading", { name: /explainable alert/ })).toBeVisible();
  await page.getByRole("button", { name: "Assign check to field engineer" }).click();
  await page.getByRole("button", { name: "Next" }).click();
  await page.getByRole("button", { name: "Save log" }).click();
  await expect(page.getByRole("status").filter({ hasText: "Logged and linked" })).toBeVisible();
  await page.getByRole("button", { name: "View root cause" }).click();
  await expect(page.getByText("Caught before a stop")).toBeVisible();
});

test("roi calculator recalculates and labels results as estimates", async ({ page }) => {
  await page.goto("/roi");
  await expect(page.getByText("Estimate", { exact: true })).toBeVisible();
  const total = page.getByText(/^\$[\d,.]+[MK]? – \$[\d,.]+[MK]?$/).first();
  const before = await total.textContent();
  await page.getByLabel("Annual clinker production").fill("3000000");
  await expect(total).not.toHaveText(before ?? "");
  await page.getByLabel("Annual clinker production").fill("abc");
  await expect(page.getByText("Enter a number of zero or more.").first()).toBeVisible();
});

test("security headers are set", async ({ request }) => {
  const res = await request.get("/");
  const h = res.headers();
  expect(h["content-security-policy"]).toContain("frame-ancestors 'none'");
  expect(h["x-frame-options"]).toBe("DENY");
  expect(h["x-content-type-options"]).toBe("nosniff");
  expect(h["strict-transport-security"]).toContain("max-age=");
});

test("lead api guards content type, origin and size", async ({ request }) => {
  expect((await request.post("/api/lead", { headers: { "content-type": "text/plain" }, data: "x" })).status()).toBe(415);
  expect((await request.post("/api/lead", { headers: { origin: "https://evil.example" }, data: {} })).status()).toBe(403);
  expect((await request.post("/api/lead", { data: { pad: "x".repeat(20_000) } })).status()).toBe(413);
});

test("draft case study is not published", async ({ request }) => {
  expect((await request.get("/resources/nagarjuna-pilot")).status()).toBe(404);
  expect(await (await request.get("/sitemap.xml")).text()).not.toContain("nagarjuna");
});
