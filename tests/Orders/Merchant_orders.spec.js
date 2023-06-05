// add the test and expect modules as well as the playwright modules
const { test, expect } = require('@playwright/test');

test('View and filter merchant orders (Completed, Ongoing, Cancelled, Disputed in Buy and Sell and Token name, Network, Fiat and Payment method', async ({ page }) => {
    await page.goto('https://app.dev.onboardpay.co/merchants/auth/sign-in');


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
 

//Navigate to orders page and filter across the page to view all orders

     //Click on orders tab to view ungoing orders
     await page.getByRole('link', { name: 'Orders', exact: true }).click();

     //Navigate to completed, disputed, cancelled and back to ongoing to view orders in those categories
     await page.getByRole('button', { name: 'completed' }).click();
     await page.getByRole('button', { name: 'disputed' }).click();
     await page.getByRole('button', { name: 'cancelled' }).click();
     await page.getByRole('button', { name: 'ongoing' }).click();

     //Click on Buy to view all buy orders in the different categories (Completed, disputed, cancelled and ongoing)
     await page.getByRole('button', { name: 'Buy' }).click();
     await page.getByRole('button', { name: 'completed' }).click();
     await page.getByRole('button', { name: 'disputed' }).click();
     await page.getByRole('button', { name: 'cancelled' }).click();
     await page.getByRole('button', { name: 'ongoing' }).click();

     //Click on Sell to view all sell orders in the different categories (Completed, disputed, cancelled and ongoing)
     await page.getByRole('button', { name: 'Sell' }).click();
     await page.getByRole('button', { name: 'completed' }).click();
     await page.getByRole('button', { name: 'disputed' }).click();
     await page.getByRole('button', { name: 'cancelled' }).click();

     //Navigate back to completed and filter with token and network
     await page.getByRole('button', { name: 'completed' }).click();
     await page.getByRole('button', { name: 'All', exact: true }).click();
     //Filter by BNB token
     await page.getByRole('button', { name: 'Token' }).click();
     await page.locator('a').filter({ hasText: 'BNB - Binance Coin' }).click();
     //Confirm BNB token is the only one displayed
     await expect (page.locator('div').filter({ hasText: '0.425811 BNB' }).locator('span')).toContainText(/BNB/);

     //Filter by Network and confirm there are no orders displayed
     await page.getByRole('button', { name: 'Binance Smart Chain Testnet' }).click();
     await page.getByRole('option', { name: 'Polygon Mumbai Testnet' }).click();
     await expect (page.getByText('Your orders will appear here. Create ads to start getting orders.')).toHaveText(/Your orders will appear here. Create ads to start getting orders./);
   











})