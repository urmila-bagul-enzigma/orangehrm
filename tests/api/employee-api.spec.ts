import { test, expect } from '@playwright/test';
import { config } from '../../src/config/testConfig';
import { getEmployeeDataFromExcel, generateUniqueEmployeeId } from '../../src/utils/excelReader';

test.describe('OrangeHRM API CRUD @api', () => {
  test('API CREATE employee', async ({ page }) => {
    await page.goto(config.loginUrl);
    await page.getByPlaceholder('Username').fill(config.admin.username);
    await page.getByPlaceholder('Password').fill(config.admin.password);
    await page.getByRole('button', { name: 'Login' }).click();
    await page.waitForURL(/\/dashboard/, { timeout: config.defaultTimeout });

    const employeeData = getEmployeeDataFromExcel()[0];
    const employeeId = generateUniqueEmployeeId();
    const payload = {
      firstName: employeeData.firstName,
      middleName: employeeData.middleName,
      lastName: employeeData.lastName,
      employeeId,
    };

    const response = await page.request.post(config.api.employeeEndpoint, { data: payload });
    expect(response.ok()).toBeTruthy();

    const body = await response.json();
    expect(body.data.firstName).toBe(payload.firstName);
    expect(body.data.lastName).toBe(payload.lastName);
    expect(body.data.employeeId).toBe(payload.employeeId);
  });

  test('API READ employee by ID', async ({ page }) => {
    await page.goto(config.loginUrl);
    await page.getByPlaceholder('Username').fill(config.admin.username);
    await page.getByPlaceholder('Password').fill(config.admin.password);
    await page.getByRole('button', { name: 'Login' }).click();
    await page.waitForURL(/\/dashboard/, { timeout: config.defaultTimeout });

    const employeeId = generateUniqueEmployeeId();
    const response = await page.request.get(
      `${config.api.employeeEndpoint}?employeeId=${employeeId}`
    );

    expect(response.ok()).toBeTruthy();
    const body = await response.json();
    expect(body.data).toBeTruthy();
  });

  test('API DELETE employee by ID', async ({ page }) => {
    await page.goto(config.loginUrl);
    await page.getByPlaceholder('Username').fill(config.admin.username);
    await page.getByPlaceholder('Password').fill(config.admin.password);
    await page.getByRole('button', { name: 'Login' }).click();
    await page.waitForURL(/\/dashboard/, { timeout: config.defaultTimeout });

    const employeeData = getEmployeeDataFromExcel()[0];
    const employeeId = generateUniqueEmployeeId();
    const createResponse = await page.request.post(config.api.employeeEndpoint, {
      data: {
        firstName: employeeData.firstName,
        middleName: employeeData.middleName,
        lastName: employeeData.lastName,
        employeeId,
      },
    });

    expect(createResponse.ok()).toBeTruthy();
    const createdEmployee = await createResponse.json();
    const empNumber = createdEmployee.data.empNumber;

    const response = await page.request.delete(config.api.employeeEndpoint, {
      data: { ids: [empNumber] },
    });

    expect(response.ok()).toBeTruthy();
  });
});
