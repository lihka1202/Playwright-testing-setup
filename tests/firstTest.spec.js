import { expect, test } from '@playwright/test';
import exp from 'constants';

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
	await page
		.locator('nb-card')
		.locator('nb-radio')
		.locator(':text-is("Option 1")');
	await page.locator('nb-card').getByRole('button', { name: 'Sign in' });
});

test('locating parent elements', async ({ page }) => {
	await page
		.locator('nb-card', { hasText: 'Using the Grid' })
		.getByRole('textbox', { name: 'Email' })
		.click();

	// Use a returned locator to perform a refined search
	await page
		.locator('nb-card', { has: page.locator('#inputEmail1') })
		.getByRole('textbox', { name: 'Email' })
		.click();

	await page
		.locator('nb-card')
		.filter({ hasText: 'Basic Form' })
		.getByRole('textbox', { name: 'Email' })
		.click();

	await page
		.locator('nb-card')
		.filter({ has: page.locator('.status-danger') })
		.getByRole('textbox', { name: 'Password' })
		.click();

	await page
		.locator('nb-card')
		.filter({ has: page.locator('nb-checkbox') })
		.filter({ hasText: 'Sign in' })
		.getByRole('textbox', { name: 'Email' })
		.click();

	// Using the locator to get the Xpath

	await page
		.locator(':text-is("Using the Grid")')
		.locator('..')
		.getByRole('textbox', { name: 'Email' })
		.click();
});

test('Resuing the Locators', async ({ page }) => {
	const holder = page.locator('nb-card').filter({ hasText: 'Basic Form' });
	const getEmailRole = holder.getByRole('textbox', { name: 'Email' });

	await getEmailRole.fill('test@test.com');
	await holder.getByRole('textbox', { name: 'Password' }).fill('password');
	await holder.getByRole('button').click();

	await expect(getEmailRole).toHaveValue('test@test.com');
});

test('extracing single values', async ({ page }) => {
	// single text value
	const basicForm = page.locator('nb-card').filter({ hasText: 'Basic Form' });
	const buttonText = await basicForm.locator('button').textContent();
	// No await in the expect

	expect(buttonText).toEqual('Submit2');

	// check if any of the elements via locator have the value
	const allRadioButtonsContent = await page
		.locator('nb-radio')
		.allTextContents();

	expect(allRadioButtonsContent).toContain('Option 1');

	// input content
	const emailField = basicForm.getByRole('textbox', { name: 'Email' });
	await emailField.fill('test@test.com');

	const input = await emailField.inputValue();

	expect(input).toEqual('test@test.com');

	// check attributres
	const placeHolderValue = await emailField.getAttribute('placeholder');
	expect(placeHolderValue).toEqual('Email');
});
