// add the test and expect modules as well as the playwright modules
const { test, expect } = require('@playwright/test');

test('View and filter ads in customer landing page', async ({ page }) => {
    await page.goto('https://app.dev.onboardpay.co');


//Navigate to landing page without signing in and filter the ads displayed

    //Confirm landing page is displayed with best ads for you
    await expect(page.getByRole('heading', { name: 'Best ads for you' })).toHaveText(/Best ads for you/);

    //Confirm the login and register buttons are displayed.
    await expect(page.getByRole('link', { name: 'Log In' })).toHaveText(/Log In/);
    await expect(page.getByRole('link', { name: 'Register' })).toHaveText(/Register/);


//Filter by buy ads
    //Confirm user is displayed with buy ads first

    // await expect(page.getByRole('listitem').filter({ hasText: 'NGN 743.45 Limit ₦ 2,973.80 - ₦ 74,345.00@Johndoe3| 36 trades|22%|Avg. completion' })).toHaveText(/NGN 743.45 Limit ₦ 2,973.80 - ₦ 74,345.00@Johndoe3| 36 trades|22%|Avg. completion/);
    // await expect(page.getByRole('listitem').filter({ hasText: 'NGN 743.45 Limit ₦ 743.45 - ₦ 74,345.00@oladimejipaul33| 0 trades|0%|Avg. completion' })).toHaveText(/NGN 743.45 Limit ₦ 743.45 - ₦ 74,345.00@oladimejipaul33| 0 trades|0%|Avg. completion/);
    // await expect(page.getByRole('listitem').filter({ hasText: 'NGN 758.32 Limit ₦ 2,274.96 - ₦ 227,496.00@TessTest| 58 trades|50%|Avg. completion' })).toHaveText(/NGN 758.32 Limit ₦ 2,274.96 - ₦ 227,496.00@TessTest| 58 trades|50%|Avg. completion/);

    //Filter by buy ads buy clicking on buy at the top and confirm all are buy ads with buy buttons
    await page.locator('div').filter({ hasText: 'BuySell' }).getByRole('button', { name: 'Buy' }).click();
    await expect(page.getByRole('button', { name: 'Buy' })).toHaveText(/Buy/);



    //Filter by buy ads and ETH token only by clicking on ETH and confirm all are ETH buy ads
    await page.getByRole('button', { name: 'ETH', exact: true }).click();
    //await expect(page.getByRole('button', { name: 'Buy' })).toHaveText(/Buy/);


    //Filter by buy ads and BUSD token only by clicking on BUSD and confirm all are BUSD buy ads
    await page.getByRole('button', { name: 'BUSD' }).click();
    //await expect(page.getByRole('button', { name: 'Buy' })).toHaveText(/Buy/);


    //Filter by buy ads and BNB token only by clicking on BNB and confirm all are BNB buy ads
    await page.getByRole('button', { name: 'BNB' }).click();
    //await expect(page.getByRole('button', { name: 'Buy' })).toHaveText(/Buy/);


    //Filter by buy ads and MATIC token only by clicking on MATIC and confirm all are MATIC buy ads
    await page.getByRole('button', { name: 'MATIC' }).click();
    //Change the network to display polygon mumbai tokens buy ads
    await page.getByRole('button', { name: 'All Networks' }).click();
    await page.getByRole('option', { name: 'Polygon Mumbai Testnet' }).click();
    //await expect(page.getByRole('button', { name: 'Buy' })).toHaveText(/Buy/);


    //Filter by buy ads and USDT token only by clicking on USDT and confirm all are USDT buy ads
    await page.getByRole('button', { name: 'USDT' }).click();
    //await expect(page.getByRole('button', { name: 'Buy' })).toHaveText(/Buy/);


    //Filter by amount and check that ads displayed are in that amount range
    //Filter by fiat amount 500,000 naira
    await page.getByPlaceholder('Enter amount').click();
    await page.getByPlaceholder('Enter amount').fill('500000');
    await expect(page.getByRole('heading', { name: 'Limit ₦ 100.24 - ₦ 1,237,987.70' })).toHaveText(/Limit ₦ 100.24 - ₦ 1,237,987.70/)
    //Filter by 0 fiat amount
    await page.getByPlaceholder('Enter amount').press('Meta+a');
    await page.getByPlaceholder('Enter amount').fill('0');
    //Confirm that no ads are displayed
    await expect(page.getByText('All ads matching your search will appear here')).toHaveText(/All ads matching your search will appear here/);

    //Reset amount filter
    await page.getByPlaceholder('Enter amount').press('Meta+a');
    await page.getByPlaceholder('Enter amount').fill(' ');



    //Filter by payment method and check that ads have that payment in them
    //Filter by Bank transfer
    await page.getByRole('button', { name: 'All payment methods' }).click();
    await page.getByRole('option', { name: 'Bank Transfer' }).click();
    await expect(page.getByText('Bank Transfer')).toHaveText(/Bank Transfer/);
    //Filter by PocketApp payment method
    await page.getByRole('button', { name: 'Bank Transfer' }).click();
    await page.getByRole('option', { name: 'PocketApp (Formerly Abeg)' }).click();
    //Confirm no ads are displayed
    await expect(page.getByText('All ads matching your search will appear here')).toHaveText(/All ads matching your search will appear here/);

    //Reset payment method filter
    await page.getByRole('button', { name: 'PocketApp (Formerly Abeg)' }).click();
    await page.getByRole('option', { name: 'All payment methods' }).click();

    


    //Filter by network
    //Revisit the landing page
    await page.goto('https://app.dev.onboardpay.co/');
    //Click on network dropdown
    await page.getByRole('button', { name: 'Binance Smart Chain Testnet' }).click();
    //Select all network
    await page.getByRole('option', { name: 'All Networks' }).click();
    //confirm ads are displayed
    await expect(page.getByRole('listitem').filter({ hasText: 'NGN 619.14 Limit ₦ 10,000.00 - ₦ 2,000,000.00@jtglobal| 23 trades|27%|Avg. completion' })).toHaveText(/NGN 619.14 Limit ₦ 10,000.00 - ₦ 2,000,000.00@jtglobal| 23 trades|27%|Avg. completion/);
  
    //Select BSC network and check that matic ads are not displayed
    await page.getByRole('button', { name: 'All Networks' }).click();
    await page.getByRole('option', { name: 'Binance Smart Chain Testnet' }).click();
    //Click on matic tab
    await page.getByRole('button', { name: 'MATIC' }).click();
    await expect(page.getByText('All ads matching your search will appear here')).toHaveText(/All ads matching your search will appear here/);

    //Filter matic ads by sell to display MATIC ads
    //Select polygon mumbai network
    await page.getByRole('button', { name: 'Binance Smart Chain Testnet' }).click();
    await page.getByRole('option', { name: 'Polygon Mumbai Testnet' }).click();
    //Select sell ad types
    await page.getByRole('button', { name: 'Sell' }).click();
    await expect(page.getByRole('listitem').filter({ hasText: 'NGN 828.95 Limit ₦ 1,940.63 - ₦ 194,063.05@Johndoe3| 36 trades|22%|Avg. completion' })).toHaveText(/NGN 828.95 Limit ₦ 1,940.63 - ₦ 194,063.05@Johndoe3| 36 trades|22%|Avg. completion/);




    //Refresh page
    await page.getByRole('button', { name: 'Refresh' }).click();






//Filter by Sell ads 
    //Confirm user is displayed with Sell ads first

    //Click on sell
    await page.getByRole('button', { name: 'Sell' }).click();
    await expect(page.getByRole('button', { name: 'Sell' })).toHaveText(/Sell/);

    
    // await expect(page.getByRole('listitem').filter({ hasText: 'NGN 799.99 Limit ₦ 9,985.20 - ₦ 49,925.98@paultest| 6 trades|75%|Avg. completion' })).toHaveText(//);
    // await expect(page.getByRole('listitem').filter({ hasText: 'NGN 766.51 Limit ₦ 100.20 - ₦ 1,237,406.54@zalli| 58 trades|18%|Avg. completion:' })).toHaveText(//);
    // await expect(page.getByRole('listitem').filter({ hasText: 'NGN 744.18 Limit ₦ 5,001.41 - ₦ 500,141.13@TessTest| 58 trades|50%|Avg. completion' })).toHaveText(//);


    //Filter by sell ads and ETH token only by clicking on ETH and confirm all are ETH sell ads
    await page.getByRole('button', { name: 'ETH', exact: true }).click();
    //await expect(page.getByRole('button', { name: 'sell' })).toHaveText(/sell/);



    //Filter by sell ads and BUSD token only by clicking on BUSD and confirm all are BUSD sell ads
    await page.getByRole('button', { name: 'BUSD' }).click();
    //await expect(page.getByRole('button', { name: 'sell' })).toHaveText(/sell/);


    //Filter by sell ads and BNB token only by clicking on BNB and confirm all are BNB sell ads
    await page.getByRole('button', { name: 'BNB' }).click();
    //await expect(page.getByRole('button', { name: 'sell' })).toHaveText(/sell/);


    //Filter by sell ads and MATIC token only by clicking on MATIC and confirm all are MATIC sell ads
    await page.getByRole('button', { name: 'MATIC' }).click();
    //Change the network to display polygon mumbai tokens sell ads
    await page.getByRole('button', { name: 'All Networks' }).click();
    await page.getByRole('option', { name: 'Polygon Mumbai Testnet' }).click();
    //await expect(page.getByRole('button', { name: 'sell' })).toHaveText(/sell/);



    //Filter by sell ads and USDT token only by clicking on USDT and confirm all are USDT sell ads
    await page.getByRole('button', { name: 'USDT' }).click();
    //await expect(page.getByRole('button', { name: 'sell' })).toHaveText(/sell/);



    //Filter by amount and check that ads displayed are in that amount range
    //Filter by fiat amount 500,000 naira
    await page.getByPlaceholder('Enter amount').click();
    await page.getByPlaceholder('Enter amount').fill('500000');
    await expect(page.getByRole('heading', { name: 'Limit ₦ 100.24 - ₦ 1,237,987.70' })).toHaveText(/Limit ₦ 100.24 - ₦ 1,237,987.70/)
    //Filter by 0 fiat amount
    await page.getByPlaceholder('Enter amount').press('Meta+a');
    await page.getByPlaceholder('Enter amount').fill('0');
    //Confirm that no ads are displayed
    await expect(page.getByText('All ads matching your search will appear here')).toHaveText(/All ads matching your search will appear here/);



    //Filter by payment method and check that ads have that payment in them
    //Filter by Bank transfer
    await page.getByRole('button', { name: 'All payment methods' }).click();
    await page.getByRole('option', { name: 'Bank Transfer' }).click();
    await expect(page.getByText('Bank Transfer')).toHaveText(/Bank Transfer/);
    //Filter by PocketApp payment method
    await page.getByRole('button', { name: 'Bank Transfer' }).click();
    await page.getByRole('option', { name: 'PocketApp (Formerly Abeg)' }).click();
    //Confirm no ads are displayed
    await expect(page.getByText('All ads matching your search will appear here')).toHaveText(/All ads matching your search will appear here/);




    //Reset payment method filter
    await page.getByRole('button', { name: 'PocketApp (Formerly Abeg)' }).click();
    await page.getByRole('option', { name: 'All payment methods' }).click();

    


    //Filter by network
    //Revisit the landing page
    await page.goto('https://app.dev.onboardpay.co/');
    //Click on network dropdown
    await page.getByRole('button', { name: 'Binance Smart Chain Testnet' }).click();
    //Select all network
    await page.getByRole('option', { name: 'All Networks' }).click();
    //confirm ads are displayed
    await expect(page.getByRole('listitem').filter({ hasText: 'NGN 619.14 Limit ₦ 10,000.00 - ₦ 2,000,000.00@jtglobal| 23 trades|27%|Avg. completion' })).toHaveText(/NGN 619.14 Limit ₦ 10,000.00 - ₦ 2,000,000.00@jtglobal| 23 trades|27%|Avg. completion/);
  
    //Select BSC network and check that matic ads are not displayed
    await page.getByRole('button', { name: 'All Networks' }).click();
    await page.getByRole('option', { name: 'Binance Smart Chain Testnet' }).click();
    //Click on matic tab
    await page.getByRole('button', { name: 'MATIC' }).click();
    await expect(page.getByText('All ads matching your search will appear here')).toHaveText(/All ads matching your search will appear here/);

    //Filter matic ads by sell to display MATIC ads
    //Select polygon mumbai network
    await page.getByRole('button', { name: 'Binance Smart Chain Testnet' }).click();
    await page.getByRole('option', { name: 'Polygon Mumbai Testnet' }).click();
    //Select sell ad types
    await page.getByRole('button', { name: 'Sell' }).click();
    await expect(page.getByRole('listitem').filter({ hasText: 'NGN 828.95 Limit ₦ 1,940.63 - ₦ 194,063.05@Johndoe3| 36 trades|22%|Avg. completion' })).toHaveText(/NGN 828.95 Limit ₦ 1,940.63 - ₦ 194,063.05@Johndoe3| 36 trades|22%|Avg. completion/);




    //Refresh page
    await page.getByRole('button', { name: 'Refresh' }).click();


})





test('Sign in to view and filter ads in customer landing page', async ({ page }) => {
    await page.goto('https://app.dev.onboardpay.co/auth/sign-in');



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

   


    //Navigate to landing page without signing in and filter the ads displayed

    //Confirm landing page is displayed with best ads for you
    await expect(page.getByRole('heading', { name: 'Best ads for you' })).toHaveText(/Best ads for you/);

    //Confirm user is logged in and welcome text is displayed.
    await expect(page.getByRole('button', { name: 'Welcome' })).toHaveText(/Welcome/);



//Filter by buy ads
    //Confirm user is displayed with buy ads first

    // await expect(page.getByRole('listitem').filter({ hasText: 'NGN 743.45 Limit ₦ 2,973.80 - ₦ 74,345.00@Johndoe3| 36 trades|22%|Avg. completion' })).toHaveText(/NGN 743.45 Limit ₦ 2,973.80 - ₦ 74,345.00@Johndoe3| 36 trades|22%|Avg. completion/);
    // await expect(page.getByRole('listitem').filter({ hasText: 'NGN 743.45 Limit ₦ 743.45 - ₦ 74,345.00@oladimejipaul33| 0 trades|0%|Avg. completion' })).toHaveText(/NGN 743.45 Limit ₦ 743.45 - ₦ 74,345.00@oladimejipaul33| 0 trades|0%|Avg. completion/);
    // await expect(page.getByRole('listitem').filter({ hasText: 'NGN 758.32 Limit ₦ 2,274.96 - ₦ 227,496.00@TessTest| 58 trades|50%|Avg. completion' })).toHaveText(/NGN 758.32 Limit ₦ 2,274.96 - ₦ 227,496.00@TessTest| 58 trades|50%|Avg. completion/);

    //Filter by buy ads buy clicking on buy at the top and confirm all are buy ads with buy buttons
    await page.locator('div').filter({ hasText: 'BuySell' }).getByRole('button', { name: 'Buy' }).click();
    await expect(page.getByRole('button', { name: 'Buy' })).toHaveText(/Buy/);



    //Filter by buy ads and ETH token only by clicking on ETH and confirm all are ETH buy ads
    await page.getByRole('button', { name: 'ETH', exact: true }).click();
    //await expect(page.getByRole('button', { name: 'Buy' })).toHaveText(/Buy/);


    //Filter by buy ads and BUSD token only by clicking on BUSD and confirm all are BUSD buy ads
    await page.getByRole('button', { name: 'BUSD' }).click();
    //await expect(page.getByRole('button', { name: 'Buy' })).toHaveText(/Buy/);


    //Filter by buy ads and BNB token only by clicking on BNB and confirm all are BNB buy ads
    await page.getByRole('button', { name: 'BNB' }).click();
    //await expect(page.getByRole('button', { name: 'Buy' })).toHaveText(/Buy/);


    //Filter by buy ads and MATIC token only by clicking on MATIC and confirm all are MATIC buy ads
    await page.getByRole('button', { name: 'MATIC' }).click();
    //Change the network to display polygon mumbai tokens buy ads
    await page.getByRole('button', { name: 'All Networks' }).click();
    await page.getByRole('option', { name: 'Polygon Mumbai Testnet' }).click();
    //await expect(page.getByRole('button', { name: 'Buy' })).toHaveText(/Buy/);


    //Filter by buy ads and USDT token only by clicking on USDT and confirm all are USDT buy ads
    await page.getByRole('button', { name: 'USDT' }).click();
    //await expect(page.getByRole('button', { name: 'Buy' })).toHaveText(/Buy/);


    //Filter by amount and check that ads displayed are in that amount range
    //Filter by fiat amount 500,000 naira
    await page.getByPlaceholder('Enter amount').click();
    await page.getByPlaceholder('Enter amount').fill('500000');
    await expect(page.getByRole('heading', { name: 'Limit ₦ 100.24 - ₦ 1,237,987.70' })).toHaveText(/Limit ₦ 100.24 - ₦ 1,237,987.70/)
    //Filter by 0 fiat amount
    await page.getByPlaceholder('Enter amount').press('Meta+a');
    await page.getByPlaceholder('Enter amount').fill('0');
    //Confirm that no ads are displayed
    await expect(page.getByText('All ads matching your search will appear here')).toHaveText(/All ads matching your search will appear here/);

    //Reset amount filter
    await page.getByPlaceholder('Enter amount').press('Meta+a');
    await page.getByPlaceholder('Enter amount').fill(' ');



    //Filter by payment method and check that ads have that payment in them
    //Filter by Bank transfer
    await page.getByRole('button', { name: 'All payment methods' }).click();
    await page.getByRole('option', { name: 'Bank Transfer' }).click();
    await expect(page.getByText('Bank Transfer')).toHaveText(/Bank Transfer/);
    //Filter by PocketApp payment method
    await page.getByRole('button', { name: 'Bank Transfer' }).click();
    await page.getByRole('option', { name: 'PocketApp (Formerly Abeg)' }).click();
    //Confirm no ads are displayed
    await expect(page.getByText('All ads matching your search will appear here')).toHaveText(/All ads matching your search will appear here/);

    //Reset payment method filter
    await page.getByRole('button', { name: 'PocketApp (Formerly Abeg)' }).click();
    await page.getByRole('option', { name: 'All payment methods' }).click();

    


    //Filter by network
    //Revisit the landing page
    await page.goto('https://app.dev.onboardpay.co/');
    //Click on network dropdown
    await page.getByRole('button', { name: 'Binance Smart Chain Testnet' }).click();
    //Select all network
    await page.getByRole('option', { name: 'All Networks' }).click();
    //confirm ads are displayed
    await expect(page.getByRole('listitem').filter({ hasText: 'NGN 619.14 Limit ₦ 10,000.00 - ₦ 2,000,000.00@jtglobal| 23 trades|27%|Avg. completion' })).toHaveText(/NGN 619.14 Limit ₦ 10,000.00 - ₦ 2,000,000.00@jtglobal| 23 trades|27%|Avg. completion/);
  
    //Select BSC network and check that matic ads are not displayed
    await page.getByRole('button', { name: 'All Networks' }).click();
    await page.getByRole('option', { name: 'Binance Smart Chain Testnet' }).click();
    //Click on matic tab
    await page.getByRole('button', { name: 'MATIC' }).click();
    await expect(page.getByText('All ads matching your search will appear here')).toHaveText(/All ads matching your search will appear here/);

    //Filter matic ads by sell to display MATIC ads
    //Select polygon mumbai network
    await page.getByRole('button', { name: 'Binance Smart Chain Testnet' }).click();
    await page.getByRole('option', { name: 'Polygon Mumbai Testnet' }).click();
    //Select sell ad types
    await page.getByRole('button', { name: 'Sell' }).click();
    await expect(page.getByRole('listitem').filter({ hasText: 'NGN 828.95 Limit ₦ 1,940.63 - ₦ 194,063.05@Johndoe3| 36 trades|22%|Avg. completion' })).toHaveText(/NGN 828.95 Limit ₦ 1,940.63 - ₦ 194,063.05@Johndoe3| 36 trades|22%|Avg. completion/);




    //Refresh page
    await page.getByRole('button', { name: 'Refresh' }).click();






//Filter by Sell ads 
    //Confirm user is displayed with Sell ads first

    //Click on sell
    await page.getByRole('button', { name: 'Sell' }).click();
    await expect(page.getByRole('button', { name: 'Sell' })).toHaveText(/Sell/);

    
    // await expect(page.getByRole('listitem').filter({ hasText: 'NGN 799.99 Limit ₦ 9,985.20 - ₦ 49,925.98@paultest| 6 trades|75%|Avg. completion' })).toHaveText(//);
    // await expect(page.getByRole('listitem').filter({ hasText: 'NGN 766.51 Limit ₦ 100.20 - ₦ 1,237,406.54@zalli| 58 trades|18%|Avg. completion:' })).toHaveText(//);
    // await expect(page.getByRole('listitem').filter({ hasText: 'NGN 744.18 Limit ₦ 5,001.41 - ₦ 500,141.13@TessTest| 58 trades|50%|Avg. completion' })).toHaveText(//);


    //Filter by sell ads and ETH token only by clicking on ETH and confirm all are ETH sell ads
    await page.getByRole('button', { name: 'ETH', exact: true }).click();
    //await expect(page.getByRole('button', { name: 'sell' })).toHaveText(/sell/);



    //Filter by sell ads and BUSD token only by clicking on BUSD and confirm all are BUSD sell ads
    await page.getByRole('button', { name: 'BUSD' }).click();
    //await expect(page.getByRole('button', { name: 'sell' })).toHaveText(/sell/);


    //Filter by sell ads and BNB token only by clicking on BNB and confirm all are BNB sell ads
    await page.getByRole('button', { name: 'BNB' }).click();
    //await expect(page.getByRole('button', { name: 'sell' })).toHaveText(/sell/);


    //Filter by sell ads and MATIC token only by clicking on MATIC and confirm all are MATIC sell ads
    await page.getByRole('button', { name: 'MATIC' }).click();
    //Change the network to display polygon mumbai tokens sell ads
    await page.getByRole('button', { name: 'All Networks' }).click();
    await page.getByRole('option', { name: 'Polygon Mumbai Testnet' }).click();
    //await expect(page.getByRole('button', { name: 'sell' })).toHaveText(/sell/);



    //Filter by sell ads and USDT token only by clicking on USDT and confirm all are USDT sell ads
    await page.getByRole('button', { name: 'USDT' }).click();
    //await expect(page.getByRole('button', { name: 'sell' })).toHaveText(/sell/);



    //Filter by amount and check that ads displayed are in that amount range
    //Filter by fiat amount 500,000 naira
    await page.getByPlaceholder('Enter amount').click();
    await page.getByPlaceholder('Enter amount').fill('500000');
    await expect(page.getByRole('heading', { name: 'Limit ₦ 100.24 - ₦ 1,237,987.70' })).toHaveText(/Limit ₦ 100.24 - ₦ 1,237,987.70/)
    //Filter by 0 fiat amount
    await page.getByPlaceholder('Enter amount').press('Meta+a');
    await page.getByPlaceholder('Enter amount').fill('0');
    //Confirm that no ads are displayed
    await expect(page.getByText('All ads matching your search will appear here')).toHaveText(/All ads matching your search will appear here/);



    //Filter by payment method and check that ads have that payment in them
    //Filter by Bank transfer
    await page.getByRole('button', { name: 'All payment methods' }).click();
    await page.getByRole('option', { name: 'Bank Transfer' }).click();
    await expect(page.getByText('Bank Transfer')).toHaveText(/Bank Transfer/);
    //Filter by PocketApp payment method
    await page.getByRole('button', { name: 'Bank Transfer' }).click();
    await page.getByRole('option', { name: 'PocketApp (Formerly Abeg)' }).click();
    //Confirm no ads are displayed
    await expect(page.getByText('All ads matching your search will appear here')).toHaveText(/All ads matching your search will appear here/);




    //Reset payment method filter
    await page.getByRole('button', { name: 'PocketApp (Formerly Abeg)' }).click();
    await page.getByRole('option', { name: 'All payment methods' }).click();

    


    //Filter by network
    //Revisit the landing page
    await page.goto('https://app.dev.onboardpay.co/');
    //Click on network dropdown
    await page.getByRole('button', { name: 'Binance Smart Chain Testnet' }).click();
    //Select all network
    await page.getByRole('option', { name: 'All Networks' }).click();
    //confirm ads are displayed
    await expect(page.getByRole('listitem').filter({ hasText: 'NGN 619.14 Limit ₦ 10,000.00 - ₦ 2,000,000.00@jtglobal| 23 trades|27%|Avg. completion' })).toHaveText(/NGN 619.14 Limit ₦ 10,000.00 - ₦ 2,000,000.00@jtglobal| 23 trades|27%|Avg. completion/);
  
    //Select BSC network and check that matic ads are not displayed
    await page.getByRole('button', { name: 'All Networks' }).click();
    await page.getByRole('option', { name: 'Binance Smart Chain Testnet' }).click();
    //Click on matic tab
    await page.getByRole('button', { name: 'MATIC' }).click();
    await expect(page.getByText('All ads matching your search will appear here')).toHaveText(/All ads matching your search will appear here/);

    //Filter matic ads by sell to display MATIC ads
    //Select polygon mumbai network
    await page.getByRole('button', { name: 'Binance Smart Chain Testnet' }).click();
    await page.getByRole('option', { name: 'Polygon Mumbai Testnet' }).click();
    //Select sell ad types
    await page.getByRole('button', { name: 'Sell' }).click();
    await expect(page.getByRole('listitem').filter({ hasText: 'NGN 828.95 Limit ₦ 1,940.63 - ₦ 194,063.05@Johndoe3| 36 trades|22%|Avg. completion' })).toHaveText(/NGN 828.95 Limit ₦ 1,940.63 - ₦ 194,063.05@Johndoe3| 36 trades|22%|Avg. completion/);




    //Refresh page
    await page.getByRole('button', { name: 'Refresh' }).click();
















})