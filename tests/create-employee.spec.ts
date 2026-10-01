import { test } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { EmployeePage } from '../pages/EmployeePage';
import { config } from '../src/config/testConfig';
import { generateRandomIndianEmployeeData, generateUniqueEmployeeId } from '../src/utils/excelReader';

test('Create a new employee', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const employeePage = new EmployeePage(page);
    const employeeData = generateRandomIndianEmployeeData();
    const employeeId = generateUniqueEmployeeId();

    await page.goto(config.loginUrl);

    await loginPage.login(config.admin.username, config.admin.password);

    await employeePage.navigateToPIM();
    await employeePage.clickAddEmployee();

    await employeePage.createEmployee(
        employeeData.firstName,
        employeeData.middleName,
        employeeData.lastName,
        employeeId
    );

    await employeePage.verifyEmployeeCreated(employeeId);
});