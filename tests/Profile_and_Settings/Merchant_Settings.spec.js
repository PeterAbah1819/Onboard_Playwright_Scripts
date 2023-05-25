// add the test and expect modules as well as the playwright modules
const { test, expect } = require('@playwright/test');

test('Test merchant settings confirm page items', async ({ page }) => {
    await page.goto('https://app.dev.onboardpay.co/merchants/auth/sign-in');


//Sign in with valid email and OTP
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

    //Click on settings
    await page.getByRole('link', { name: 'Settings' }).click();
    //Confirm that payment methods tab is displayed
    await expect(page.getByRole('link', { name: 'Payment Methods' })).toHaveText(/Payment Methods/);
    //Confirm that notifications tab is displayed
    await expect(page.getByRole('link', { name: 'Notifications' })).toHaveText(/Notifications/);
    //Click on the notifications tab and confirm the text and radio buttons are displayed
    await page.getByRole('link', { name: 'Notifications' }).click();

    await expect(page.getByText('Push notifications')).toHaveText(/Push notifications/);
    await expect(page.getByText('Telegram notifications')).toHaveText(/Telegram notifications/);
    await expect(page.getByText('Email notifications')).toHaveText(/Email notifications/);

    

    //Click back to payment menthods tab
    await page.getByRole('link', { name: 'Payment Methods' }).click();
    //Confirm the headers
    await expect(page.getByRole('heading', { name: 'Account Name' })).toHaveText(/Account Name/);
    await expect(page.getByRole('heading', { name: 'Account Number / ID' })).toHaveText(/Account Number/);
    await expect(page.getByRole('heading', { name: 'Financial institutions' })).toHaveText(/Financial institutions/);


})






test('Test merchant add bank payment methods invalid, incomplete, empty and valid account number', async ({ page }) => {
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





//Test add payment methods invalid account number

    //Click on settings
    await page.getByRole('link', { name: 'Settings' }).click();
    //Confirm that payment methods tab is displayed
    await expect(page.getByRole('link', { name: 'Payment Methods' })).toHaveText(/Payment Methods/);




    //add  payment method by clicking on add payment method
    await page.getByRole('link', { name: 'Add payment method' }).click();
    //Select bank
    await page.getByRole('button', { name: 'Bank transfer' }).click();
    //Add account number
    await page.getByLabel('Account Number').click();
    await page.getByLabel('Account Number').fill(')(*&^^%%$');

    // //wait for page to load
    await page.waitForTimeout(5000)
    
    //Enter acccess bank as financial institution
    await page.getBy("Bank Name").click();
    await page.getByRole('combobox', { name: 'bankName' }).fill('Access');
    await page.getByRole('option', { name: 'Access Bank' }).click();
    //Click on save
    await page.getByRole('button', { name: 'Save' }).click();
    //Confirm error message
    await expect(page.getByText('Account number is not valid')).toHaveText(/Account number is not valid/);




//Test add payment methods incomplete account number

    //add  payment method by clicking on add payment method
    await page.getByRole('link', { name: 'Add payment method' }).click();
    //Select bank
    await page.getByRole('button', { name: 'Bank transfer' }).click();
    //Add account number
    await page.getByLabel('Account Number').click();
    await page.getByLabel('Account Number').fill('09876543');
    //Enter acccess bank as financial institution
    await page.getByLabel('Bank Name').click();
    await page.getByLabel('Bank Name').fill('Access');
    await page.getByRole('option', { name: 'Access Bank' }).click();
    //Click on save
    await page.getByRole('button', { name: 'Save' }).click();
    //Confirm error message
    await expect(page.getByText('Account number is not valid')).toHaveText(/Account number is not valid/);



//Test add payment methods empty account number

    //add  payment method by clicking on add payment method
    await page.getByRole('link', { name: 'Add payment method' }).click();
    //Select bank
    await page.getByRole('button', { name: 'Bank transfer' }).click();
    //Add account number
    await page.getByLabel('Account Number').click();
    await page.getByLabel('Account Number').fill(' ');
    //Enter acccess bank as financial institution
    await page.getByLabel('Bank Name').click();
    await page.getByLabel('Bank Name').fill('Access');
    await page.getByRole('option', { name: 'Access Bank' }).click();
    //Click on save
    await page.getByRole('button', { name: 'Save' }).click();
    //Confirm error message
    await expect(page.getByText('Account number is not valid')).toHaveText(/Account number is required/);




//Test add payment methods valid account number

    //Add account number
    await page.getByLabel('Account Number').click();
    await page.getByLabel('Account Number').fill('0909090909');
    //Enter polaris bank as financial institution
    await page.getByLabel('Bank Name').click();
    await page.getByLabel('Bank Name').fill('polaris');
    await page.getByRole('option', { name: 'Polaris Bank' }).click();
    //Click on save
    await page.getByRole('button', { name: 'Save' }).click();


    //Enter otp and save the edit
    await page.locator('.pin-input').first().fill('4');
    await page.locator('input:nth-child(2)').fill('9');
    await page.locator('input:nth-child(3)').fill('3');
    await page.locator('input:nth-child(4)').fill('0');
    await page.locator('input:nth-child(5)').fill('1');
    await page.locator('input:nth-child(6)').fill('9');
    //Click on save
    await page.getByRole('button', { name: 'Save' }).click();
    //Confirm toast message that payment method was added
    await expect(page.getByText('Payment method saved')).toHaveText(/Payment method updated/);





})






test('Test merchant add wallet payment methods invalid, incomplete, empty and valid account number', async ({ page }) => {
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





//Test edit payment methods invalid account number

    //Click on settings
    await page.getByRole('link', { name: 'Settings' }).click();
    //Confirm that payment methods tab is displayed
    await expect(page.getByRole('link', { name: 'Payment Methods' })).toHaveText(/Payment Methods/);

//Add wallet payment method by clicking on the add payment method button

    //Click on add payment method
    await page.getByRole('link', { name: 'Add payment method' }).click();
    //Click on mobile wallet
    await page.getByRole('button', { name: 'Mobile wallet' }).click();
    //Select the wallet type (pocket app)
    await page.locator('#headlessui-listbox-button-8').click();
    await page.getByRole('option', { name: 'PocketApp (Formerly Abeg)' }).click();
    //Add pocket app handle (tester)
    await page.getByLabel('Pocketapp handle').click();
    await page.getByLabel('Pocketapp handle').fill('tester');
    //Click on confirm and enter otp
    await page.getByRole('button', { name: 'Confirm' }).click();
    await page.locator('.pin-input').first().fill('4');
    await page.locator('input:nth-child(2)').fill('9');
    await page.locator('input:nth-child(3)').fill('3');
    await page.locator('input:nth-child(4)').fill('0');
    await page.locator('input:nth-child(5)').fill('1');
    await page.locator('input:nth-child(6)').fill('9');
    //Click on save and confirm payment method is saved from toast
    await page.getByRole('button', { name: 'Save' }).click();
    await expect(page.getByText('Payment method saved')).toHaveText(/Payment method saved/);


})







test('Test merchant edit bank payment methods invalid, incomplete, empty and valid account number', async ({ page }) => {
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





//Test edit payment methods invalid account number

    //Click on settings
    await page.getByRole('link', { name: 'Settings' }).click();
    //Confirm that payment methods tab is displayed
    await expect(page.getByRole('link', { name: 'Payment Methods' })).toHaveText(/Payment Methods/);

    //Edit already added payment method by clicking on edit
    await page.locator('div:nth-child(13) > .grid > .flex > button').first().click();

    //Add account number
    await page.getByLabel('Account Number').click();
    await page.getByLabel('Account Number').press('Meta+a');
    await page.getByLabel('Account Number').fill(')(*&^^%%$');
    //Enter acccess bank as financial institution
    await page.getByLabel('Bank Name').click();
    await page.getByLabel('Bank Name').press('Meta+a');
    await page.getByLabel('Bank Name').fill('Access');
    await page.getByRole('option', { name: 'Access Bank' }).click();


    //Click on save
    await page.getByRole('button', { name: 'Save' }).click();
    //Confirm error message
    await expect(page.getByText('Account number is not valid')).toHaveText(/Account number is not valid/);


//Test edit payment methods incomplete account number

    //Add account number
    await page.getByLabel('Account Number').click();
    await page.getByLabel('Account Number').press('Meta+a');
    await page.getByLabel('Account Number').fill('09876543');
    //Enter acccess bank as financial institution
    await page.getByLabel('Bank Name').click();
    await page.getByLabel('Bank Name').press('Meta+a');
    await page.getByLabel('Bank Name').fill('Access');
    await page.getByRole('option', { name: 'Access Bank' }).click();
    //Click on save
    await page.getByRole('button', { name: 'Save' }).click();
    //Confirm error message
    await expect(page.getByText('Account number is not valid')).toHaveText(/Account number is not valid/);



//Test edit payment methods empty account number

    //Add account number
    await page.getByLabel('Account Number').click();
    await page.getByLabel('Account Number').press('Meta+a');
    await page.getByLabel('Account Number').fill(' ');
    //Enter acccess bank as financial institution
    await page.getByLabel('Bank Name').click();
    await page.getByLabel('Bank Name').press('Meta+a');
    await page.getByLabel('Bank Name').fill('Access');
    await page.getByRole('option', { name: 'Access Bank' }).click();
    //Click on save
    await page.getByRole('button', { name: 'Save' }).click();
    //Confirm error message
    await expect(page.getByText('Account number is not valid')).toHaveText(/Account number is required/);



//Test edit payment methods valid account number

    //Add account number
    await page.getByLabel('Account Number').click();
    await page.getByLabel('Account Number').press('Meta+a');
    await page.getByLabel('Account Number').fill('0987654321');
    //Enter polaris bank as financial institution
    await page.getByLabel('Bank Name').click();
    await page.getByLabel('Bank Name').press('Meta+a');
    await page.getByLabel('Bank Name').fill('polaris');
    await page.getByRole('option', { name: 'Polaris Bank' }).click();
    //Click on save
    await page.getByRole('button', { name: 'Save' }).click();


    //Enter otp and save the edit
    await page.locator('.pin-input').first().fill('4');
    await page.locator('input:nth-child(2)').fill('9');
    await page.locator('input:nth-child(3)').fill('3');
    await page.locator('input:nth-child(4)').fill('0');
    await page.locator('input:nth-child(5)').fill('1');
    await page.locator('input:nth-child(6)').fill('9');
    //Click on save
    await page.getByRole('button', { name: 'Save' }).click();
    //Confirm toast message that payment method was saved
    await expect(page.getByText('Payment method saved')).toHaveText(/Payment method updated/);

  


})



test('Test merchant edit wallet payment methods invalid, incomplete, empty and valid account number', async ({ page }) => {
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





//Test edit wallet payment method

    //Click on settings
    await page.getByRole('link', { name: 'Settings' }).click();
    //Confirm that payment methods tab is displayed
    await expect(page.getByRole('link', { name: 'Payment Methods' })).toHaveText(/Payment Methods/);


    //Edit already added payment method by clicking on edit
    await page.locator('.grid > .flex > button').first().click();
    //Edit wallet handle and click on save
    await page.getByLabel('Chipper cash tag').click();
    await page.getByLabel('Chipper cash tag').press('Meta+a');
    await page.getByLabel('Chipper cash tag').fill('testing');
    await page.getByRole('button', { name: 'Save' }).click();
    //Enter otp and save  
    await page.locator('.pin-input').first().fill('4');
    await page.locator('input:nth-child(2)').fill('9');
    await page.locator('input:nth-child(3)').fill('3');
    await page.locator('input:nth-child(4)').fill('0');
    await page.locator('input:nth-child(5)').fill('1');
    await page.locator('input:nth-child(6)').fill('9');
    await page.getByRole('button', { name: 'Save' }).click();


    //Confirm toast message that payment method was saved
    await expect(page.getByText('Payment method saved')).toHaveText(/Payment method updated/);
    

})









test('Test merchant delete payment method', async ({ page }) => {
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





//Test add payment methods invalid account number

    //Click on settings
    await page.getByRole('link', { name: 'Settings' }).click();
    //Confirm that payment methods tab is displayed
    await expect(page.getByRole('link', { name: 'Payment Methods' })).toHaveText(/Payment Methods/);

//Delete payment method by clicking on the delete icon
    //Click on delete icon for the first payment method
    await page.locator('button:nth-child(2)').first().click();
    //Click on delete
    await page.getByRole('button', { name: 'Delete' }).click();
    //Confirm toast message that the payment method was deleted
    await expect(page.getByText('Payment method deleted')).toHaveText(/Payment method deleted/);



})