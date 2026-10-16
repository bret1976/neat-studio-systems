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
test("homepage uses compact product studies with a working local preview", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  const product = page.locator("#neat-assist");
  await expect(product.locator(".workspace")).toHaveCount(0);
  await expect(product.locator(".product-preview")).toHaveCount(1);
  const preview = product.locator(".product-preview");
  await preview
    .getByRole("button", { name: "APPROVE DEMONSTRATION", exact: false })
    .click();
  await expect(preview).toContainText("DEMO DECISION RECORDED");
  await expect(preview.locator(".proposal-geometry")).toHaveAttribute(
    "data-applied",
    "true",
  );
  await preview
    .getByRole("button", { name: "RESET DEMONSTRATION", exact: false })
    .click();
  await expect(preview.locator(".proposal-geometry")).toHaveCount(0);
  if (page.viewportSize()!.width > 760) {
    expect((await product.boundingBox())!.height).toBeLessThan(850);
    const h = (await product.locator("h2").boundingBox())!;
    const visual = (await preview.boundingBox())!;
    expect(visual.x).toBeGreaterThan(h.x + h.width - 5);
  }
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
});
test("four workflow drawings move vertically and approval persists to the final panel", async ({
  page,
}, info) => {
  await page.goto("/");
  await expect(page.locator(".drawing-opening")).toBeHidden();
  const rows = page.locator(".journey-row");
  await expect(rows).toHaveCount(4);
  const initial = await rows.nth(1).boundingBox();
  await page.evaluate(() => scrollBy(0, 220));
  const moved = await rows.nth(1).boundingBox();
  expect(initial!.y - moved!.y).toBeGreaterThan(180);
  const resolve = rows.nth(2);
  await resolve.getByRole("button", { name: "Review door swing" }).click();
  await expect(resolve.locator(".proposal-geometry")).toHaveAttribute(
    "data-proposal",
    "door",
  );
  await expect(resolve.locator(".review-scene")).toHaveAttribute(
    "data-approved",
    "false",
  );
  await resolve
    .getByRole("button", { name: "APPROVE WORKFLOW DEMO", exact: false })
    .click();
  await expect(rows.nth(3).locator(".review-history")).toContainText(
    "Human approval recorded",
  );
  await rows
    .nth(3)
    .getByRole("button", { name: "RESET WORKFLOW", exact: false })
    .click();
  await expect(resolve.locator(".review-scene")).toHaveAttribute(
    "data-approved",
    "false",
  );
  await resolve.scrollIntoViewIfNeeded();
  await page.screenshot({
    path: `output/playwright/${info.project.name}/journey-resolve.png`,
  });
});
test("tower shading reverses with scroll and software carousel has real overflow", async ({
  page,
}) => {
  await page.goto("/");
  await expect(page.locator(".drawing-opening")).toBeHidden();
  const tower = page.locator(".tower-study");
  const range = await tower.evaluate((e) => ({
    top: e.getBoundingClientRect().top + scrollY,
    height: e.clientHeight,
  }));
  const clips = [];
  for (const y of [
    range.top - page.viewportSize()!.height * 0.4,
    range.top + range.height * 0.65,
    0,
  ]) {
    await page.evaluate((y) => scrollTo(0, y), Math.max(0, y));
    await page.waitForTimeout(400);
    clips.push(
      await tower
        .locator(".tower-shaded")
        .evaluate((e) => getComputedStyle(e).clipPath),
    );
  }
  expect(clips[1]).not.toBe(clips[2]);
  const track = page.locator(".software-carousel-track");
  await page.getByRole("button", { name: "Next software interests" }).click();
  await expect
    .poll(() => track.evaluate((e) => e.scrollLeft))
    .toBeGreaterThan(20);
  await page
    .getByRole("button", { name: "Previous software interests" })
    .click();
  await expect.poll(() => track.evaluate((e) => e.scrollLeft)).toBeLessThan(5);
});
