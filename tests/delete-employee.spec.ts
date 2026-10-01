import { test } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { EmployeePage } from '../pages/EmployeePage';
import { generateRandomIndianEmployeeData, generateUniqueEmployeeId } from '../src/utils/excelReader';

test('Delete employee by employee id', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const employeePage = new EmployeePage(page);
  const employeeData = generateRandomIndianEmployeeData();
  const employeeId = generateUniqueEmployeeId();

  await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
  await loginPage.login('Admin', 'admin123');

  await employeePage.navigateToPIM();
  await employeePage.clickAddEmployee();
  await employeePage.createEmployee(
    employeeData.firstName,
    employeeData.middleName,
    employeeData.lastName,
    employeeId
  );

  await employeePage.navigateToPIM();
  await employeePage.deleteEmployeeById(employeeId);
  await employeePage.verifyEmployeeDeleted();
});
