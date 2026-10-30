const { test, expect } = require("@playwright/test");

test("native validator preserves legacy behavior and cleans accessible errors", async ({
  page,
}) => {
  const errors = [];
  const requests = [];
  page.on("pageerror", (error) => errors.push(error.message));
  page.on("console", (message) => {
    if (message.type() === "error") errors.push(message.text());
  });
  page.on("response", (response) => {
    if (response.status() >= 400)
      errors.push(`${response.status()} ${response.url()}`);
  });
  page.on("request", (request) => requests.push(request.url()));
  await page.goto("/");
  const submit = page.getByRole("button", { name: "Send feedback" });
  await submit.click();
  await expect(page.locator(".error")).toHaveCount(2);
  await expect(page.locator("#name")).toHaveAttribute("aria-invalid", "true");
  await expect(page.locator("#email")).toHaveAttribute(
    "aria-describedby",
    "email-hint email-error",
  );
  await submit.click();
  await expect(page.locator(".error")).toHaveCount(2);

  await page.locator("#name").fill("  Zia  ");
  await page.locator("#email").fill("invalid");
  await submit.click();
  await expect(page.locator(".error")).toHaveCount(1);
  await expect(page.locator("#name")).not.toHaveAttribute("aria-invalid");
  await page.locator("#email").fill("zia@example.com");
  await submit.click();
  await expect(page.locator("#status")).toHaveText(
    "Thanks, Zia! Your feedback was received.",
  );
  await expect(page.locator("#name")).toHaveValue("");
  await expect(page.locator("#email")).toHaveValue("");
  await expect(page.locator(".error")).toHaveCount(0);
  await expect(page.locator("#email")).toHaveAttribute(
    "aria-describedby",
    "email-hint",
  );

  // The maintenance exercise intentionally accepts any address containing @.
  await page.locator("#name").fill('<img src=x onerror="alert(1)">');
  await page.locator("#email").fill("@");
  await submit.click();
  await expect(page.locator("#status")).toContainText(
    '<img src=x onerror="alert(1)">',
  );
  await expect(page.locator("#status img")).toHaveCount(0);
  expect(requests.some((url) => /jquery|legacy-feedback/.test(url))).toBe(
    false,
  );
  expect(errors).toEqual([]);
});

test("keyboard books and cancels slots with delegated clicks and stable counts", async ({
  page,
}) => {
  await page.goto("/");
  await page.keyboard.press("Tab");
  await expect(
    page.getByRole("link", { name: "Skip to main content" }),
  ).toBeFocused();
  await page.keyboard.press("Tab");
  await page.keyboard.press("Tab");
  await page.keyboard.press("Tab");
  const monday = page.getByRole("button", { name: "Book Monday office hours" });
  await expect(monday).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(page.locator("#status")).toHaveText("Updating Monday…");
  await expect(monday).toBeDisabled();
  await expect(page.locator("#status")).toContainText(
    "Booking #1 confirmed: Monday 10:00–11:00, Room 214. 1 of 2 slots booked.",
  );
  await expect(monday).toHaveAttribute("aria-pressed", "true");
  await monday.focus();
  await page.keyboard.press("Space");
  await expect(page.locator("#status")).toHaveText(
    "Booking for Monday cancelled. 0 of 2 slots booked.",
  );
  const wednesday = page.getByRole("button", {
    name: "Book Wednesday office hours",
  });
  await wednesday.locator("span").click();
  await expect(page.locator("#status")).toContainText(
    "Booking #2 confirmed: Wednesday",
  );
  await expect(page.locator("#schedule tr.selected")).toHaveCount(1);
});

for (const mode of ["light", "dark"]) {
  test(`${mode} mode renders errors without horizontal overflow on mobile`, async ({
    page,
  }) => {
    await page.emulateMedia({ colorScheme: mode });
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/");
    await page.getByRole("button", { name: "Send feedback" }).click();
    await expect(page.getByRole("alert")).toHaveCount(2);
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= window.innerWidth,
      ),
    ).toBe(true);
  });
}
