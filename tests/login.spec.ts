import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

const validEmail = 'pwmcp@nal.com';
const validPassword = 'mcp@123';

test.describe('OpenCart Login', () => {
  test('positive: login with valid credentials', async ({ page }) => {
    const login = new LoginPage(page);
    await login.goto();
    await login.login(validEmail, validPassword);
    expect(await login.isLoggedIn()).toBeTruthy();
  });

  test('negative: login with invalid password shows error', async ({ page }) => {
    const login = new LoginPage(page);
    await login.goto();
    await login.login(validEmail, 'wrongpassword');
    const alert = await login.getAlertText();
    expect(alert.toLowerCase()).toContain('warning');
  });
});
