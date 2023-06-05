// add the test and expect modules as well as the playwright modules
const { test, expect } = require('@playwright/test');

test('View and filter customer orders (Completed, Ongoing, Cancelled, Disputed in Buy and Sell', async ({ page }) => {
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
 



//Navigate to orders page and filter across the page to view all orders

     //Click on orders tab to view ungoing orders
     await page.getByRole('link', { name: 'Orders' }).click();

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

     //Navigate to the completed tab and click on all
     await page.getByRole('button', { name: 'All' }).click();
     await page.getByRole('button', { name: 'completed' }).click();

     //COnfirm the refresh button and click on it to refresh the page
     await expect (page.locator('div').filter({ hasText: 'Refresh' }).locator('div').first()).toHaveText(/Refresh/);
     await page.getByRole('button', { name: 'Refresh' }).click();
   









})