import http from 'k6/http';
import { check, sleep } from 'k6';
import { config } from './config.js';

export const options = {
  stages: [
    { duration: '30s', target: 10 },
    { duration: '1m', target: 25 },
    { duration: '30s', target: 0 },
  ],
  thresholds: {
    http_req_duration: ['p(95)<2000'],
    http_req_failed: ['rate<0.01'],
    checks: ['rate>0.99'],
  },
};

const payload = {
  username: config.admin.username,
  password: config.admin.password,
};

export default function () {
  const res = http.post(config.loginUrl, payload, {
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  });

  check(res, {
    'login status is 200': (r) => r.status === 200,
    'login response contains redirect or success': (r) =>
      r.body && (r.body.includes('redirect') || r.body.includes('dashboard') || r.body.length > 0),
  });

  sleep(1);
}
