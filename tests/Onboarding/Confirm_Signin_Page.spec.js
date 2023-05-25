// add the test and expect modules as well as the playwright modules
const { test, expect } = require('@playwright/test');

//Visit customer login page
test('Visit Customer login page', async ({ page }) => {

//*Customer*//

    await page.goto('https://app.dev.onboardpay.co/auth/sign-in');

    // Expect a title to contain string.
     await expect(page).toHaveTitle(/Onboard Customer/);
  
    // Expect a title to contain string.
    await expect(page.getByRole('heading', { name: 'Login or create an account' })).toContainText(/Login or create an account/);


    // Expect a title to contain string.
    await expect(page.getByLabel('Email address')).toContainText("");



    // Expect a title to contain string.
     await expect(page.getByText('Onboard is in beta. Please share your feedback here')).toContainText(/Onboard is in beta. Please share your feedback here/);

    // Expect a title to contain string.
     await expect(page.getByText('By clicking continue, you accept Onboard’s Terms of Service and Privacy Policy.')).toContainText(/By clicking continue, you accept Onboard’s Terms of Service and Privacy Policy./);
     
    // Expect a title to contain string.
     await expect(page.getByText('Copyright 2023 Onboard Network. All rights reserved.')).toContainText(/Copyright 2023 Onboard Network. All rights reserved./);
     
/*Confirm Terms and Privacy Text*/

     //Click on terms of service.
     await page.getByText('Terms of Service').click(); 
     await page.waitForLoadState("networkidle")

     // Expect a title to contain string.
     await expect(page).toHaveTitle(/Terms & Conditions- Onboard/);

     // Expect a title to contain string.
     await expect(page.getByText('2. About ONBOARD and its Services')).toContainText(/About ONBOARD and its Services/);
    


     //Go back to the login page
     await page.goto('https://app.dev.onboardpay.co/auth/sign-in'); 

     //Click on privacy policy.
     await page.getByText('Privacy Policy.').click(); 
     await page.waitForLoadState("networkidle")

     // Expect a title to contain string.
     await expect(page).toHaveTitle(/Privacy Policy - Onboard/);

     // Expect a title to contain string.
     await expect(page.getByText('THE DATA THAT WE MAY COLLECT:')).toContainText(/THE DATA THAT WE MAY COLLECT/);

  })








//Visit merchant login page
  test('Visit Merchant login page', async ({ page }) => {
    await page.goto('https://app.dev.onboardpay.co/merchants/auth/sign-in');

  //*Merchant*//

    
    // Expect a title to contain string.
     await expect(page).toHaveTitle(/Onboard Merchant/);
  
    // Expect a title to contain string.
    await expect(page.getByRole('heading', { name: 'Login or create an account' })).toContainText(/Login or create an account/);


    // Expect a title to contain string.
    await expect(page.getByLabel('Email address')).toContainText("");



    // Expect a title to contain string.
     await expect(page.getByText('Onboard is in beta. Please share your feedback here')).toContainText(/Onboard is in beta. Please share your feedback here/);

    // Expect a title to contain string.
     await expect(page.getByText('By clicking continue, you accept Onboard’s Terms of Service and Privacy Policy.')).toContainText(/By clicking continue, you accept Onboard’s Terms of Service and Privacy Policy./);
     
    // Expect a title to contain string.
     await expect(page.getByText('Copyright 2023 Onboard Network. All rights reserved.')).toContainText(/Copyright 2023 Onboard Network. All rights reserved./);
     
  
/*Confirm Terms and Privacy Text*/


     //Click on terms of service.
     await page.getByText('Terms of Service').click(); 

     // Expect a title to contain string.
     await expect(page).toHaveTitle(/Terms & Conditions- Onboard/);

     // Expect a title to contain string.
     await expect(page.getByText('2. About ONBOARD and its Services')).toContainText(/About ONBOARD and its Services/);
    


     //Go back to the login page
     await page.goto('https://app.dev.onboardpay.co/merchants/auth/sign-in'); 

     //Click on privacy policy.
     await page.getByText('Privacy Policy.').click(); 


     // Expect a title to contain string.
     await expect(page).toHaveTitle(/Privacy Policy - Onboard/);

     // Expect a title to contain string.
     await expect(page.getByText('THE DATA THAT WE MAY COLLECT:')).toContainText(/THE DATA THAT WE MAY COLLECT/);

  })