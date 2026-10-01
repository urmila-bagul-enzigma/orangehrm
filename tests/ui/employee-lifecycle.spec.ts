import { test, expect } from '@playwright/test';
import { EmployeePage } from '../../pages/EmployeePage';
import { LoginPage } from '../../pages/LoginPage';

test.describe('Employee lifecycle @ui @smoke @regression', () => {
  test('admin user can create, validate, update and delete an employee', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const employeePage = new EmployeePage(page);

    await loginPage.gotoLogin();
    await loginPage.login();

    await employeePage.navigateToPIM();
    await expect(page.getByRole('link', { name: 'PIM' })).toBeVisible();

    const employee = {
      firstName: 'QA',
      middleName: 'Senior',
      lastName: 'Engineer',
      employeeId: `EMP-${Date.now()}`,
    };

    await employeePage.clickAddEmployee();
    await employeePage.createEmployee(employee);
    await employeePage.verifyEmployeeCreated(employee.employeeId);
    await employeePage.updateEmployee(employee.employeeId, 'Updated');
    await employeePage.deleteEmployee(employee.employeeId);
  });
});
