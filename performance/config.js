export const config = {
  baseUrl: __ENV.BASE_URL || 'https://opensource-demo.orangehrmlive.com',
  admin: {
    username: __ENV.ORANGEHRM_USERNAME || 'Admin',
    password: __ENV.ORANGEHRM_PASSWORD || 'admin123',
  },
  loginUrl: `${__ENV.BASE_URL || 'https://opensource-demo.orangehrmlive.com'}/web/index.php/auth/validate`,
  employeeEndpoint: `${__ENV.BASE_URL || 'https://opensource-demo.orangehrmlive.com'}/web/index.php/api/v2/pim/employees`,
};
