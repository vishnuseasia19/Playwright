// const { test, expect,request } = require('@playwright/test');
// //run first 


// test.beforeAll( async()=>
// {
//    const loginPayload = {userEmail: "samsung1942004@gmail.com", userPassword: "12345678"};
//  const apiContext=await request.newContext();
//   const loginResponse=await apiContext.post('https://rahulshettyacademy.com/api/ecom/auth/login', {
//    data:loginPayload 
// });
// expect(loginResponse.ok()).toBeTruthy();  
// const loginResponseJson=await loginResponse.json();
// const token= await loginResponseJson.token;
// console.log(token);

// })

// // test("GET method -> to get orders",async()=>
// // {
// //    const apiContext= await request.newContext();
// //    const response=await apiContext.get(
// //       'https://rahulshettyacademy.com/client/#/dashboard/myorders',
// //       {
// //          headers: {
// //             Authorization: token,
// //             'content-Type':'application/json'
// //          }
// //       }
// //    );
// //    const responseBody=await response.json();
// //    console.log(responseBody);

// //    expect(response.ok()).toBeTruthy();
// // })

// // run before each test 
// // test.beforeEach(()=>
// // {

// // })
 
 
 
// test('@Webst Client App login', async ({ page }) => {
//    //js file- Login js, DashboardPage
//    const email = "samsung1942004@gmail.com";
//    const productName = 'ZARA COAT 3';
//    const products = page.locator(".card-body");
//    await page.goto("https://rahulshettyacademy.com/client");
//    await page.locator("#userEmail").fill(email);
//    await page.locator("#userPassword").fill("12345678");
//    await page.locator("[value='Login']").click();
//    await page.waitForLoadState('networkidle');
//    await page.locator(".card-body b").first().waitFor();
//    const titles = await page.locator(".card-body b").allTextContents();
//    console.log(titles); 
//    const count = await products.count();
//    for (let i = 0; i < count; ++i) {
//       if (await products.nth(i).locator("b").textContent() === productName) {
//          //add to cart
//          await products.nth(i).locator("text= Add To Cart").click();
//          break;
//       }
//    }
 
//    await page.locator("[routerlink*='cart']").click();
//    //await page.pause();
 
//    await page.locator("div li").first().waitFor();
//    const bool = await page.locator("h3:has-text('ZARA COAT 3')").isVisible();
//    expect(bool).toBeTruthy();
//    await page.locator("text=Checkout").click();
 
//   await page.getByPlaceholder('Select Country').pressSequentially("ind", { delay: 150 }) 
//    const dropdown = page.locator(".ta-results");
//    await dropdown.waitFor();
//    const optionsCount = await dropdown.locator("button").count();
//    for (let i = 0; i < optionsCount; ++i) {
//       const text = await dropdown.locator("button").nth(i).textContent();
//       if (text === " India") {
//          await dropdown.locator("button").nth(i).click();
//          break;
//       }
//    }
 
//    expect(page.locator(".user__name [type='text']").first()).toHaveText(email);
//    await page.locator(".action__submit").click();
//    await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");
//    const orderId = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
//    console.log(orderId);
 
//    await page.locator("button[routerlink*='myorders']").click();
//    await page.locator("tbody").waitFor();
//    const rows = await page.locator("tbody tr");
 
 
//    for (let i = 0; i < await rows.count(); ++i) {
//       const rowOrderId = await rows.nth(i).locator("th").textContent();
//       if (orderId.includes(rowOrderId)) {
//          await rows.nth(i).locator("button").first().click();
//          break;
//       }
//    }
//    const orderIdDetails = await page.locator(".col-text").textContent();
//    expect(orderId.includes(orderIdDetails)).toBeTruthy();

//     await page.locator(".btn.btn-custom[routerlink='/dashboard/myorders']").click();  // rows of order details
//     await page.locator("tbody").waitFor();
//     const rows2 = await page.locator("tbody tr");

//     for(let i=0; i< await rows2.count(); ++i){
//       const rowOrderId = await rows2.nth(i).locator("th").textContent(); 
//         if(orderId.includes(rowOrderId)){
//             console.log("order id in order details: " + rowOrderId);
//             await rows2.nth(i).locator("button").first().click();
//             break;
//         }
//     }
//     const orderIdDetails2=await page.locator(".col-text.-main").textContent();
//     expect(orderId.includes(orderIdDetails2)).toBeTruthy();

//  await page.pause();
 
// });
 
const { test, expect, request } = require('@playwright/test');

let token;
let apiContext;

// LOGIN ONCE
test.beforeAll(async () => {

  const loginPayload = {
    userEmail: "samsung1942004@gmail.com",
    userPassword: "12345678" 
  };

  apiContext = await request.newContext();

  const loginResponse = await apiContext.post(
    'https://rahulshettyacademy.com/api/ecom/auth/login',
    { data: loginPayload }
  );

  
  console.log("Status:", loginResponse.status());
  const responseBody = await loginResponse.text();
  console.log("Response:", responseBody);

  expect(loginResponse.ok()).toBeTruthy();

  const loginJson = JSON.parse(responseBody);
  token = loginJson.token;

  console.log("Token:", token);
  console.log('Json data; ', loginJson);




});
test('get orders -API', async () => {

  const orderResponse = await apiContext.get(
    'https://rahulshettyacademy.com/client/api/ecom/order/get-orders-for-customer',
    {
      headers: {
        Authorization: `Bearer ${token}`,   
        'Content-Type': 'application/json'
      }
    }
  );

  const status = orderResponse.status();
  console.log("Status:", status);

  const responseText = await orderResponse.text(); 
  console.log("Raw Response:", responseText);

  expect(status).toBe(200);  // 

  const jsonResponse = JSON.parse(responseText); 
  console.log("JSON:", jsonResponse);
});


// ✅ MAIN TEST
test('@Webst Client App login', async ({ page }) => {

  // Inject token → skip UI login
  await page.addInitScript(value => {
    window.localStorage.setItem('token', value);
  }, token);

  await page.goto("https://rahulshettyacademy.com/client");

  const productName = 'ZARA COAT 3';
  const products = page.locator(".card-body");

  await page.locator(".card-body b").first().waitFor();

  const count = await products.count();

  for (let i = 0; i < count; ++i) {
    const text = await products.nth(i).locator("b").textContent();

    if (text.trim() === productName) {
      await products.nth(i).locator("text=Add To Cart").click();
      break;
    }
  }

  await page.locator("[routerlink*='cart']").click();

  await expect(page.locator("h3:has-text('ZARA COAT 3')")).toBeVisible();

  await page.locator("text=Checkout").click();

  await page.getByPlaceholder('Select Country')
    .pressSequentially("ind", { delay: 100 });

  const dropdown = page.locator(".ta-results");
  await dropdown.waitFor();

  const options = dropdown.locator("button");

  for (let i = 0; i < await options.count(); ++i) {
    const text = await options.nth(i).textContent();

    if (text.trim() === "India") {
      await options.nth(i).click();
      break;
    }
  }

//  await expect(page.getByDisplayValue("samsung1942004@gmail.com"))
//   .toBeVisible();

  await page.locator(".action__submit").click();

  await expect(page.locator(".hero-primary"))
    .toHaveText(" Thankyou for the order. ");
});
 