import { test, expect } from "@playwright/test";
test.beforeEach(async ({ page }) => {
  const token = process.env.VERCEL_OIDC_TOKEN;
  if (token) {
    const origin = new URL(process.env.BASE_URL!).origin;
    await page.route("**/*", (r) =>
      new URL(r.request().url()).origin === origin
        ? r.continue({
            headers: {
              ...r.request().headers(),
              "x-vercel-trusted-oidc-idp-token": token,
            },
          })
        : r.continue(),
    );
  }
});
test("wall fragments converge, fill and reverse before plan detail appears", async ({
  page,
}) => {
  await page.goto("/");
  await expect(page.locator(".drawing-opening")).toBeHidden();
  const context = page.locator("#context");
  const range = await context.evaluate((e) => ({
    top: e.getBoundingClientRect().top + scrollY,
    distance: e.clientHeight - innerHeight,
  }));
  const states = [];
  for (const progress of [0.32, 0.56, 0.82, 0.32]) {
    await page.evaluate(
      ({ top, distance, progress }) => scrollTo(0, top + distance * progress),
      { ...range, progress },
    );
    await page.waitForTimeout(400);
    states.push(
      await context.evaluate((e) => ({
        transform: getComputedStyle(e.querySelector(".assembly-piece")!)
          .transform,
        interior: Number(
          getComputedStyle(e.querySelector(".wall-interior")!).opacity,
        ),
        details: Number(
          getComputedStyle(e.querySelector(".assembling-plan > .drawing")!)
            .opacity,
        ),
      })),
    );
  }
  expect(states[0].transform).not.toBe(states[1].transform);
  expect(states[0].interior).toBeGreaterThan(states[1].interior);
  expect(states[2].details).toBeGreaterThan(0.8);
  expect(states[3].transform).toBe(states[0].transform);
  await context
    .locator(".layer-controls")
    .getByRole("button", { name: "DECISIONS", exact: false })
    .click();
  await expect(context.locator(".context-note")).toContainText(
    "Keep observations",
  );
});
test("hover redraw, compact optional studies and original closing reveal work", async ({
  page,
}, info) => {
  await page.goto("/");
  await expect(page.locator(".drawing-opening")).toBeHidden();
  await expect(page.locator(".extended-study[open]")).toHaveCount(0);
  const card = page.locator(".problem-grid article").first();
  await card.hover();
  const line = card.locator(".problem-object path").first();
  await expect
    .poll(() =>
      line.evaluate((e) => parseFloat(getComputedStyle(e).strokeDashoffset)),
    )
    .toBeLessThan(0.05);
  const closing = page.locator(".final-cta .closing-study");
  await closing.locator("summary").click();
  const slider = closing.getByRole("slider");
  await slider.fill("80");
  await expect(closing.locator(".closing-ink-front")).toHaveAttribute(
    "height",
    "1120",
  );
  await slider.fill("0");
  await expect(closing.locator(".closing-ink-front")).toHaveAttribute(
    "height",
    "0",
  );
  await page
    .locator("#solutions")
    .evaluate((e) => scrollTo(0, e.getBoundingClientRect().top + scrollY));
  await page.screenshot({
    path: `output/playwright/${info.project.name}/oct16-audience.png`,
  });
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
});
