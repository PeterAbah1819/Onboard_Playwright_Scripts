// add the test and expect modules as well as the playwright modules
const { test, expect } = require('@playwright/test');

test('Create Sell Ad, without KYC Approved', async ({ page }) => {
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








test('Create Sell Ad, Invalid values to confirm copies and errors', async ({ page }) => {
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

     //Click on create ad from the menu
     await page.getByRole('link', { name: 'Ads' }).click();
     //Click on create new ad
     await page.getByRole('button', { name: 'Create new ad' }).click();

     
     //Confirm copy, headers and subtexts
     await expect (page.getByText('Select a network')).toHaveText(/Select a network/);

     //Search for the wrong network name (BNB) and confirm copy
     await page.getByPlaceholder('Type network name').click();
     await page.getByPlaceholder('Type network name').fill('BNB');
     //Confirm copy says unable to find what was searched for
     await expect (page.getByRole('heading', { name: 'Cant find your preferred network?' })).toHaveText(/Cant find your preferred network?/);
     
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

     //Select buy to create a sell ad
     await page.getByRole('button', { name: 'Sell' }).click();


     //Verify the flow hearder copy
     await expect (page.getByRole('heading', { name: 'Set Ads type and Price' })).toHaveText(/Set Ads type and Price/);
     await expect (page.getByRole('heading', { name: 'Set Ads Amount and Payment details' })).toHaveText(/Set Ads Amount and Payment details/);
     await expect (page.getByRole('heading', { name: 'Set Auto response and ads note' })).toHaveText(/Set Auto response and ads note/);
     

     //Verify text field headers
     await expect (page.getByRole('heading', { name: 'I want to sell' })).toHaveText(/I want to sell/);
     await expect (page.getByRole('heading', { name: 'I need' })).toHaveText(/I need/);
     await expect (page.getByRole('heading', { name: 'Rate type' })).toHaveText(/Rate type/);
     await expect (page.getByRole('heading', { name: 'Set your margin' })).toHaveText(/Set your margin/);
   
     //Confirm copy about rate change
     await expect(page.getByText('Your rate will change based on the current market rate.')).toHaveText(/Your rate will change based on the current market rate./);
     //Chnage the rate type and confirm the copy
     await page.getByRole('button', { name: 'Flexible price' }).click();
     await page.getByRole('option', { name: 'Fixed price Your rate is fixed and will not change based on the current market rate' }).click();
     //Confirm the rate type copy for fixed rate
     await expect (page.getByText('Your rate is fixed and will not change based on the current market rate')).toHaveText(/Your rate is fixed and will not change based on the current market rate/);
   
     //Change back to flexible rate
     await page.getByRole('button', { name: 'Fixed price' }).click();
     await page.getByRole('option', { name: 'Flexible price Your rate will change based on the current market rate.' }).click();


     //Click on continue
     await page.getByRole('button', { name: 'Continue' }).click();

     //Confirm header text as sell {token} with {Fiat}
     await expect (page.getByRole('heading', { name: 'Sell BNB with NGN' })).toHaveText(/Buy BNB with NGN/);

//Set minimum amount and maximum amounts and check that they align with the total amount entered
     //Enter total amount 10k
     await page.getByLabel('Total amount').click();
     await page.getByLabel('Total amount').fill('10,0000');

     //Confirm the text says I dont have enough bnb to sell
     await expect (page.getByText('You don\'t have enough BNB for this ad')).toHaveText(/You don\'t have enough BNB for this ad/);

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

     //Click on add payment method and select one remove it and add another
     await page.getByRole('link', { name: 'Add Payment Methods' }).click();
     await page.getByRole('link', { name: 'Add Payment Methods' }).click();
     await page.locator('div').filter({ hasText: 'PETER INNOCENT ABAH0008870377Access Bank' }).nth(2).click();
     await page.getByRole('button', { name: 'Remove' }).click();
     await page.getByRole('link', { name: 'Add Payment Methods' }).click();
     await page.locator('div').filter({ hasText: 'PETER INNOCENT ABAHjazzPocketApp' }).nth(1).click();





     //Confirm next button is disabled
     await expect (page.getByRole('button', { name: 'Next' })).toBeDisabled();




})
















test('Create Sell Ad for USDT', async ({ page }) => {
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


    //Select binance smart chain network and click on continue 
    await page.locator('a').filter({ hasText: 'BSC - Binance Smart Chain Testnet' }).click();
    await page.getByRole('button', { name: 'Continue' }).click();


    //Click on sell and select USDT and click on continue
    await page.getByRole('button', { name: 'Sell' }).click();
    await page.getByText('Binance Coin (BNB)').click();
    await page.getByRole('button', { name: 'Binance Coin (BNB)' }).click();
    await page.getByText('Tether USD (USDT)').click();
    await page.getByRole('button', { name: 'Continue' }).click();

    //Enter the total amount, limits and two payment methods and continue to the next page
    await page.getByLabel('Total amount').click();
    await page.getByLabel('Total amount').fill('500');
    await page.getByLabel('Minimum').click();
    await page.getByLabel('Minimum').fill('5');
    await page.getByLabel('Maximum').click();
    await page.getByLabel('Maximum').fill('500');
    await page.getByRole('link', { name: 'Add Payment Methods' }).click();
    await page.locator('div').filter({ hasText: 'PETER INNOCENT ABAH0008870377Access Bank' }).nth(1).click();
    await page.getByRole('link', { name: 'Add Payment Methods' }).click();
    await page.locator('div').filter({ hasText: 'PETER INNOCENT ABAHjaysChipper Cash' }).nth(1).click();
    await page.getByRole('button', { name: 'Next' }).click();

    //Add auto response and post the ad
    await page.getByLabel('Auto-response (Optional)').click();
    await page.getByLabel('Auto-response (Optional)').fill('tested');
    await page.getByLabel('Ads note (Optional)').click();
    await page.getByLabel('Ads note (Optional)').fill('tester');
    await page.getByRole('button', { name: 'Next' }).click();
    await page.getByRole('heading', { name: 'Sell USDT with NGN' }).click();
    await page.getByText('5.00 USDT - 500.00 USDT').click();
    await page.getByRole('button', { name: 'Post Ad' }).click();

    //Confirm copies of ad details after posting and that the ad is listed
    await expect (page.getByRole('heading', { name: 'Your Ad is live!' })).toHaveText(/Your Ad is live!/);
    await expect (page.getByText('Your Ad is now visible to everyone on Onboard. Please ensure you\'re available to')).toHaveText(/Your Ad is now visible to everyone on Onboard. Please ensure you\'re available to/);
    await expect (page.getByText('5.00 USDT - 500.00 USDT')).toHaveText(/5.00 USDT - 500.00 USDT/);
    await page.getByRole('button', { name: 'Done' }).click();

    //Confirm ad is listed
    await expect (page.getByRole('paragraph').filter({ hasText: 'Sell' }).first()).toHaveText(/Sell/);
    await expect (page.getByText('5.00 USDT - 500.00 USDT').first()).toHaveText(/5.00 USDT - 500.00 USDT/);
    await expect (page.getByText('a few seconds ago')).toHaveText(/a few seconds ago/);
  








})
