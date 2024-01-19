class NavigationPage {
	constructor(page) {
		this.page = page;
	}

	async formLayoutsPage() {
		await this.page.getByText('Forms').click();
		await this.page.getByText('Form Layouts').click();
	}
}

export default NavigationPage;
