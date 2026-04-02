const { test, expect, request } = require('@playwright/test');

let apiContext;
let userId;

// 🔹 BEFORE ALL → setup
test.beforeAll(async () => {
  apiContext = await request.newContext();
});


// 🔹 1. LOGIN (POST)
test('POST - Login User', async () => {

  const loginPayload = {
    email: "eve.holt@reqres.in",
    password: "cityslicka"
  };

  const response = await apiContext.post(
    'https://reqres.in/api/login',
    {
      data: loginPayload
    }
  );

  const body = await response.json();

  console.log("Login Response:", body);

  expect(response.ok()).toBeTruthy();
  expect(body.token).toBeTruthy(); // important
});


// 🔹 2. GET USERS
test('GET - Fetch Users', async () => {

  const response = await apiContext.get(
    'https://reqres.in/api/users?page=2'
  );

  const body = await response.json();

  console.log("Users:", body.data);

  expect(response.ok()).toBeTruthy();
  expect(body.data.length).toBeGreaterThan(0);
});


// 🔹 3. CREATE USER (POST)
test('POST - Create User', async () => {

  const payload = {
    name: "Vishnu",
    job: "QA Engineer"
  };

  const response = await apiContext.post(
    'https://reqres.in/api/users',
    {
      data: payload
    }
  );

  const body = await response.json();

  console.log("Created User:", body);

  userId = body.id;

  expect(response.status()).toBe(201);
  expect(body.name).toBe("Vishnu");
});


// 🔹 4. DELETE USER
test('DELETE - User', async () => {

  const response = await apiContext.delete(
    `https://reqres.in/api/users/${userId}`
  );

  console.log("Delete Status:", response.status());

  expect(response.status()).toBe(204);
});