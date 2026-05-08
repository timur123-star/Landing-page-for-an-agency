import { expect, test } from "@playwright/test";

test.describe("NOVA Agency landing — smoke", () => {
  test("home renders hero and primary CTA", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveTitle(/NOVA/i);
    await expect(
      page.getByRole("heading", { level: 1 }).first(),
    ).toBeVisible();
    await expect(
      page
        .getByRole("link", { name: /заявк|start a project|iniciar/i })
        .first(),
    ).toBeVisible();
  });

  test("renders the English locale at /en", async ({ page }) => {
    await page.goto("/en");
    await expect(page.locator("html")).toHaveAttribute("lang", "en");
    await expect(
      page.getByRole("heading", { level: 1 }).first(),
    ).toBeVisible();
  });

  test("renders the default Russian locale at /", async ({ context, page }) => {
    // The middleware reads NEXT_LOCALE for locale detection, so we use a
    // fresh browser context to make sure we land on the actual default.
    await context.clearCookies();
    await page.goto("/");
    await expect(page.locator("html")).toHaveAttribute("lang", "ru");
    await expect(
      page.getByRole("heading", { level: 1 }).first(),
    ).toBeVisible();
  });

  test("contact API accepts a valid payload", async ({ request }) => {
    const response = await request.post("/api/contact", {
      data: {
        name: "Smoke Test",
        email: "smoke@example.com",
        company: "QA",
        budget: "$10k–$25k",
        message:
          "End-to-end smoke test message — long enough to satisfy the schema.",
      },
    });
    expect(response.status()).toBe(200);
    const body = (await response.json()) as { ok: boolean };
    expect(body.ok).toBe(true);
  });

  test("/work and /journal index pages render", async ({ page }) => {
    await page.goto("/work");
    await expect(
      page.getByRole("heading", { level: 1 }).first(),
    ).toBeVisible();

    await page.goto("/journal");
    await expect(
      page.getByRole("heading", { level: 1 }).first(),
    ).toBeVisible();
  });
});
