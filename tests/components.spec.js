import { test, expect } from '@playwright/test';
import exp from 'constants';

test.beforeEach(async ({ page }) => {
	await page.goto('http://localhost:4200');
});

test.describe('Form Layouts page', async () => {
	// test.beforeEach(async ({ page }) => {
	// 	await page.getByText('Forms').click();
	// 	await page.getByText('Form Layout').click();
	// });

	test('input fields', async ({ page }) => {
		const usingTheInputInTheGrid = page
			.locator('nb-card', { hasText: 'Using the Grid' })
			.getByRole('textbox', { name: 'Email' });

		await usingTheInputInTheGrid.fill('test@test.com');
		await usingTheInputInTheGrid.clear();
		await usingTheInputInTheGrid.pressSequentially('hello@world.com', {
			delay: 500,
		});

		// generic assertions
		// grab the text first
		const inputValue = await usingTheInputInTheGrid.inputValue();

		expect(inputValue).toEqual('hello@world.com');

		// locator assertions
		await expect(usingTheInputInTheGrid).toHaveValue('hello@world.com');
	});

	test('Radio Buttons Test', async ({ page }) => {
		const usingTheGridForm = page.locator('nb-card', {
			hasText: 'Using the Grid',
		});

		// await usingTheGridForm.getByLabel('Option 1').check({ force: true });

		await usingTheGridForm
			.getByRole('radio', { name: 'Option 1' })
			.check({ force: true });

		// getting the status of the button
		const radioStatus = await usingTheGridForm
			.getByRole('radio', { name: 'Option 1' })
			.isChecked();

		expect(radioStatus).toBeTruthy();

		await expect(
			usingTheGridForm.getByRole('radio', { name: 'Option 2' }),
		).toBeChecked();

		// Check option 2
		const radioStatus1 = await usingTheGridForm
			.getByRole('radio', { name: 'Option 2' })
			.check({ force: true });

		// Check if option 1 is false, use gen assertion
		const radioStatus2 = await usingTheGridForm
			.getByRole('radio', { name: 'Option 1' })
			.isChecked();

		expect(radioStatus2).toBeFalsy();
		expect(radioStatus1).toBeTruthy();
	});

	test('checkboxes', async ({ page }) => {
		await page.getByText('Modal & Overlays').click();
		await page.getByText('Toastr').click();

		await page
			.getByRole('checkbox', { name: 'Hide on click' })
			.uncheck({ force: true });
		await page
			.getByRole('checkbox', { name: 'Hide on click' })
			.check({ force: true });

		const allBoxes = page.getByRole('checkbox');

		for (const box of await allBoxes.all()) {
			await box.check({ force: true });
			expect(await box.isChecked()).toBeTruthy();
		}
	});

	test('lists and dropdowns', async ({ page }) => {
		const listButton = page.locator('ngx-header nb-select');
		await listButton.click();

		// const optionList = page.getByRole('list').locator('nb-option');
		const optionList = page.locator('nb-option-list nb-option');

		await expect(optionList).toHaveText([
			'Light',
			'Dark',
			'Cosmic',
			'Corporate',
		]);
		await optionList.filter({ hasText: 'Cosmic' }).click();

		// Find the background for the page
		const header = page.locator('nb-layout-header');
		await expect(header).toHaveCSS('background-color', 'rgb(50, 50, 89)');

		const colors = {
			Light: 'rgb(255, 255, 255)',
			Dark: 'rgb(255, 255, 255)',
			Cosmic: 'rgb(255, 255, 255)',
			Corporate: 'rgb(255, 255, 255)',
		};

		// Log all the colors
		await optionList.click();
		for (const color in colors) {
			await optionList.filter({ hasText: color }).click();
			await expect(header).toHaveCSS('background-color', colors[color]);
			await optionList.click();
		}
	});

	test('tooltips test', async ({ page }) => {
		await page.getByText('Modal & Overlays').click();
		await page.getByText('Tooltip').click();
		const toolTipCard = page
			.locator('nb-card')
			.filter({ hasText: 'Tooltip Placements' });
		await toolTipCard.getByRole('button', { name: 'Top' }).hover();

		// Finding and asserting the tooltip
		const tooltip = await page.locator('nb-tooltip').textContent();
		expect(tooltip).toEqual('This is a tooltip');
	});

	test('dialog boxes', async ({ page }) => {
		await page.getByText('Tables & Data').click();
		await page.getByText('Smart Table').click();

		page.on('dialog', dialog => {
			const message = 'Are you sure you want to delete?';
			expect(dialog.message()).toEqual(message);
			dialog.accept();
		});

		// Find the table row and click
		await page
			.getByRole('table')
			.locator('tr')
			.filter({ hasText: 'mdo@gmail.com' })
			.locator('.nb-trash')
			.click();

		const listOfEmails = page.locator('table tr');

		for (const row of await listOfEmails.all()) {
			await expect(row).not.toHaveText('mdo@gmail.com');
		}
	});

	test('web tablaes', async ({ page }) => {
		await page.getByText('Tables & Data').click();
		await page.getByText('Smart Table').click();

		const trow = page.getByRole('row', { name: 'twitter@outlook.com' });
		await trow.locator('.nb-edit').click();

		await page.locator('input-editor').getByPlaceholder('Age').clear();
		await page.locator('input-editor').getByPlaceholder('Age').fill('234');
		await page.locator('.nb-checkmark').click();

		// CLicking the page
		await page.locator('.ng2-smart-pagination-nav').getByText('2').click();
		await page
			.getByRole('row', { name: '11' })
			.filter({ has: page.locator('td').nth(1).getByText('11') })
			.locator('.nb-edit')
			.click();

		// Test the filter
		const ages = ['20', '30', '40', '200'];

		for (const age of ages) {
			const sbar = page.locator('input-filter').getByPlaceholder('Age');
			sbar.clear();
			sbar.fill(age);
			await page.waitForTimeout(500);

			const ageRows = page.locator('tbody tr');

			for (const row of ageRows.all()) {
				const cellValue = await row.locator('td').last().textContent();

				expect(cellValue).toEqual(age);
			}
		}
	});

	test('Date Picker', async ({ page }) => {
		await page.getByText('Forms').click();
		await page.getByText('Datepicker').click();

		const calendarInputField = page.getByPlaceholder('Form Picker');
		await calendarInputField.click();

		const date = new Date();
		date.setDate(date.getDate() + 1);
		const expectedDate = date.getDate().toString();

		await page
			.locator('[class="day-cell ng-star-inserted"]')
			.getByText(expectedDate, { exact: true })
			.click();
	});

	test('slider tests', async ({ page }) => {
		// Updating the attributes
		const tempGauge = page.locator(
			'[tabtitle="Temperature"] ngx-temperature-dragger circle',
		);
		await tempGauge.evaluate(node => {
			node.setAttribute('cx', '232.630');
			node.setAttribute('cy', '232.630');
		});

		await tempGauge.click();

		// Mouse Component
		const tempBox = page.locator(
			'[tabtitle="Temperature"] ngx-temperature-dragger',
		);
		await tempBox.scrollIntoViewIfNeeded();

		await tempBox.boundingBox();
	});
});
