import { test } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('http://localhost:4200/');
  await page.getByText('Forms').click();
});

test(
  'First test',
  async ({ page }) => {
    await page.getByText('Form Layouts').click();
  },
);

test('Navigate to the date picker', async ({ page }) => {
  await page.getByText('DatePicker').click();
});
