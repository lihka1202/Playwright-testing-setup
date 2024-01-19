export default class FormLayoutsPage {
	constructor(page) {
		/** @type {import('playwright').Page} */
		this.page = page;
	}

	async submitUsingTheGridFormAndSelectOptions(email, password, optionText) {
		const usingTheGridForm = this.page.locator('nb-card', {
			hasText: 'Using the Grid',
		});
		// eslint-disable-next-line max-len
		await usingTheGridForm.getByRole('textbox', { name: 'Email' }).fill(email);

		await usingTheGridForm
			.getByRole('textbox', { name: 'Password' })
			.fill(password);

		await usingTheGridForm
			.getByRole('radio', { name: optionText })
			.check({ force: true });
	}
}
