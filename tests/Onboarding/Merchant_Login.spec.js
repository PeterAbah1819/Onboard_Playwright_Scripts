// add the test and expect modules as well as the playwright modules
const { test, expect } = require('@playwright/test');

test('Test merchant login', async ({ page }) => {
    await page.goto('https://app.dev.onboardpay.co/merchants/auth/sign-in');
  

//Testing with incorrect emails and testing disabled continue button
    // Expect a page to contain string.
    await expect(page.locator('#root > main > section > h1')).toContainText(/Login or create an account/);

    // Expect a email textbox to be empty.
    await expect(page.getByLabel('Email address')).toContainText("");


    //Enter empty email address
    await page.getByLabel('Email address').fill(' ');
    //Confirm button disabled
    await expect(page.getByRole('button', { name: 'Continue' })).toBeDisabled(true)



    //Enter incomplete email address (without domain)
    await page.getByLabel('Email address').fill('peterabah3.com');
    //Confirm button disabled
    await expect(page.getByRole('button', { name: 'Continue' })).toBeDisabled(true)

    
    
    //Enter incomplete email address (without .com)
    await page.getByLabel('Email address').fill('peterabah3@mailinator');
    //Confirm button disabled
    await expect(page.getByRole('button', { name: 'Continue' })).toBeDisabled(true)


//Testing change email
    //Reload the page
    await page.reload();
    //Enter email again
    await page.getByLabel('Email address').fill('peterabah3@mailinator.com');
    //Click on continue
    await page.getByRole('button', { name: 'Continue' }).click();
    //Click on change email
    await page.getByRole('button', { name: 'Change email' }).click();
    // Expect a email textbox to be empty.
    await expect(page.getByLabel('Email address')).toContainText("");


//Testing wrong otp input
    //Enter email address
    await page.getByLabel('Email address').fill('peterabah3@mailinator.com');
    //Click on continue 
    await page.getByRole('button', { name: 'Continue' }).click();
    //Verify the email entered is the same displayed on the OTP screen
    await expect(page.getByText('peterabah3@mailinator.com')).toContainText(/peterabah3@mailinator.com/);
    //Enter incorrect Pin
    await page.locator('.pin-input').first().fill('4');
    await page.locator('input:nth-child(2)').fill('9');
    await page.locator('input:nth-child(3)').fill('1');
    await page.locator('input:nth-child(4)').fill('0');
    await page.locator('input:nth-child(5)').fill('1');
    await page.locator('input:nth-child(6)').fill('2');

    //Confirm that the error message incorrect otp is displayed
    await expect(page.getByText('Incorrect PIN entered')).toContainText(/Incorrect PIN entered/);


// //Verifying terms and privacy
//     //Verify Terms of service
//     const page1Promise = page.waitForEvent('popup');
//     await page.getByRole('link', { name: 'Terms of use' }).click();
//     const page1 = await page1Promise;

//     await page.waitForLoadState("networkidle")
    
//     //Verify terms doc is opened
//     await expect(page1.getByText('Terms & Conditions- Onboard').nth(1)).toContainText(/Terms & Conditions- Onboard/);
//     //Close the page
//     page1.close();


//     //Verify Privacy and policy
//     const page2Promise = page.waitForEvent('popup');
//     await page.getByRole('link', { name: 'Privacy policy' }).click();
//     const page2 = await page2Promise;
//     //Verify terms doc is opened
//     await expect(page2.getByText('Privacy Policy - Onboard').nth(1)).toContainText(/Privacy Policy - Onboard/);
//     //Close the page
//     page2.close();







//Successfully login with correct details

    //Click on change email
    await page.getByRole('button', { name: 'Change email' }).click();
    // Expect a email textbox to be empty.
    await expect(page.getByLabel('Email address')).toContainText("");



    //Enter email address
    await page.getByLabel('Email address').fill('peterabah3@mailinator.com');
    //Click on continue 
    await page.getByRole('button', { name: 'Continue' }).click();
    //Verify the email entered is the same displayed on the OTP screen
    await expect(page.getByText('peterabah3@mailinator.com')).toContainText(/peterabah3@mailinator.com/);

    //Enter correct Pin
    await page.locator('.pin-input').first().fill('4');
    await page.locator('input:nth-child(2)').fill('9');
    await page.locator('input:nth-child(3)').fill('3');
    await page.locator('input:nth-child(4)').fill('0');
    await page.locator('input:nth-child(5)').fill('1');
    await page.locator('input:nth-child(6)').fill('9');

    

    
  });


  test('Test customer signing in on merchant', async ({ page }) => {
    await page.goto('https://app.dev.onboardpay.co/merchants/auth/sign-in');

//Testing customer signing into merchant view and getting the redirect popup
    //Enter a customer email address
    await page.getByLabel('Email address').fill('peterabah1@mailinator.com');
    //Click on continue 
    await page.getByRole('button', { name: 'Continue' }).click();

    // //wait for page to finish loading
    // await page.waitForLoadState('networkidle')
    // //Verify the email entered is the same displayed on the OTP screen
    // await expect(page.getByText('peterabah1@mailinator.com')).toContainText(/peterabah1@mailinator.com/);

    // //Enter correct Pin
    // await page.locator('.pin-input').first().fill('4');
    // await page.locator('input:nth-child(2)').fill('9');
    // await page.locator('input:nth-child(3)').fill('3');
    // await page.locator('input:nth-child(4)').fill('0');
    // await page.locator('input:nth-child(5)').fill('1');
    // await page.locator('input:nth-child(6)').fill('9');


//Confirm the redirect modal is dislayed with text this email is already registered as a customer

    //Confirm modal is displayed with text
    await expect(page.getByRole('heading', { name: 'This email is already registered as a customer' })).toHaveText(/This email is already registered as a customer/);
    //Click on go to customer app
    await page.getByRole('button', { name: 'Go to customer app' }).click();
    //Confirm customer app is loaded with ads
    await page.getByRole('heading', { name: 'Best ads for you' }).click();


});