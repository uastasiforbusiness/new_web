import { expect, test } from "@playwright/test"
import AxeBuilder from "@axe-core/playwright"

test("homepage renders and produces a screenshot", async ({ page }) => {
  await page.goto("/")
  await expect(page.locator("body")).toBeVisible()
  // Let entrance animations settle before capturing.
  await page.waitForTimeout(2000)
  await page.screenshot({ path: "screenshots/home.png", fullPage: true })
})

test("homepage has no serious accessibility violations", async ({ page }) => {
  await page.goto("/")
  const results = await new AxeBuilder({ page }).analyze()
  const serious = results.violations.filter(
    (violation) => violation.impact === "critical" || violation.impact === "serious"
  )
  expect(
    serious,
    serious.map((violation) => `${violation.id}: ${violation.help}`).join("\n")
  ).toEqual([])
})
