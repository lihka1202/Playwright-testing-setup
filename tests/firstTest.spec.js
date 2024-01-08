import { test } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('http://localhost:4200/');
  await page.getByText('Forms').click();
  await page.getByText('Form Layout').click();
});

test('user facing locators', async ({ page }) => {
  await page.getByRole('textbox', { name: 'Email' }).first().click();
  await page.getByRole('button', { name: 'Sign in' }).first().click();
  await page.getByLabel('Email').first().click();
  await page.getByPlaceholder('Jane Doe').first().click();
  await page.getByText('Using the Grid').first().click();
  await page.getByTitle('IoT Dashboard').click();
});

test('Child Element Locator', async ({ page }) => {
  await page.locator('nb-card nb-radio :text-is("Option 1")');
  await page.locator('nb-card').locator('nb-radio').locator(':text-is("Option 1")');
  await page.locator('nb-card').getByRole('button', { name: 'Sign in' });
});
