export const config = {
  baseUrl: process.env.BASE_URL ?? 'https://opensource-demo.orangehrmlive.com',
  loginUrl: `${process.env.BASE_URL ?? 'https://opensource-demo.orangehrmlive.com'}/web/index.php/auth/login`,
  dashboardUrl: `${process.env.BASE_URL ?? 'https://opensource-demo.orangehrmlive.com'}/web/index.php/dashboard/index`,
  admin: {
    username: process.env.ORANGEHRM_USERNAME ?? 'Admin',
    password: process.env.ORANGEHRM_PASSWORD ?? 'admin123',
  },
  api: {
    employeeEndpoint: `${process.env.BASE_URL ?? 'https://opensource-demo.orangehrmlive.com'}/web/index.php/api/v2/pim/employees`,
  },
  defaultTimeout: Number(process.env.PLAYWRIGHT_TIMEOUT ?? 15000),
  isCI: !!process.env.CI,
};
