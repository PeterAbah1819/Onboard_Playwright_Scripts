// add the test and expect modules as well as the playwright modules
const { test, expect } = require('@playwright/test');

test('Create Buy Ad, without OPN Provisioned', async ({ page }) => {
    await page.goto('https://app.dev.onboardpay.co/merchants/auth/sign-in');


    //Sign in with valid email and OTP
    //Enter email address
    await page.getByLabel('Email address').fill('peterabah!2@mailinator.com');
    //Click on continue 
    await page.getByRole('button', { name: 'Continue' }).click();
    //Verify the email entered is the same displayed on the OTP screen
    await expect(page.getByText('peterabah!2@mailinator.com')).toContainText(/peterabah!2@mailinator.com/);

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
