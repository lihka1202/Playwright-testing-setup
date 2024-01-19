class NavigationPage {
	constructor(page) {
		/** @type {import('playwright').Page} */
		this.page = page;
		/** @type {import('playwright').locator} */
		this.fromLayoutsMenuItem = page.getByText('Form Layouts').click();
		this.datePickerItem = page.getByText('Date Picker').click();
		this.smartTableItem = page.getByText('Smart Table').click();
		this.toastrItem = page.getByText('Toastr').click();
		this.tooltipItem = page.getByText('Tooltip').click();
	}

	async formLayoutsPage() {
		await this.selectGroupMenuItem('Forms');
		await this.fromLayoutsMenuItem.click();
	}

	async datepickerPage() {
		await this.selectGroupMenuItem('Forms');
		await this.datePickerItem.click();
	}

	async smartTablePage() {
		await this.selectGroupMenuItem('Tables & Data');
		await this.smartTableItem.click();
	}

	async toastrPage() {
		await this.selectGroupMenuItem('Modal & Overlays');
		await this.toastrItem.click();
	}

	async tooltipPage() {
		await this.selectGroupMenuItem('Modal & Overlays');
		await this.tooltipItem.click();
	}

	async selectGroupMenuItem(groupItemTitle) {
		const groupMenuItem = this.page.getByTitle(groupItemTitle);
		const expandedState = await groupMenuItem.getAttribute('aria-expanded');
		if (expandedState === 'false') {
			await groupMenuItem.click();
		}
	}
}

export default NavigationPage;
