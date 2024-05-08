class LoginPage {

    constructor(page) {
        this.page = page;
    }

    async open(url) {
        await this.page.goto(url);
    }

    async login(username, password) {
        await this.page.waitForSelector('button[type="submit"]');
        await this.page.type('input[name="identification"]', username);
        await this.page.type('input[name="password"]', password);
        await this.page.click('button[type="submit"]');
    }

}

module.exports = LoginPage;