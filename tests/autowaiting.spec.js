import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
	await page.goto('http://uitestingplayground.com/ajax');
	await page.getByText('Button triggering AJAX Request').click();
});

test('auto waiting text', async ({ page }) => {
	const successButton = page.locator('.bg-success');

	await successButton.waitFor({ state: 'attached' });

	const text = await successButton.allTextContents();

	expect(text).toEqual('Data loaded with AJAX get request. ');

	const string = 'Data loaded with AJAX get request.';
	await expect(successButton).toHaveText(string, {
		timeout: 20000,
	});
});

test('alternative waits', async ({ page }) => {
	const successButton = page.locator('.bg-success');

	// Wait for element
	await page.waitForSelector('.bg-success');

	const text = await successButton.allTextContents();

	// wait for particular response
	await page.waitForResponse('URL');

	// Wait for netwerk calls are completed

	await page.waitForLoadState('networkidle');

	expect(text).toContain('Data loaded with AJAX get request.');
});

test('timeouts', async ({ page }) => {
	const successButton = page.locator('.bg-success');

	await successButton.click();
});
