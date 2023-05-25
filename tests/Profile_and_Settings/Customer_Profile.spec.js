// add the test and expect modules as well as the playwright modules
const { test, expect } = require('@playwright/test');

test('Test customer profile', async ({ page }) => {
    await page.goto('https://app.dev.onboardpay.co/auth/sign-in');

//Successfully login with correct details
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



    //Close the notification modal
    await page.getByRole('article').getByRole('button').first().click();



//Navigate to customer profile 


    //click on welcome at the top right
    await page.getByRole('button', { name: 'Welcome' }).click();
    //Click on profile details
    await page.getByRole('link', { name: 'Profile details' }).click();

//Confirm signed in customer details

    //Verify full name is correct
    // Expect a textbox to contain string.
    await page.getByRole('button', { name: 'Welcome' }).click();
    //await page.locator('fullName').first().click();
    await expect(page.locator('#fullName')).toContainText(/PETER INNOCENT ABAH/);

    //Verify email is correct 
    // Expect a textbox to contain string.
    await expect(page.locator('email')).toContainText(/peterabah1@mailinator.com/);


})