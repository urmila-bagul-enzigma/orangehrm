import http from 'k6/http';
import { check, sleep } from 'k6';
import { config } from './config.js';

const testData = JSON.parse(open('./test-data.json'));

export const options = {
  stages: [
    { duration: '30s', target: 10 },
    { duration: '1m', target: 20 },
    { duration: '20s', target: 0 },
  ],
  thresholds: {
    http_req_duration: ['p(95)<3000'],
    http_req_failed: ['rate<0.01'],
    checks: ['rate>0.99'],
  },
};

export default function () {
  const employee = testData[Math.floor(Math.random() * testData.length)] || {
    firstName: 'Aarav',
    middleName: 'Raj',
    lastName: 'Sharma',
  };

  const loginRes = http.post(config.loginUrl, {
    username: config.admin.username,
    password: config.admin.password,
  }, {
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  });

  check(loginRes, {
    'login succeeded': (r) => r.status === 200,
  });

  const employeeId = `EMP${Date.now().toString().slice(-6)}`;
  const payload = JSON.stringify({
    firstName: employee.firstName,
    middleName: employee.middleName,
    lastName: employee.lastName,
    employeeId,
  });

  const res = http.post(config.employeeEndpoint, payload, {
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
  });

  check(res, {
    'status is 200 or 201': (r) => r.status === 200 || r.status === 201,
    'created employee has id': (r) => !!r.json('data') && !!r.json('data.employeeId'),
  });

  sleep(1);
}
