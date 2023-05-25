// add the test and expect modules as well as the playwright modules
const { test, expect } = require('@playwright/test');

test('View and filter customer orders (Completed, Ongoing, Cancelled, Disputed in Buy and Sell', async ({ page }) => {
    await page.goto('https://app.dev.onboardpay.co/auth/sign-in');


     //Enter email address
     await page.getByLabel('Email address').fill('peterabah1@mailinator.com');
     //Click on continue 
     await page.getByRole('button', { name: 'Continue' }).click();
     //Verify the email entered is the same displayed on the OTP screen
     await expect(page.getByText('peterabah1@mailinator.com')).toContainText(/peterabah1@mailinator.com/);
 
     //Enter correct Pin
     await page.locator('.pin-input').first().fill('4');
     await page.locator('input:nth-child(2)').fill('9');
     await page.locator('input:nth-child(3)').fill('3');
     await page.locator('input:nth-child(4)').fill('0');
     await page.locator('input:nth-child(5)').fill('1');
     await page.locator('input:nth-child(6)').fill('9');
 
 
      //wait for page to load
     await page.waitForTimeout(2000)
 
     //Close the notification modal by clicking on skip
     await page.getByRole('button').nth(2).click();
 












})