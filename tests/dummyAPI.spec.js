const { test, expect, request } = require('@playwright/test');

let token;
let apiContext;

test.beforeAll(async () => {
  const loginPayload = {
    userEmail: "samsung1942004@gmail.com",
    userPassword: "12345678"
  };

  // Create a global request context
  apiContext = await request.newContext();

  const loginResponse = await apiContext.post('https://rahulshettyacademy.com/api/ecom/auth/login', {
    data: loginPayload
  });

  expect(loginResponse.ok()).toBeTruthy();

  const loginJson = await loginResponse.json();
  token = loginJson.token; // Extracting the token
  console.log("Login Successful. Token generated.");
});

test.afterAll(async () => {
  await apiContext.dispose();
});

test('get all products - API with auth', async () => {
  const response = await apiContext.post('https://rahulshettyacademy.com/api/ecom/product/get-all-products', {
    data: {}, // Some API versions require a body to be present for POST
    headers: {
      'Authorization': token, // Usually, this specific API takes the raw token without 'Bearer '
      'Content-Type': 'application/json'
    }
  });

  const responseBody = await response.json();
  
  if (!response.ok()) {
    console.log("Error Response:", responseBody);
  }

  expect(response.status()).toBe(200);
  console.log('Products Count:', responseBody.data.length);
  console.log('First Product:', responseBody);
});