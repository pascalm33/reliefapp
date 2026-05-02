import { expect, test } from "@playwright/test";

test("visitor can access public pages", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("link", { name: /Stress Relief|Accueil Stress Relief/ })).toBeVisible();

  await page.goto("/pricing");
  await expect(page.getByRole("heading", { name: "Choisis l’offre adaptée à ton usage" })).toBeVisible();

  await page.goto("/how-it-works");
  await expect(page.getByRole("heading", { name: "Comment fonctionne Stress Relief" })).toBeVisible();
});

test("protected app redirects anonymous visitors to login", async ({ page }) => {
  await page.goto("/app/dashboard");
  await expect(page).toHaveURL(/\/login\?redirectTo=%2Fapp%2Fdashboard/);
});

test("login page shows auth error when Supabase config is missing", async ({ page }) => {
  await page.goto("/login");
  await page.getByLabel("Adresse e-mail").fill("fake@example.com");
  await page.getByLabel("Mot de passe").fill("wrong-password");
  await page.getByRole("button", { name: "S’identifier" }).click();
  await expect(page.getByText(/configuration Supabase publique est manquante|Impossible de t’identifier/)).toBeVisible();
});

test("cookie consent can be accepted and is persisted", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { name: "Gestion des cookies" })).toBeVisible();
  await page.getByRole("button", { name: "Refuser les cookies non essentiels" }).click();
  await page.reload();
  await expect(page.getByRole("heading", { name: "Gestion des cookies" })).toHaveCount(0);
});
