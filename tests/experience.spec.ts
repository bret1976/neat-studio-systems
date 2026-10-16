import { test, expect } from "@playwright/test";
import { mkdir } from "node:fs/promises";
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
});
test("opening draws the model, checks real assets, dismisses and only runs once", async ({
  page,
}, info) => {
  test.skip(
    !["desktop", "mobile", "webkit"].includes(info.project.name),
    "Opening sequence checked on three representative engines/sizes",
  );
  await page.goto("/");
  await expect(page.locator(".drawing-opening")).toBeVisible();
  await page.screenshot({
    path: `output/playwright/${info.project.name}/opening.png`,
  });
  await expect(page.locator(".drawing-opening")).toBeHidden({ timeout: 10000 });
  await expect(page.locator("html")).not.toHaveClass(/opening-active/);
  expect(
    await page.evaluate(() => sessionStorage.getItem("neat-opening-v2")),
  ).toBe("seen");
  await page.reload();
  await expect(page.locator(".drawing-opening")).toBeHidden();
});
test("workflow compares distinct geometry and requires actual human approval", async ({
  page,
}, info) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/how-it-works");
  const workflow = page.locator("#workflow");
  await workflow.getByRole("button", { name: "03 RESOLVE" }).click();
  const scene = workflow.locator(".review-scene");
  await expect(scene).toHaveAttribute("data-approved", "false");
  const current = await scene
    .locator(".proposal-geometry path")
    .nth(1)
    .getAttribute("d");
  await scene.getByRole("button", { name: "Review door swing" }).click();
  expect(
    await scene.locator(".proposal-geometry path").nth(1).getAttribute("d"),
  ).not.toBe(current);
  await scene.getByRole("button", { name: "APPROVE WORKFLOW DEMO" }).click();
  await expect(scene).toHaveAttribute("data-approved", "true");
  await workflow.getByRole("button", { name: "04 IMPROVE" }).click();
  await expect(scene.locator(".review-history")).toContainText(
    "Human approval recorded",
  );
  await page.screenshot({
    path: `output/playwright/${info.project.name}/workflow-approved.png`,
  });
  await scene.getByRole("button", { name: "RESET WORKFLOW" }).click();
  await expect(scene).toHaveAttribute("data-approved", "false");
  await workflow.getByRole("button", { name: "04 IMPROVE" }).click();
  await expect(scene.locator(".review-history")).toContainText(
    "Scrolling does not approve",
  );
});
test("Control exposes real project, criteria, assignment, revision and history views", async ({
  page,
}, info) => {
  await page.goto("/product/neat-control");
  const app = page.locator(".workspace");
  await app.getByRole("button", { name: "STANDARDS", exact: true }).click();
  await app.getByRole("checkbox").first().uncheck();
  await expect(app.locator(".standards-panel")).toContainText(
    "3 OF 4 CRITERIA ENABLED",
  );
  await app.getByRole("button", { name: "PROJECT", exact: true }).click();
  await expect(app.locator(".project-overview")).toContainText("3 enabled");
  await app.getByRole("button", { name: "TEAM", exact: true }).click();
  await app
    .getByLabel("Assign East corridor clearance")
    .selectOption("Engineer");
  await app.getByRole("button", { name: "OBSERVATIONS", exact: true }).click();
  await expect(app.locator(".issue-detail")).toContainText("Engineer");
  await app
    .getByRole("button", { name: "REQUEST REVISION", exact: false })
    .click();
  await expect(app.locator(".workspace-stats")).toContainText("05");
  await app.getByRole("button", { name: "HISTORY (1)" }).click();
  await expect(app.locator(".audit-history")).toContainText(
    "revision requested",
  );
  await page.screenshot({
    path: `output/playwright/${info.project.name}/control-history.png`,
  });
});
test("Assist modes, comparison geometry and explicit approval work", async ({
  page,
}) => {
  await page.goto("/product/neat-assist");
  const app = page.locator(".workspace");
  await app.getByRole("button", { name: "02 DESIGN OBSERVATIONS" }).click();
  await app.getByRole("button", { name: "02 Adjacent door swing" }).click();
  await expect(app.locator(".plan-overlay text").first()).toContainText("02");
  await app.getByRole("button", { name: "03 SUGGESTED ACTIONS" }).click();
  await expect(app.locator('[data-proposal="door"]')).toBeVisible();
  await app.getByRole("button", { name: "CURRENT", exact: true }).click();
  await expect(app.locator(".proposal-geometry")).toHaveCount(0);
  await app.getByRole("button", { name: "PROPOSED", exact: true }).click();
  await app.getByRole("button", { name: "04 APPROVAL CONTROL" }).click();
  await expect(app.locator(".approval-mode")).toContainText(
    "AWAITING EXPLICIT APPROVAL",
  );
  await app.getByRole("button", { name: "APPROVE SELECTED DEMO" }).click();
  await expect(app.locator(".approval-mode")).toContainText("APPROVED BY YOU");
});
test("designer sequence never grants approval through progression alone", async ({
  page,
}, info) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await page.locator("#philosophy > summary").click();
  const sequence = page.locator(".approval-story");
  await sequence.getByRole("button", { name: "04 Approval" }).click();
  await expect(sequence.locator(".approval-state")).toContainText(
    "does not authorize",
  );
  await sequence
    .getByRole("button", { name: "AUTHORIZE DEMONSTRATION" })
    .click();
  await expect(sequence.locator(".approval-state")).toContainText(
    "Human approval recorded",
  );
  await page.screenshot({
    path: `output/playwright/${info.project.name}/designer-approval.png`,
  });
  await sequence
    .getByRole("button", { name: "RESET APPROVAL SEQUENCE" })
    .click();
  await expect(
    sequence.getByRole("button", { name: "AUTHORIZE DEMONSTRATION" }),
  ).toBeDisabled();
});
test("mobile story scroll and responsive issue mapping remain aligned", async ({
  page,
}) => {
  await page.goto("/");
  await expect(page.locator(".drawing-opening")).toBeHidden();
  await page.waitForTimeout(1300);
  await page.setViewportSize({ width: 390, height: 844 });
  const workflow = page.locator("#workflow");
  for (const stage of [0, 2, 3, 0]) {
    await workflow
      .locator(`.journey-row-${stage}`)
      .evaluate((e) =>
        scrollTo(0, e.getBoundingClientRect().top + scrollY - 70),
      );
    await page.waitForTimeout(350);
    await expect(
      workflow.locator(".journey-progress a").nth(stage),
    ).toHaveAttribute("aria-current", "step");
  }
  for (const width of [1440, 375]) {
    await page.setViewportSize({ width, height: 900 });
    await page.evaluate(() => scrollTo(0, 0));
    const canvas = (await page.locator(".inspection-canvas").boundingBox())!;
    const marker = (await page
      .getByRole("button", { name: "Inspect GUARDRAIL REVIEW", exact: true })
      .boundingBox())!;
    expect((marker.x - canvas.x) / canvas.width).toBeCloseTo(0.574, 2);
  }
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
});
