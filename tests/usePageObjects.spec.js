import { test, expect } from '@playwright/test';
import NavigationPage from '../page-objects/navigationPage';
import FormLayoutsPage from '../page-objects/formLayoutsPage';

test.beforeEach(async ({ page }) => {
	await page.goto('http://localhost:4200');
});

test('navigate to the form page', async ({ page }) => {
	const navigateTo = new NavigationPage(page);
	await navigateTo.formLayoutsPage();
});

test('param methods', async ({ page }) => {
	const formLayoutsPage = new FormLayoutsPage();
	formLayoutsPage.submitUsingTheGridFormAndSelectOptions(
		'test@test.com',
		'helloworld',
		'Option 1',
	);
});
