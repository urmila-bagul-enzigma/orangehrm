import { Page, expect } from '@playwright/test';

export class EmployeePage {
  constructor(private readonly page: Page) {}

  readonly pimLink = this.page.locator("//a[normalize-space()='PIM']");
  readonly addButton = this.page.locator("//button[normalize-space()='Add']");
  readonly firstNameInput = this.page.locator("//input[@name='firstName']");
  readonly middleNameInput = this.page.locator("//input[@name='middleName']");
  readonly lastNameInput = this.page.locator("//input[@name='lastName']");
  readonly employeeIdInput = this.page.locator(
    "//label[text()='Employee Id']//following::input[1]"
  );
  readonly searchEmployeeIdInput = this.page.locator(
    "//label[normalize-space()='Employee Id']//following::input[1]"
  );
  readonly searchButton = this.page.locator("//button[normalize-space()='Search']");
  readonly saveButton = this.page.locator("//button[@type='submit']").first();
  readonly deleteIcon = this.page.locator("//i[@class='oxd-icon bi-trash']");
  readonly deleteConfirmButton = this.page.locator("//div[@class ='orangehrm-modal-footer']//button[2]");
  readonly noRecordsText = this.page.locator("//span[normalize-space()='No Records Found']");

  async navigateToPIM() {
    await this.pimLink.waitFor({ state: 'visible', timeout: 15000 });
    await this.pimLink.click();
    await this.page.waitForURL(/\/pim\//, { timeout: 15000 });
  }

  async clickAddEmployee() {
    await this.addButton.waitFor({ state: 'visible', timeout: 15000 });
    await this.addButton.click();
    await this.page.waitForSelector("//h6[normalize-space()='Add Employee']", { timeout: 15000 });
  }

  async createEmployee(
    firstName: string,
    middleName: string,
    lastName: string,
    employeeId: string
  ) {
    await this.firstNameInput.waitFor({ state: 'visible', timeout: 15000 });
    await this.firstNameInput.fill(firstName);
    await this.middleNameInput.fill(middleName);
    await this.lastNameInput.fill(lastName);
    await this.employeeIdInput.fill(employeeId);
    await this.saveButton.click();
    await this.page.waitForLoadState('networkidle');
  }

  async verifyEmployeeCreated(employeeId: string) {
    await expect(this.employeeIdInput).toHaveValue(employeeId, { timeout: 15000 });
  }

  async searchEmployeeById(employeeId: string) {
    await this.searchEmployeeIdInput.waitFor({ state: 'visible', timeout: 15000 });
    await this.searchEmployeeIdInput.fill(employeeId);
    await this.searchButton.click();

    const employeeRow = this.page.locator(
      `//div[contains(@class,'oxd-table-cell') and normalize-space()='${employeeId}']`
    );

    await employeeRow.waitFor({ state: 'visible', timeout: 15000 });
    await employeeRow.click();
  }

  async updateMiddleName(randomMiddleName: string) {
    await this.middleNameInput.waitFor({ state: 'visible', timeout: 15000 });
    await this.middleNameInput.fill(randomMiddleName);
    await this.saveButton.click();
    await this.page.waitForTimeout(2000);
  }

  async verifyMiddleNameUpdated(randomMiddleName: string) {
    await expect(this.middleNameInput).toHaveValue(randomMiddleName, { timeout: 15000 });
  }

  async deleteEmployeeById(employeeId: string) {
    await this.searchEmployeeIdInput.waitFor({ state: 'visible', timeout: 15000 });
    await this.searchEmployeeIdInput.fill(employeeId);
    await this.searchButton.click();

    const row = this.page.locator(
      `//div[contains(@class,'oxd-table-cell') and normalize-space()='${employeeId}']`
    );
    await row.waitFor({ state: 'visible', timeout: 15000 });

    const itemRow = row.locator('xpath=ancestor::div[contains(@class,"oxd-table-card")]');
    await itemRow.waitFor({ state: 'visible', timeout: 15000 });
    await itemRow.locator("//i[@class='oxd-icon bi-trash']").click();
    await this.deleteConfirmButton.waitFor({ state: 'visible', timeout: 15000 });
    await this.deleteConfirmButton.click();
    await this.page.waitForTimeout(2000);
  }

  async verifyEmployeeDeleted() {
    await expect(this.noRecordsText).toBeVisible({ timeout: 15000 });
  }
}