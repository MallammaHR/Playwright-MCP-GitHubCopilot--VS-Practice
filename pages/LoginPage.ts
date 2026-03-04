import { Page } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  readonly emailInput: string;
  readonly passwordInput: string;
  readonly loginButton: string;
  readonly alertDanger: string;

  constructor(page: Page) {
    this.page = page;
    this.emailInput = 'input[name="email"]';
    this.passwordInput = 'input[name="password"]';
    this.loginButton = 'input[type="submit"][value="Login"]';
    this.alertDanger = 'div.alert.alert-danger';
  }

  async goto() {
    await this.page.goto('https://naveenautomationlabs.com/opencart/index.php?route=account/login');
  }

  async login(email: string, password: string) {
    await this.page.fill(this.emailInput, email);
    await this.page.fill(this.passwordInput, password);
    await Promise.all([
      this.page.waitForNavigation({ waitUntil: 'load' }),
      this.page.click(this.loginButton),
    ]);
  }

  async getAlertText() {
    return this.page.locator(this.alertDanger).innerText().catch(() => '');
  }

  async isLoggedIn() {
    // After successful login, user is redirected to account page which contains "My Account" heading
    const heading = await this.page.locator('h2').first().innerText().catch(() => '');
    return heading.includes('My Account') || this.page.url().includes('route=account/account');
  }
}
