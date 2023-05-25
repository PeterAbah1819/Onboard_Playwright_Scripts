// add the test and expect modules as well as the playwright modules
const { test, expect } = require('@playwright/test');

test('Filter with Amount, Currency, Payment Method, Token and Network', async ({ page }) => {
    await page.goto('https://app.dev.onboardpay.co/auth/sign-in');


//Sign in with valid email and OTP
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


     //wait for page to load
     await page.waitForTimeout(2000)

     //Close the notification modal by clicking on skip
     await page.getByRole('button').nth(2).click();





//We will do the same for SELL ads
    //Click on the sell tab
    await page.getByRole('button', { name: 'Sell' }).click();

    //Change the network to default as well
    await page.getByRole('button', { name: 'Polygon Mumbai Testnet' }).click();
    await page.getByRole('option', { name: 'All Networks' }).click();

    //Switch back to USDT
    await page.getByRole('button', { name: 'USDT' }).click();
  


//Filter by amount and currency
    //Filter by amount 10million to see that the page loads less ads
    //Then filter by 100k to see that more ads are loaded real time
    await page.getByPlaceholder('Enter amount').click();
    await page.getByPlaceholder('Enter amount').fill('10000000');
    await page.getByPlaceholder('Enter amount').press('Meta+a');
    await page.getByPlaceholder('Enter amount').fill('100000');
    //Filter by USD and then select NGN again since USD isnt out yet
    await page.getByRole('button', { name: 'Nigerian Naira' }).click();
    await page.getByPlaceholder('Type currency name').click();
    await page.getByPlaceholder('Type currency name').fill('USD');
    await page.getByText('USD - US DollarComing soon').click();
    await page.getByPlaceholder('Type currency name').click();
    await page.getByPlaceholder('Type currency name').press('Meta+a');
    await page.getByPlaceholder('Type currency name').fill('NGN');
    await page.locator('a').filter({ hasText: 'NGN - Nigerian Naira' }).click();
    await page.getByPlaceholder('Enter amount').fill('');
  

//Filter by payment method and confirm the ads displayed have filtered payment method in them
    //Filter by bank transfer and confirm
    await page.getByRole('button', { name: 'All payment methods' }).click();
    await page.getByRole('option', { name: 'Bank Transfer' }).click();
    await expect(page.getByText('Bank Transfer').nth(1)).toHaveText(/Bank Transfer/);



    //Filter by chipper cash and confirm
    await page.getByRole('button', { name: 'Bank Transfer' }).click();
    await page.getByRole('option', { name: 'Chipper Cash' }).click();
    await expect(page.getByText('Chipper Cash').nth(1)).toHaveText(/Chipper Cash/);


    //Filter by barter and confirm
    await page.getByRole('button', { name: 'Chipper Cash' }).click();
    await page.getByRole('option', { name: 'Barter' }).click();
    await expect(page.getByText('Barter').nth(1)).toHaveText(/Barter/);



//Reset the amount filetered before and filter by token name
    //Clear out the amount entered
    await page.getByPlaceholder('Enter amount').click();
    await page.getByPlaceholder('Enter amount').press('Meta+a');
    await page.getByPlaceholder('Enter amount').fill('');

    //Switch to all payment methods
    await page.getByRole('button', { name: 'Barter' }).click();
    await page.getByRole('option', { name: 'All payment methods' }).click();

    //Filter by token name and confirm the tokens are displayed
    await page.getByRole('button', { name: 'BUSD' }).click();
    await page.getByRole('button', { name: 'BNB' }).click();
    await page.getByRole('button', { name: 'MATIC' }).click();
    await page.getByRole('button', { name: 'All Networks' }).click()
    await page.getByRole('option', { name: 'Polygon Mumbai Testnet' }).click();


    //Refresh the ads list
    await page.getByRole('button', { name: 'Refresh' }).click();





})









test('Click on the Buy and Sell button Signin and confirm text displayed', async ({ page }) => {
    await page.goto('https://app.dev.onboardpay.co');


    //Click on the sell tab
    await page.getByRole('button', { name: 'Sell' }).click();
    //Click on sell on TessTest's ad
    await page.mouse.down();
    await page.getByRole('article').filter({ hasText: 'NGN 751.28 Limit ₦ 2.03 - ₦ 529.63@TessTest| 104 trades|100%|Avg. completion: 1 ' }).getByRole('button', { name: 'Sell' }).click();
      
    
    //Sign in with valid email and OTP
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
    
    
    //wait for page to load
    await page.waitForTimeout(2000)
    
    //Close the notification modal by clicking on skip
    await page.getByRole('button').nth(2).click();
    
    //Confirm text in the Onramp express page for that ad clicked on
    await expect (page.getByRole('heading', { name: 'Sell USDT to @TessTest' })).toHaveText(/Sell USDT to TessTest/);
    
    //Click on payment method and confirm text
    await expect (page.getByRole('button', { name: 'Select payment method' })).toHaveText(/Select payment method/);
    await page.getByRole('button', { name: 'Select payment method' }).click();
    //Confirm the text in the payment method modal
    await expect (page.getByRole('heading', { name: 'Where do you want to receive funds in?' })).toHaveText(/Where do you want to receive funds in?/);
    await page.getByRole('article').getByRole('button').first().click();
    
    //Confirm the text in fees
    await expect (page.getByRole('button', { name: 'You\'ll receive NGN 0' })).toHaveText(/You\'ll receive NGN 0/);
    await page.getByRole('button', { name: 'You\'ll receive NGN 0' }).click();
    await expect (page.getByRole('heading', { name: 'You\'re selling' })).toHaveText(/You\'re selling/);
    await expect (page.getByRole('heading', { name: 'Processing fee' })).toHaveText(/Processing fee/);
    await expect (page.getByRole('heading', { name: 'Net amount' })).click(/Net amount/);
    
    
    //Logout
    await page.getByRole('button', { name: 'Welcome' }).click();
    await page.getByRole('button', { name: 'Log out' }).click();


})




test('Try to Offramp from Express Page Directly without payment method (Confirm Continue button is not highlighted', async ({ page }) => {
    await page.goto('https://app.dev.onboardpay.co');


//Enter the fiat amount and confirm the token value
    //Click on the express tab on the landing page
    await page.getByRole('link', { name: 'Express' }).click();

    //Click on sell tab
    await page.getByRole('button', { name: 'Sell Crypto' }).click();

    //Enter the fiat amount to sell
    await page.getByLabel('Amount you\'ll receive').click();
    await page.getByLabel('Amount you\'ll receive').press('Meta+a');
    await page.getByLabel('Amount you\'ll receive').fill('100,0000');


    //Confirm the fees explainer text
    await page.getByRole('button', { name: 'Fees may apply' }).click();
    await expect(page.getByText('We charge as little as possible, and we\'ll always show you upfront before confir')).toHaveText("We charge as little as possible, and we\'ll always show you upfront before confir");

    //Confirm find ads button is not highlighted
    await expect(page.getByRole('button', { name: 'Find ads' })).toBeDisabled(true);




})










// test('Try to Offramp from Express Page Directly without amount (Confirm Continue button is not highlighted', async ({ page }) => {
//     await page.goto('https://app.dev.onboardpay.co');


// //Enter the fiat amount and confirm the token value
//     //Click on the express tab on the landing page
//     await page.getByRole('link', { name: 'Express' }).click();

//     //Click on sell tab
//     await page.getByRole('button', { name: 'Sell Crypto' }).click();




// })















test('Offramp from Express Page Directly confirm copies and Sign in and confirm', async ({ page }) => {
    await page.goto('https://app.dev.onboardpay.co');


//Enter the fiat amount and confirm the token value
    //Click on the express tab on the landing page
    await page.getByRole('link', { name: 'Express' }).click();

    //Click on sell tab
    await page.getByRole('button', { name: 'Sell Crypto' }).click();



    //Enter the fiat amount to sell
    await page.getByLabel('Amount you\'ll receive').click();
    await page.getByLabel('Amount you\'ll receive').press('Meta+a');
    await page.getByLabel('Amount you\'ll receive').fill('100,0000');


    //Confirm the fees explainer text
    await page.getByRole('button', { name: 'Fees may apply' }).click();
    await expect(page.getByText('We charge as little as possible, and we\'ll always show you upfront before confir')).toHaveText("We charge as little as possible, and we\'ll always show you upfront before confir");

    //Select Payment method
    await page.locator('#headlessui-listbox-button-83').click();
    await page.getByRole('option', { name: 'Bank Transfer' }).click();


    //Click on find ads
    await page.getByRole('button', { name: 'Find ads' }).click();

    //delay any execution for 5seconds
    await page.waitForTimeout(5000)


    //Confirm the best ads title is displayed
    await expect(page.getByRole('heading', { name: 'Best ads for you' })).toHaveText(/Best ads for you/);

    //Click on the first ad to sign in and buy from merchant
    await expect(page.locator('.w-full > div:nth-child(4)')).first().toHaveText(/Sell/).click();



//Sign in    
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


    //delay any execution for 5seconds
    await page.waitForTimeout(5000)

    //Confirm fees text
    await page.getByRole('button', { name: 'You\'ll receive NGN 99,974.75' }).click();
    await expect(page.getByRole('heading', { name: 'You\'re selling' })).toHaveText(/You're selling/);
    await expect(page.getByRole('heading', { name: 'Processing fee' })).toHaveText(/Processing fee/);

    //Click on continue
    await page.getByRole('button', { name: 'Continue' }).click();



    //Confirm that the connect wallet (wallet connect) modal is displayed
    await expect(page.getByRole('heading', { name: 'Connect using one of our available wallet providers.' })).toHaveText(/Connect using one of our available wallet providers./);
    await expect(page.getByRole('button', { name: 'Wallet Connect' })).toHaveText(/Wallet Connect/);


})