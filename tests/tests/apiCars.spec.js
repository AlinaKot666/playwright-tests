const { test, expect, request } = require('@playwright/test');

let apiContext;
let sid;

test.beforeAll(async () => {
  apiContext = await request.newContext({
    baseURL: process.env.BASE_URL,
  });

  const loginResponse = await apiContext.post('/api/auth/signin', {
    data: {
      email: process.env.EMAIL,
      password: process.env.PASSWORD,
      remember: false,
    },
  });

  expect(loginResponse.ok()).toBeTruthy();

  const cookies = await apiContext.storageState();
  sid = cookies.cookies.find(cookie => cookie.name === 'sid');
});

test('Create car - positive', async () => {
  const response = await apiContext.post('/api/cars', {
    headers: {
      Cookie: `sid=${sid.value}`,
    },
    data: {
      carBrandId: 1,
      carModelId: 1,
      mileage: 123,
    },
  });

  expect(response.status()).toBe(201);

  const body = await response.json();

  expect(body.status).toBe('ok');
  expect(body.data.carBrandId).toBe(1);
  expect(body.data.carModelId).toBe(1);
});

test('Create car without brandId - negative', async () => {
  const response = await apiContext.post('/api/cars', {
    headers: {
      Cookie: `sid=${sid.value}`,
    },
    data: {
      carModelId: 1,
      mileage: 123,
    },
  });

  expect(response.status()).toBeGreaterThanOrEqual(400);
});

test('Create car without mileage - negative', async () => {
  const response = await apiContext.post('/api/cars', {
    headers: {
      Cookie: `sid=${sid.value}`,
    },
    data: {
      carBrandId: 1,
      carModelId: 1,
    },
  });

  expect(response.status()).toBeGreaterThanOrEqual(400);
});