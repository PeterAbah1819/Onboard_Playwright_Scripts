// add the test and expect modules as well as the playwright modules
const { test, expect } = require('@playwright/test');

test('Test merchant profile', async ({ page }) => {
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



    //Close the notification modal
    await page.getByRole('article').getByRole('button').first().click();
    


//Navigate to customer profile 


    //Click on the merchant name at the top right
    await page.getByRole('button', { name: 'TessTest' }).click();
    //Click on profile details
    await page.getByRole('link', { name: 'Profile details' }).click();
    //Click on the top right too
    await page.locator('div').filter({ hasText: 'TessTestTessTestVerifiedProfile detailsConnect walletLog outSwitch to customer' }).nth(2).click();
  

//Confirm signed in customer details

    //Verify full name is correct
    // Expect a textbox to contain string.
    await expect(page.locator('fullName')).toContainText(/PETER INNOCENT ABAH/);

    //Verify email is correct 
    // Expect a textbox to contain string.
    await expect(page.locator('email')).toContainText(/peterabah3@mailinator.com/);


    await expect(page.getByText('Your details have been verified and cannot be edited. If you\'d like to make a ch')).toHaveText("Your details have been verified and cannot be edited. If you\'d like to make a ch");



})