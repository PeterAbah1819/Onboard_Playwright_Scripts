// add the test and expect modules as well as the playwright modules
const { test, expect } = require('@playwright/test');

test('Test merchant logout', async ({ page }) => {
    await page.goto('https://app.dev.onboardpay.co/merchants/auth/sign-in');

//Successfully login with correct details
    //Enter email address
    await page.getByLabel('Email address').fill('peterabah3df@mailinator.com');
    //Click on continue 
    await page.getByRole('button', { name: 'Continue' }).click();
    //Verify the email entered is the same displayed on the OTP screen
    await expect(page.getByText('peterabah3df@mailinator.com')).toContainText(/peterabah3df@mailinator.com/);

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
    


    


//Logout

    //click on welcome at the top right
    await page.getByRole('button', { name: 'TessTest' }).click();
  
    //Click on logout
    await page.getByRole('button', { name: 'Log out' }).click();


//Confirm that the merchant is logged out by verifying the empty email textbox in the sign in page

    // Expect a title to contain string.
    await expect(page.getByLabel('Email address')).toContainText("");

})