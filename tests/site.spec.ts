import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { mkdir } from "node:fs/promises";
import { pages } from "../src/content/pages";
const authHeaders: Record<string, string> = process.env.VERCEL_OIDC_TOKEN
  ? { "x-vercel-trusted-oidc-idp-token": process.env.VERCEL_OIDC_TOKEN }
  : {};
const errors: string[] = [];
test.beforeEach(async ({ page }, info) => {
  await mkdir(`output/playwright/${info.project.name}`, { recursive: true });
  const token = process.env.VERCEL_OIDC_TOKEN;
  if (token) {
    const origin = new URL(process.env.BASE_URL!).origin;
    await page.route("**/*", (route) =>
      new URL(route.request().url()).origin === origin
        ? route.continue({
            headers: {
              ...route.request().headers(),
              "x-vercel-trusted-oidc-idp-token": token,
            },
          })
        : route.continue(),
    );
  }
  errors.length = 0;
  page.on("pageerror", (e) => errors.push(e.message));
});
test("hero selection tracks geometry, persists discoveries, resets and supports keyboard", async ({
  page,
}, info) => {
  await page.goto("/");
  await expect(page.locator(".drawing-opening")).toBeHidden();
  await page.waitForTimeout(1600);
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "YOUR DESIGN DESERVESA SECOND SET OF EYES.",
  );
  const canvas = page.locator(".inspection-canvas");
  const r = (await canvas.boundingBox())!;
  if (info.project.use.hasTouch) {
    await canvas.dispatchEvent("pointerdown", {
      pointerId: 1,
      pointerType: "touch",
      clientX: r.x + r.width * 0.18,
      clientY: r.y + r.height * 0.75,
      button: 0,
    });
    await canvas.dispatchEvent("pointermove", {
      pointerId: 1,
      pointerType: "touch",
      clientX: r.x + r.width * 0.38,
      clientY: r.y + r.height * 0.87,
      button: 0,
    });
    await expect(page.getByTestId("selection")).toBeVisible();
    await canvas.dispatchEvent("pointerup", {
      pointerId: 1,
      pointerType: "touch",
      button: 0,
    });
  } else {
    await page.mouse.move(r.x + r.width * 0.18, r.y + r.height * 0.75);
    await page.mouse.down();
    await page.mouse.move(r.x + r.width * 0.38, r.y + r.height * 0.87, {
      steps: 8,
    });
    const box = await page.getByTestId("selection").boundingBox();
    expect(box!.width / r.width).toBeCloseTo(0.2, 1);
    await page.mouse.up();
  }
  await expect(page.getByTestId("discovery-count")).toHaveText("1 / 04");
  await expect(page.locator(".observation-detail")).toContainText(
    "STAIR GEOMETRY REVIEW",
  );
  await page
    .getByRole("button", { name: "Inspect GUARDRAIL REVIEW", exact: true })
    .focus();
  await page.keyboard.press("Enter");
  await expect(page.getByTestId("discovery-count")).toHaveText("2 / 04");
  await expect(page.locator(".observation-detail")).toContainText(
    "Potential guardrail-height concern",
  );
  await page.getByRole("button", { name: "INSPECT AGAIN" }).click();
  await expect(page.getByTestId("discovery-count")).toHaveText("0 / 04");
  expect(errors).toEqual([]);
  await mkdir(`output/playwright/${info.project.name}`, { recursive: true });
  await page.evaluate(() => scrollTo(0, 0));
  await page.screenshot({
    path: `output/playwright/${info.project.name}/hero.png`,
  });
});
test("layer and workflow progression forward and reverse; ink mask is scroll-driven", async ({
  page,
}, info) => {
  await page.goto("/");
  await expect(page.locator(".drawing-opening")).toBeHidden();
  await page.waitForTimeout(1000);
  if ((page.viewportSize()?.width || 0) > 760) {
    const section = page.locator("#workflow");
    const data = await section.evaluate((e) => ({
      top: e.getBoundingClientRect().top + scrollY,
      height: e.getBoundingClientRect().height,
      view: innerHeight,
    }));
    for (const progress of [0.1, 0.35, 0.6, 0.87, 0.1]) {
      await page.evaluate(
        ({ top, height, view, progress }) =>
          window.scrollTo(0, top + (height - view) * progress),
        { ...data, progress },
      );
      await page.waitForTimeout(350);
      await expect(section.locator(".story-sticky")).toHaveAttribute(
        "data-phase",
        String(Math.min(3, Math.floor(progress * 4))),
      );
    }
    await page.screenshot({
      path: `output/playwright/${info.project.name}/workflow.png`,
    });
  } else {
    await page
      .getByRole("button", { name: "03 RESOLVE", exact: false })
      .click();
    await expect(page.locator(".phase-caption")).toContainText(
      "MAKE THE RIGHT CHANGE.",
    );
    await page
      .getByRole("button", { name: "01 INSPECT", exact: false })
      .click();
    await expect(page.locator(".phase-caption")).toContainText(
      "SEE THE MODEL CLEARLY.",
    );
  }
  await page.getByRole("button", { name: "DECISIONS", exact: false }).click();
  await expect(page.locator(".context-note")).toContainText(
    "Keep observations",
  );
  const ink = page.locator("#drawing-to-design .ink-transformation");
  const range = ink.getByRole("slider");
  await range.fill("80");
  expect(Number(await ink.locator("mask circle").getAttribute("r"))).toBe(960);
  await range.fill("10");
  expect(Number(await ink.locator("mask circle").getAttribute("r"))).toBe(120);
  await page.locator("footer").scrollIntoViewIfNeeded();
  await page.waitForTimeout(300);
  await expect(page.locator(".footer")).toBeVisible();
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
  expect(errors).toEqual([]);
});
test("Assist alternatives and Control observation approval update context and history", async ({
  page,
}) => {
  await page.goto("/product/neat-assist");
  const assist = page.locator(".workspace");
  await assist.getByRole("button", { name: "SHOW ME THE OPTIONS" }).click();
  await expect(assist).toContainText(
    "I've prepared two conceptual alternatives",
  );
  await assist.getByRole("button", { name: "Review door swing" }).click();
  await assist.getByRole("button", { name: "APPROVE SELECTED DEMO" }).click();
  await expect(
    assist.getByRole("button", { name: "DEMO CHANGE APPROVED" }),
  ).toBeDisabled();
  await assist.getByRole("button", { name: "RESET DEMONSTRATION" }).click();
  await expect(
    assist.getByRole("button", { name: "SHOW ME THE OPTIONS" }),
  ).toBeVisible();
  await page.goto("/product/neat-control");
  const control = page.locator(".workspace");
  await control.getByRole("button", { name: "OBSERVATIONS", exact: true }).click();
  await control.getByRole("button", { name: "02 Adjacent door swing" }).click();
  await expect(control.locator(".issue-detail h4")).toHaveText(
    "Adjacent door swing",
  );
  await control.getByRole("button", { name: "APPROVE DEMONSTRATION" }).click();
  await expect(control.locator(".workspace-stats")).toContainText("07");
  await control.getByRole("button", { name: "HISTORY (1)" }).click();
  await expect(control.locator(".audit-history")).toContainText(
    "Adjacent door swing — demonstration approval recorded.",
  );
  expect(errors).toEqual([]);
});
test("navigation, routes, assets, inquiry errors and accessibility", async ({
  page,
  request,
}, info) => {
  test.skip(
    !["desktop", "mobile"].includes(info.project.name),
    "Route and API checks are shared across viewports",
  );
  await page.goto("/");
  await expect(page.locator(".drawing-opening")).toBeHidden();
  if (info.project.name === "mobile")
    await page.getByRole("button", { name: "MENU +", exact: true }).click();
  await page
    .locator("header")
    .getByRole("button", { name: "Product", exact: false })
    .click();
  await expect(page.locator("#nav-Product")).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(page.locator("#nav-Product")).toBeHidden();
  for (const route of Object.keys(pages)) {
    const r = await request.get("/" + route, {
      headers: authHeaders,
      maxRedirects: 0,
    });
    expect(r.status(), route).toBe(200);
    expect(await r.text()).toContain("NEAT");
  }
  for (const path of [
    "/drawings/elevation.svg",
    "/drawings/plan.svg",
    "/images/north-court-render.webp",
    "/images/north-court-sketch.webp",
    "/robots.txt",
    "/sitemap.xml",
    "/opengraph-image",
  ])
    expect(
      (
        await request.get(path, { headers: authHeaders, maxRedirects: 0 })
      ).status(),
      path,
    ).toBe(200);
  const valid = {
    name: "Browser Test",
    email: "test@example.com",
    company: "Design study",
    role: "Architect",
    software: "Revit",
    teamSize: "1–5",
    challenge: "Review workflow",
    message: "A demonstration inquiry for testing.",
  };
  expect((await request.post("/api/inquiries", { data: {}, headers: authHeaders, maxRedirects: 0 })).status()).toBe(
    400,
  );
  expect(
    (
      await request.post("/api/inquiries", {
        data: { ...valid, website: "spam" },
        headers: authHeaders,
        maxRedirects: 0,
      })
    ).status(),
  ).toBe(400);
  expect((await request.post("/api/inquiries", { data: valid, headers: authHeaders, maxRedirects: 0 })).status()).toBe(
    503,
  );
  await page.goto("/contact");
  await expect(
    page.getByRole("button", { name: "REQUEST A DEMO" }),
  ).toBeDisabled();
  expect(
    (
      await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
        .analyze()
    ).violations,
  ).toEqual([]);
  expect(errors).toEqual([]);
});
test("reduced motion exposes stories with working controls and no overflow", async ({
  page,
}, info) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await expect(page.locator(".drawing-opening")).toBeHidden();
  await page.getByRole("button", { name: "04 IMPROVE", exact: false }).click();
  await expect(page.locator(".phase-caption")).toContainText(
    "BUILD ON WHAT YOU LEARN.",
  );
  await expect(page.locator(".story-sticky").first()).toHaveCSS(
    "position",
    "relative",
  );
  expect(
    (
      await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
        .analyze()
    ).violations,
  ).toEqual([]);
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
  await page.screenshot({
    path: `output/playwright/${info.project.name}/reduced-full.png`,
    fullPage: true,
  });
});
