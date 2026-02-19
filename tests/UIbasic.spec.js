
   


const { test, expect } = require('@playwright/test');
 
 
 
 
test('@Web Client App login', async ({ page }) => {
   //js file- Login js, DashboardPage
   const email = "anshika@gmail.com";
   const productName = 'zara coat 3';
   const products = page.locator(".card-body");
   await page.goto("https://rahulshettyacademy.com/client");
   await page.locator("#userEmail").fill(email);
   await page.locator("#userPassword").type("Iamking@000");
   await page.locator("[value='Login']").click();
   await page.waitForLoadState('networkidle');
   await page.locator(".card-body b").first().waitFor();
   const titles = await page.locator(".card-body b").allTextContents();
   console.log(titles); 
 
})

test.only("UI Login ", async ({page})=>
   
{  
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    const username=page.locator("#username")
    const password=page.locator("#password") 
    const signIn=page.locator("#signInBtn");
    await username.fill(" rahulshettyacademy ");
    await password.fill("Learning@830$3mK2");
   //  await expect(page).check()
   const dropdown=page.locator("select.form-control");
   await dropdown.selectOption('Student');
   await page .locator(".radiotextsty").last().click();
   console.log( await page .locator(".radiotextsty").last().click().ischecked)
   await page.locator("#okayBtn").click();
   await page.locator("#terms").click();
   await signIn.click();
   

   await page.pause();
  

    

});

//
//console.log(await page.locator('[style="display: block;"]').textContent());




// now get text from inner div

// const errorContainer = page.locator('[style="display: block;""]');

// await expect(errorContainer).toBeVisible();
// const errorMsg = errorContainer.locator('.user-form-error-msg');

// console.log(await errorMsg.textContent());
// await page.waitForTimeout(5000);



  // await page.getByLabel('Email').fill('vishnu@123');
  // await page.getByLabel('Password').fill('12345678');

  // await page.getByRole('button', { name: 'Log In' }).click();




