class GaragePage {
    constructor(page) {
        this.page = page;

        this.addCarButton = page.getByRole('button', {
            name: 'Add car',
        });
    }

    async open() {
        await this.page.goto('/panel/garage');
    }
}

module.exports = { GaragePage };