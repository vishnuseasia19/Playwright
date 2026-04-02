
   


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

test("UI Login ", async ({page, context})=>
   
{  
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    const username=page.locator("#username")
    const password=page.locator("#password") 
    const signIn=page.locator("#signInBtn");
    const blinkmsg=page.locator('.blinkingText')
    await username.fill(" rahulshettyacademy ");
    await password.fill("Learning@830$3mK2");
   //  await expect(page).check()
   const dropdown=page.locator("select.form-control");
   await dropdown.selectOption('Student');
   await page .locator(".radiotextsty").last().click();
 //  console.log( await page .locator(".radiotextsty").last().click())
   await page.locator("#okayBtn").click();
   await page.locator("#terms").click();
   await signIn.click();
   await expect(blinkmsg).toHaveAttribute("class","blinkingText");
      const [page2] = await Promise.all([
      
         context.waitForEvent('page'),
         blinkmsg.click(),
      ]);

       const text=await page2.locator(".red").textContent();
       console.log(text);



   

 
   

   await page.pause();
  

    

});
//const { test, expect } = require('@playwright/test');

//const { test, expect} = require('@playwright/test');

test("Get email from child and fill in parent", async ({ browser }) => {

   const context = await browser.newContext();
   const page = await context.newPage();

   // 1️⃣ Open Login Page (Parent)
   await page.goto("https://rahulshettyacademy.com/loginpagePractise/");

   // 2️⃣ Click blinking text to open child window
   const documentLink = page.locator(".blinkingText");

   const [childPage] = await Promise.all([
      context.waitForEvent('page'),
      documentLink.click(),
   ]);

   // 3️⃣ Wait for child page to load
   await childPage.waitForLoadState('domcontentloaded');

   // 4️⃣ Get email text from child page
   const text = await childPage.locator(".red").textContent();
   console.log("Full Text:", text);
   const arrayText = text.split("@");
   console.log("Array Text:", arrayText);
   const domainPart = arrayText[1].split(" ")[0];
   console.log("Domain Part:", domainPart);

   await page.locator("#username").fill(domainPart);

   console.log(await page.locator("#username").fill(domainPart));
   // // 5️⃣ Extract email domain
   // const email = text.split("@")[1].split(" ")[0];
   // console.log("Extracted Email:", email);

   // 6️⃣ Switch back to parent page
   // await page.bringToFront();

   // 7️⃣ Fill extracted email in username field
   // await page.locator("#username").fill(domainPart);

   // Assertion (optional)
   await expect(page.locator("#username")).toHaveValue(domainPart);

   await page.pause();
});

test('@Child windows hadl', async ({browser})=>
 {
    const context = await browser.newContext();
    const page =  await context.newPage();
    const userName = page.locator('#username');
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    const documentLink = page.locator("[href*='documents-request']");
 
    const [newPage]=await Promise.all(
   [
      context.waitForEvent('page'),//listen for any new page pending,rejected,fulfilled
      documentLink.click(),
   
   ])//new page is opened
   
 
   const  text = await newPage.locator(".red").textContent();
    const arrayText = text.split("@")
    const domain =  arrayText[1].split(" ")[0]
    //console.log(domain);
    await page.locator("#username").fill(domain);
    console.log(await page.locator("#username").inputValue());
    await newPage.pause();
 
 })
 
 