const {test,exprect}=require('@playwright/test');
test("getByElement",async({page})=>{
    await page.goto("https://rahulshettyacademy.com/angularpractice/");
    await page.getByLabel("Check me out if you Love IceCreams!").click();
    await page.getByLabel("Student");

    await page.pause();

})
