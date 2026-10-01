import { Page, expect } from '@playwright/test';
import { config } from '../src/config/testConfig';

export class LoginPage {
  constructor(private readonly page: Page) {}

  readonly usernameInput = this.page.getByPlaceholder('Username');
  readonly passwordInput = this.page.getByPlaceholder('Password');
  readonly loginButton = this.page.getByRole('button', { name: 'Login' });

  async gotoLogin() {
    await this.page.goto(config.loginUrl, {
      waitUntil: 'domcontentloaded',
    });
    await expect(this.usernameInput).toBeVisible({ timeout: config.defaultTimeout });
  }

  async login(username = config.admin.username, password = config.admin.password) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);

    await Promise.all([
      this.page.waitForURL(/dashboard/, { timeout: config.defaultTimeout }),
      this.loginButton.click(),
    ]);
  }
}