// add the test and expect modules as well as the playwright modules
const { test, expect } = require('@playwright/test');

test('Create Buy Ad, without KYC Approved', async ({ page }) => {
    await page.goto('https://app.dev.onboardpay.co/merchants/auth/sign-in');


    //Sign in with valid email and OTP
    //Enter email address
    await page.getByLabel('Email address').fill('peterabah3deqcvwf@mailinator.com');
    //Click on continue 
    await page.getByRole('button', { name: 'Continue' }).click();
    //Verify the email entered is the same displayed on the OTP screen
    await expect(page.getByText('peterabah3deqcvwf@mailinator.com')).toContainText(/peterabah3deqcvwf@mailinator.com/);

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

     
//Try to create an ad as a merchant without KYC and verify that the document under review modal is displayed
     //Click on the create ad button on the home page
     await page.getByRole('button', { name: 'Create new ad' }).click();

     //verify that the modal is displayed showing that documents are under review
     await expect (page.getByRole('heading', { name: 'Your profile is being verified' })).toHaveText(/Your profile is being verified/);
     await expect (page.getByText('We\'re processing your documents to verify your identity before you can trade on ')).toContain(/We\'re processing your documents to verify your identity before you can trade on /);
     
     //Close the modal by clicking on Okay
     await page.getByRole('button', { name: 'Okay', exact: true }).click();

     //Click on the ads tab and try to create an ad from there
     await page.getByRole('link', { name: 'Ads' }).click();

     await page.getByRole('button', { name: 'Create new ad' }).click();


     //verify that the modal is displayed showing that documents are under review
     await expect (page.getByRole('heading', { name: 'Your profile is being verified' })).toHaveText(/Your profile is being verified/);
     await expect (page.getByText('We\'re processing your documents to verify your identity before you can trade on ')).toContain(/We\'re processing your documents to verify your identity before you can trade on /);
     
     //Close the modal by clicking on Okay
     await page.getByRole('button', { name: 'Okay', exact: true }).click();
   




})







test('Create Buy Ad, Invalid values to confirm copies and errors', async ({ page }) => {
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

//Try to create an ad as a merchant with KYC approved with invalid values while verifying copies and error messages

    //Click on create ad from the home page
     await page.getByRole('button', { name: 'Create new ad' }).click();
     //Confirm copy, headers and subtexts
     await expect (page.getByText('Select a network')).toHaveText(/Select a network/);

     //Search for the wrong network name (BNB) and confirm copy
     await page.getByPlaceholder('Type network name').click();
     await page.getByPlaceholder('Type network name').fill('BNB');
     //Confirm copy says unable to find what was searched for
     await expect (page.getByRole('heading', { name: 'Can’t find your crypto currency?' })).toHaveText(/Can’t find your crypto currency?/);
     
     //Search for the right network name (BSC)
     await page.getByPlaceholder('Type network name').click();
     await page.getByPlaceholder('Type network name').press('Meta+a');
     await page.getByPlaceholder('Type network name').fill('Bsc');
     //Select BSC testnet network
     await page.locator('a').filter({ hasText: 'BSC - Binance Smart Chain Testnet' }).click();

     //Confirm the wallet address and copy displayed
     await expect (page.getByRole('heading', { name: 'Your trading wallet' })).toHaveText(/Your trading wallet/);
     await expect (page.getByText('0x71b824de1a18c60...a70fdfc53cd1b9278d2')).toHaveText(/0x71b824de1a18c60...a70fdfc53cd1b9278d2/);
     await expect (page.getByText('This is your Binance Smart Chain Testnet trading wallet. All your transactions o')).toContain(/This is your Binance Smart Chain Testnet trading wallet. All your transactions o/);
   
     //Click on continue to start ad creation info
     await page.getByRole('button', { name: 'Continue' }).click();

     //Cofirm the header displays Create an ad
     await expect (page.getByRole('heading', { name: 'Create an ad' })).toHaveText(/Create an ad/);

     //Select buy to create a buy ad
     await page.getByRole('button', { name: 'Buy' }).click();


     //Verify the flow hearder copy
     await expect (page.getByRole('heading', { name: 'Set Ads type and Price' })).toHaveText(/Set Ads type and Price/);
     await expect (page.getByRole('heading', { name: 'Set Ads Amount and Payment details' })).toHaveText(/Set Ads Amount and Payment details/);
     await expect (page.getByRole('heading', { name: 'Set Auto response and ads note' })).toHaveText(/Set Auto response and ads note/);
     

     //Verify text field headers
     await expect (page.getByRole('heading', { name: 'I want to buy' })).toHaveText(/I want to buy/);
     await expect (page.getByRole('heading', { name: 'I have' })).toHaveText(/I have/);
     await expect (page.getByRole('heading', { name: 'Rate type' })).toHaveText(/Rate type/);
     await expect (page.getByRole('heading', { name: 'Set your margin' })).toHaveText(/Set your margin/);
   
     //Confirm copy about rate change
     await expect(page.getByText('Your rate will change based on the current market rate.')).toHaveText(/Your rate will change based on the current market rate./);
     //Chnage the rate type and confirm the copy
     await page.getByRole('button', { name: 'Flexible price' }).click();
     await page.getByRole('option', { name: 'Fixed price Your rate is fixed and will not change based on the current market rate' }).click();
     //Confirm the rate type copy for fixed rate
     await expect (page.getByText('Your rate is fixed and will not change based on the current market rate')).toHaveText(/Your rate is fixed and will not change based on the current market rate/);
   


     await page.getByRole('button', { name: 'Continue' }).click();

     //Confirm header text as Buy {token} with {Fiat}
     await expect (page.getByRole('heading', { name: 'Buy BNB with NGN' })).toHaveText(/Buy BNB with NGN/);

//Set minimum amount and maximum amounts and check that they align with the total amount entered
     //Enter total amount 100k
     await page.getByLabel('Total amount').click();
     await page.getByLabel('Total amount').fill('10,0000');
     //Enter minimum amount 10
     await page.getByLabel('Minimum').click();
     await page.getByLabel('Minimum').fill('10');

     //Enter maximum amount less than the minimum amount and confirm the error text under the minimum amount text box
     await page.getByLabel('Maximum').click();
     await page.getByLabel('Maximum').fill('1');
     await expect (page.getByText('Minimum rate limit cannot be greater than maximum trade limit')).toHaveText(/Minimum rate limit cannot be greater than maximum trade limit/);
     
     //Enter maximum value more than the total amount and confirm the error text under the maximum amount text box
     await page.getByLabel('Maximum').click();
     await page.getByLabel('Maximum').press('Meta+a');
     await page.getByLabel('Maximum').fill('100,0000');
     await expect (page.getByText('Maximum rate limit cannot be greater than total available amount')).toHaveText(/Maximum rate limit cannot be greater than total available amount/);

     //Enter a valid amount for maximum value
     await page.getByLabel('Maximum').click();
     await page.getByLabel('Maximum').press('Meta+a');
     await page.getByLabel('Maximum').fill('10,0000');

//Search for the wrong payment method and confirm the copy text displayed
     //Click on add payment method
     await page.getByRole('link', { name: 'Add Payment Methods' }).click();
     //Search for the wrong payment method
     await page.getByPlaceholder('Choose a currency').click();
     await page.getByPlaceholder('Choose a currency').fill('ever');
     //Confirm the copy displayed
     await expect (page.getByRole('heading', { name: 'Can’t find your crypto currency?' })).toHaveText(/Can’t find your crypto currency?/);
     //Search and select a valid payment method and proceed to the next page
     await page.getByPlaceholder('Choose a currency').click();
     await page.getByPlaceholder('Choose a currency').press('Meta+a');
     await page.getByPlaceholder('Choose a currency').fill('ba');
     await page.locator('a').filter({ hasText: 'Bank Transfer' }).click();
     await page.getByRole('button', { name: 'Next' }).click();

     //Confirm Autoresponse header and set autoresponse
     await expect (page.getByRole('heading', { name: 'Set an auto-response for chats' })).toHaveText(/Set an auto-response for chats/);
     await page.getByLabel('Auto-response (Optional)').click();
     await page.getByLabel('Auto-response (Optional)').fill('tested');
     await page.getByLabel('Ads note (Optional)').click();
     await page.getByLabel('Ads note (Optional)').fill('tester');
     await page.getByRole('button', { name: 'Next' }).click();
     //Confirm ad details copy and info you added and post the ad
     await expect (page.getByRole('heading', { name: 'Ad Details' })).toHaveText(/Ad Details/);
     await expect (page.getByText('Total amount₦100,000.00')).toHaveText(/Total amount₦100,000.00/);
     await expect (page.getByText('Limit per order₦10.00 - ₦100,000.00')).toHaveText(/Limit per order₦10.00 - ₦100,000.00/);
     await expect (page.locator('div').filter({ hasText: 'Payment time limit15 mins' })).first().toHaveText(/Payment time limit15 mins/);
     await page.getByRole('button', { name: 'Post Ad' }).click();


     //Confirm the details of the ad you posted from the modal displayed
     await expect (page.getByRole('heading', { name: 'Your Ad is live!' })).toHaveText(/Your Ad is live!/);
     await expect (page.getByText('Your Ad is now visible to everyone on Onboard. Please ensure you\'re available to')).toContain(/Your Ad is now visible to everyone on Onboard. Please ensure you\'re available to/);
     await page.getByRole('button', { name: 'Done' }).click();





})










test('Create Buy Ad for USDT', async ({ page }) => {
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


    //Click on the ads tab and try to create an ad from there
    await page.getByRole('link', { name: 'Ads' }).click();

    await page.getByRole('button', { name: 'Create new ad' }).click();




})








test('Create Buy Ad for BUSD', async ({ page }) => {
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





})