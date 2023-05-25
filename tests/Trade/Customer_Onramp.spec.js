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



//Filter by amount and currency
    //Filter by amount 1million to see that the page loads less ads
    //Then filter by 100k to see that more ads are loaded real time
    await page.getByPlaceholder('Enter amount').click();
    await page.getByPlaceholder('Enter amount').fill('1000000');
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
  

//Filter by payment method and confirm the ads displayed have filtered payment method in them
    //Filter by bank transfer and confirm
    await page.getByRole('button', { name: 'All payment methods' }).click();
    await page.getByRole('option', { name: 'Bank Transfer' }).click();
         //wait for page to load
         await page.waitForTimeout(2000)
    await expect(page.getByText('Bank Transfer').nth(1)).toHaveText(/Bank Transfer/);



    //Filter by chipper cash and confirm
    await page.getByRole('button', { name: 'Bank Transfer' }).click();
    await page.getByRole('option', { name: 'Chipper Cash' }).click();
         //wait for page to load
         await page.waitForTimeout(2000)
    await expect(page.getByText('Chipper Cash').nth(1)).toHaveText(/Chipper Cash/);


    //Filter by barter and confirm
    await page.getByRole('button', { name: 'Chipper Cash' }).click();
    await page.getByRole('option', { name: 'Barter' }).click();
         //wait for page to load
         await page.waitForTimeout(2000)
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
    await page.getByRole('button', { name: 'Binance Smart Chain Testnet' }).click();
    await page.getByRole('option', { name: 'Polygon Mumbai Testnet' }).click();


    //Refresh the ads list
    await page.getByRole('button', { name: 'Refresh' }).click();






})













test('Click on the Buy button Signin and confirm text displayed', async ({ page }) => {
    await page.goto('https://app.dev.onboardpay.co');



//Click on the buy button and confirm that the items displayed there are correct

    //Click on buy buttton for TessTest's Ads
    const scrollY = await page.evaluate(() => document.body.scrollHeight); // get the page height
    await page.mouse.wheel(0, scrollY); // scroll to the bottom
    await page.getByRole('article').filter({ hasText: 'NGN 758.75 Limit ₦ 758.75 - ₦ 758,750.00@TessTest| 104 trades|100%|Avg. completi' }).getByRole('button', { name: 'Buy' }).click();
  
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
    await expect (page.getByRole('heading', { name: 'Buy USDT from @TessTest' })).toHaveText(/Buy USDT from @TessTest/);
    
    //Confirm text for fees
    await expect (page.getByRole('button', { name: 'You\'ll receive 0 USDT' })).toHaveText(/You\'ll receive 0 USDT/);
    await page.getByRole('button', { name: 'You\'ll receive 0 USDT' }).click();

    await expect (page.getByRole('heading', { name: 'Total amount' })).toHaveText(/Total amount/);
    await expect (page.getByRole('heading', { name: 'Processing fee' })).toHaveText(/Processing fee/);
    await expect (page.getByRole('heading', { name: 'You\'ll receive', exact: true })).toHaveText(/You\'ll receive/);
  

    //Logout
    await page.getByRole('button', { name: 'Welcome' }).click();
    await page.getByRole('button', { name: 'Log out' }).click();




})














test('Try to Onramp from Express Page Directly without payment method (Confirm Continue button is not highlighted', async ({ page }) => {
    await page.goto('https://app.dev.onboardpay.co');


//Enter the fiat amount and confirm the token value
    //Click on the express tab on the landing page
    await page.getByRole('link', { name: 'Express' }).click();
    //Enter the amount in fiat you want to buy
    await page.getByLabel('Amount you\'ll send').click().fill('10,0000');

    //Confirm the amount populated in token value is more than 100k
    //await page.goto('https://app.dev.onboardpay.co/express?tradeType=Buy&network=bsc_testnet&fiat=NGN&token=USDT&tokenAmount=134.228188&fiatAmount=100000').expect(value).toBeGreaterThan(100000)

    //Confirm the fees explainer text
    await page.getByRole('button', { name: 'Fees may apply' }).click();
    await expect(page.getByText('We charge as little as possible, and we\'ll always show you upfront before confir')).toHaveText("We charge as little as possible, and we\'ll always show you upfront before confir");

    //Confirm find ads button is not highlighted
    await expect(page.getByRole('button', { name: 'Find ads' })).toBeDisabled(true);



})

















test('Try to Onramp from Express Page Directly without amount (Confirm Continue button is not highlighted', async ({ page }) => {
    await page.goto('https://app.dev.onboardpay.co');


//Enter the fiat amount and confirm the token value
    //Click on the express tab on the landing page
    await page.getByRole('link', { name: 'Express' }).click();
    //Select the payment method
    await page.locator('#headlessui-listbox-button-55').click();
    await page.getByRole('option', { name: 'Bank Transfer' }).click();

    //Confirm the fees explainer text
    await page.getByRole('button', { name: 'Fees may apply' }).click();
    await expect(page.getByText('We charge as little as possible, and we\'ll always show you upfront before confir')).toHaveText("We charge as little as possible, and we\'ll always show you upfront before confir");

    //Confirm find ads button is not highlighted
    await expect(page.getByRole('button', { name: 'Find ads' })).toBeDisabled(true);



})


















test('Onramp from Express Page Directly confirm copies and Sign in and comfirm order', async ({ page }) => {
    await page.goto('https://app.dev.onboardpay.co');


//Enter the fiat amount and confirm the token value
    //Click on the express tab on the landing page
    await page.getByRole('link', { name: 'Express' }).click();
    //Enter the amount in fiat you want to buy
    await page.getByLabel('Amount you\'ll send').click().fill('10,0000');

    //Confirm the amount populated in token value is more than 100k
    await page.goto('https://app.dev.onboardpay.co/express?tradeType=Buy&network=bsc_testnet&fiat=NGN&token=USDT&tokenAmount=134.228188&fiatAmount=100000').expect(value).toBeGreaterThan(100000)

    //Confirm the fees explainer text
    await page.getByRole('button', { name: 'Fees may apply' }).click();
    await expect(page.getByText('We charge as little as possible, and we\'ll always show you upfront before confir')).toHaveText("We charge as little as possible, and we\'ll always show you upfront before confir");

    //Select payment method
    await  page.locator('#headlessui-listbox-button-10').click();
    await page.getByRole('option', { name: 'Bank Transfer' }).click();
   

    //Click on find ads
    await page.getByRole('button', { name: 'Find ads' }).click();

    //delay any execution for 5seconds
    await page.waitForTimeout(5000)

    //Confirm the best ads title is displayed
    await expect(page.getByRole('heading', { name: 'Best ads for you' })).toHaveText(/Best ads for you/);

    //Click on the first ad to sign in and buy from merchant
    await expect(page.locator('div:nth-child(4)')).first().toHaveText(/Buy/).click();



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

    //Set wallet address in the express page 
    await page.getByLabel('Wallet address').click();
    await page.getByLabel('Wallet address').fill('0x07F08544FFaA8c419038060011ebebC9CD2ac04D');

    //Confirm the fees copy
    await page.getByRole('button', { name: 'You\'ll receive 161.514359 USDT' }).click();
    await expect(page.getByRole('heading', { name: 'Total amount' })).toHaveText(/Total amount/);
    await expect(page.getByRole('heading', { name: 'Processing fee' })).toHaveText(/Processing fee/);
    await expect(page.getByRole('heading', { name: 'You\'ll receive', exact: true })).toHaveText(/You\'ll receive/);

    //Click on the continue button
    await page.getByRole('button', { name: 'Continue' }).click();

    //Confirm the fees on the order confirmation page
    await page.getByText('You\'ll pay ₦100,000.00').click();
    await expcet(page.getByText('Payment method Bank Transfer')).toHaveText(/Payment method Bank Transfer/);

    //Click on buy token
    await page.getByRole('button', { name: 'Buy USDT' }).click();


    //delay any execution for 5seconds
    await page.waitForTimeout(5000)

    //Confirm the copy displayed
    await expect(page.getByText('Please wait while we get this order ready for you.')).toHaveText(/Please wait while we get this order ready for you./);

    //Close the popup modal
    await page.getByRole('button').nth(2).click();




})