// add the test and expect modules as well as the playwright modules
const { test, expect } = require('@playwright/test');

test('Test customer signup and skip KYC', async ({ page }) => {
    await page.goto('https://app.dev.onboardpay.co/auth/sign-in');
  

//Testing signup with incremental email address
    // Expect a page to contain string.
    await expect(page.getByRole('heading', { name: 'Login or create an account' })).toContainText(/Login or create an account/);

    // Expect a email textbox to be empty.
    await expect(page.getByLabel('Email address')).toContainText("");

    //Function for random email save to email variable
    // Generate a random email address
    const email = 'AutoCust' + Math.random().toString(36).substring(7) + '@mailinator.com';

    //Enter random/dynamic email address
    await page.getByLabel('Email address').fill(email);
    
    //Click on continue 
    await page.getByRole('button', { name: 'Continue' }).click();
    //Verify the email entered is the same displayed on the OTP screen
   // await expect(page.getByText('peterabah1@mailinator.com')).toContainText(/peterabah1@mailinator.com/);
 
    //Enter correct Pin
    await page.locator('.pin-input').first().fill('4');
    await page.locator('input:nth-child(2)').fill('9');
    await page.locator('input:nth-child(3)').fill('3');
    await page.locator('input:nth-child(4)').fill('0');
    await page.locator('input:nth-child(5)').fill('1');
    await page.locator('input:nth-child(6)').fill('9');

    //Confirm user is redirected to onboarding flow
    await expect(page.getByRole('heading', { name: 'Now, let’s verify your identity!' })).toContainText(/Now, let’s verify your identity!/);


//Skip the onboarding and confirm that the kyc banner is displayed with continue

    //Click on skip
    await page.getByRole('button', { name: 'Skip for now' }).click();
    //Confirm skip
    await page.getByRole('button', { name: 'Skip', exact: true }).click();

    //Confirm that the user sees KYC banner with continue button
    await expect(page.getByRole('paragraph').filter({ hasText: 'Complete your profile to start trading. Continue' })).toContainText(/Complete your profile to start trading. Continue/);


    //Click on continue on the banner
    await page.getByRole('button', { name: 'Continue' }).click();


    //Clicking on continue leads the user back to the onboarding flow
    await expect(page.getByRole('heading', { name: 'Now, let’s verify your identity!' })).toContainText(/Now, let’s verify your identity!/);



})

