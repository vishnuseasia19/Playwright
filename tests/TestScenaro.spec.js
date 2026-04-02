// const { test, expect } = require('@playwright/test');

// test.only('Client App login', async ({ page }) => {

//     await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
//     const testProduct =page.locator(".card-body");

//     await page.locator("#userEmail").fill("samsung1942004@gmail.com");
//     await page.locator("#userPassword").fill("Seasia@19");
//     await page.locator("#login").click();

//     // Better wait method
//     await expect(page.locator(".card-body b").first()).toBeVisible();

//     // Get product titles
//     const titles = await page.locator(".card-body b").allTextContents();

//     console.log(titles);
//    const count = await testProduct.count();
//    const productName= 'Zara Coat 3';
//   for (let i = 0; i < count; ++i)
// {
//     const title = await testProduct.nth(i).locator("b").textContent();

//     if (title.trim() === productName)
//     {
//         await testProduct.nth(i).getByRole("button","text=Add To Cart" ).click();
//         break;
//     }
// }

//     await page.pause();
//     // select product zara coat 3

    

// });

const { test, expect } = require('@playwright/test');

test('Client App - Search and Add Product to Cart', async ({ page }) => {
    await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
    
    // Selectors
    const emailInput = page.locator("#userEmail");
    const passwordInput = page.locator("#userPassword");
    const loginBtn = page.locator("#login");
    const products = page.locator(".card-body");
    const productName = 'ZARA COAT 3'; // Note: Match case exactly as shown in UI

    // Login
    await emailInput.fill("samsung1942004@gmail.com");
    await passwordInput.fill("Seasia@19");
    await loginBtn.click();

    // Wait for network to be idle or first item to be attached to avoid count() being 0
    await page.waitForLoadState('networkidle');
    await products.first().waitFor(); // waiting for the card to be visible

    const count = await products.count();
    console.log(`Found ${count} products.`);

    for (let i = 0; i < count; ++i) {
        const title = await products.nth(i).locator("b").textContent();
      //   if (title?.trim() === productName) {
            // Using more specific locator for the button within the card
            await products.nth(i).locator("text= Add To Cart").click();
            break;
      //   }
    }

    // Verification: Toast message or Cart count update
    if(await expect(page.locator("#toast-container")).toContainText("Product Added To Cart")){
         console.log("Product added to cart successfully.");
    }
    await page.locator("[routerlink*='cart']").click();
    //const bool = await expect(page.locator(".cartSection h3")).toHaveText(productName);
    //console.log(`Product presence in cart: ${bool}`);
    await page.locator('div li').first().waitFor(); // Wait for cart items to load


  // const bool=await  page.locator("h3:has-text('ZARA COAT 3')").isVisible();
  // expect(bool).toBeTruthy();

 // console.log(`Product presence in cart: ${bool}`);
  
  await page.locator("text = checkout").click();

const expirySection = page.locator("div:has-text('Expiry Date')").locator("..");

await expirySection.locator("select").nth(0).selectOption("01"); // Month
await expirySection.locator("select").nth(1).selectOption("16"); // Year

await page
  .locator("div.field.small:has(div.title:has-text('CVV Code'))")
  .locator("input")
  .fill("2342");

await page
  .locator("div.field:has(div.title:has-text('Name on Card'))")
  .locator("input")
  .fill("Jarves Kumar");

 // Type country
await page.locator("[placeholder='Select Country']").pressSequentially("ind", { delay: 150 }); // Simulate typing "ind" with a delay

// Wait for dropdown to be visible
const dropdown = page.locator(".ta-results");
await dropdown.waitFor();

// Get all country buttons inside dropdown
const countryOptions = dropdown.locator("button");
const countryOptionsCount = await countryOptions.count();

for (let i = 0; i < countryOptionsCount; i++) {

  const option = countryOptions.nth(i);
  const text = await option.innerText();

  if (text.trim() === "India") {
    await option.click();
    break;
  }
}

  // for(let i=0; i<optionsCount; ++i){
  //   const optionText = await dropdownOptions.locator(".button").nth(i).textContent();    
  //   if(optionText.trim() === " India"){
  //       await dropdownOptions.nth(i).click();
  //       break;
  //   }
  // }

//  await expect(page.locator(".user__name [type='text']").first())
//   .toHaveValue("samsung1942004@gmail.com");
 await page .locator(".action__submit").click();
 expect(page.locator(".hero-primary")).toHaveText("Thankyou for the order. ");
 console.log("conformation: " + await page.locator(".hero-primary").textContent());
 // display order id
 const orderIds = page.locator("td label");
const countid = await orderIds.count();

for (let i = 0; i < countid; i++) {
    const text = await orderIds.nth(i+1).textContent();
    console.log(`Order ${i + 1} ID:`, text.trim());
}

 await page.locator(".btn.btn-custom[routerlink='/dashboard/myorders']").click();
 expect(page.locator("th[scope='row']")).toHaveText(orderIds)




await page.pause();
   });



