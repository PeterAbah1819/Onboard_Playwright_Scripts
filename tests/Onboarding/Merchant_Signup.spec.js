// add the test and expect modules as well as the playwright modules
const { test, expect } = require('@playwright/test');

test('Test Merchant Signup invalid phone number', async ({ page }) => {
    await page.goto('https://app.dev.onboardpay.co/merchants/auth/sign-in');
  

//Testing signup with incremental email address
    // Expect a page to contain string.
    await expect(page.getByRole('heading', { name: 'Login or create an account' })).toContainText(/Login or create an account/);

    // Expect a email textbox to be empty.
    await expect(page.getByLabel('Email address')).toContainText("");

    //Function for random email save to email variable
    // Generate a random email address
    const email = 'AutoMerch' + Math.random().toString(36).substring(7) + '@mailinator.com';

    //Enter random/dynamic email address
    await page.getByLabel('Email address').fill(email);
    //Click on continue 
    await page.getByRole('button', { name: 'Continue' }).click();
    //Verify the email entered is the same displayed on the OTP screen
   // await expect(page.getByText('peterabah1@mailinator.com')).toContainText(/peterabah1@mailinator.com/);
 
    //Enter correct Pin
    await page.locator('.pin-input').first().fill('4');
    await page.locator('input:nth-child(2)').fill('9');
    await page.locator('input:nth-child(3)').fill('3');
    await page.locator('input:nth-child(4)').fill('0');
    await page.locator('input:nth-child(5)').fill('1');
    await page.locator('input:nth-child(6)').fill('9');


    //Confirm user is asked to enter phone number
    await expect(page.getByRole('heading', { name: 'Add your phone number' })).toContainText(/Add your phone number/);
    await expect(page.getByText('Provide a valid phone number for your Onboard account')).toContainText(/Provide a valid phone number for your Onboard account/);


    //Add phone number
    //await page.waitFor(3000);
    await page.getByLabel('Phone number').click();
    await page.getByLabel('Phone number').fill('Efw(*&^%594');

    //Click on continue
    await page.getByRole('button', { name: 'Continue' }).click();

    //Confirm error toast displayed
    await expect(page.getByText('Invalid phone number')).toContainText(/Invalid phone number/);



})







test('Test Merchant Signup with invalid full name and username', async ({ page }) => {
    await page.goto('https://app.dev.onboardpay.co/merchants/auth/sign-in');
  

//Testing signup with incremental email address
    // Expect a page to contain string.
    await expect(page.getByRole('heading', { name: 'Login or create an account' })).toContainText(/Login or create an account/);

    // Expect a email textbox to be empty.
    await expect(page.getByLabel('Email address')).toContainText("");

    //Function for random email save to email variable
    // Generate a random email address
    const email = 'AutoMerch' + Math.random().toString(36).substring(7) + '@mailinator.com';

    //Enter random/dynamic email address
    await page.getByLabel('Email address').fill(email);
    //Click on continue 
    await page.getByRole('button', { name: 'Continue' }).click();
    //Verify the email entered is the same displayed on the OTP screen
   // await expect(page.getByText('peterabah1@mailinator.com')).toContainText(/peterabah1@mailinator.com/);
 
    //Enter correct Pin
    await page.locator('.pin-input').first().fill('4');
    await page.locator('input:nth-child(2)').fill('9');
    await page.locator('input:nth-child(3)').fill('3');
    await page.locator('input:nth-child(4)').fill('0');
    await page.locator('input:nth-child(5)').fill('1');
    await page.locator('input:nth-child(6)').fill('9');


    //Confirm user is asked to enter phone number
    await expect(page.getByRole('heading', { name: 'Add your phone number' })).toContainText(/Add your phone number/);
    await expect(page.getByText('Provide a valid phone number for your Onboard account')).toContainText(/Provide a valid phone number for your Onboard account/);


    //Select country code and Add phone number
    //Select country code
    await page.getByRole('button', { name: '+93' }).click();
    await page.getByPlaceholder('Choose a country').click();
    await page.getByPlaceholder('Choose a country').fill('nigeria');
    await page.locator('a').filter({ hasText: '+234 - Nigeria' }).click();
  
    await page.getByLabel('Phone number').click();
    await page.getByLabel('Phone number').fill('8127738594');

    //Click on continue
    await page.getByRole('button', { name: 'Continue' }).click();

    //Confirm the screen displayed is the merchant onboarding checklist
    await expect(page.getByRole('heading', { name: 'Let’s set up your account' })).toContainText(/Let’s set up your account/);
    await expect(page.getByText('This will help establish your identity and secure your account. Takes about 5 mi')).toContainText(/This will help establish your identity and secure your account. Takes about 5 mi/);



    //Click on continue on the checklist page
    await page.getByRole('button', { name: 'Continue' }).click();



    //Confirm step 1 of 3 (personal details) page is displayed in the onboarding flow
    await expect(page.getByRole('heading', { name: 'Step 1 of 3' })).toContainText(/Step 1 of 3/);
    await expect(page.getByRole('heading', { name: 'Personal details' })).toContainText(/Personal details/);
    await expect(page.getByText('Your personal details will serve as your identification on Onboard.')).toContainText(/Your personal details will serve as your identification on Onboard./);
  





            //Create a function that helps generate random fullname everytime
            //This is the beginning of the function
            const vowels = "aeiou";
            const consonants = "bcdfghjklmnpqrstvwxyz";

            function generateRandomName(length) {
            let name = "";
            for (let i = 0; i < length; i++) {
                if (i % 2 === 0) {
                // Generate a random consonant for even positions
                name += consonants[Math.floor(Math.random() * consonants.length)];
                } else {
                // Generate a random vowel for odd positions
                name += vowels[Math.floor(Math.random() * vowels.length)];
                }
            }
            return name;
            }

            const randomFirstName = generateRandomName(4);
            const randomLastName = generateRandomName(4);

            const randomFullName = randomFirstName + " " + randomLastName;

            //This is the end of the function
            //now we call randomFullName in the code for filling in fullname for random names to be populated into the ui

            //We will write another function for username to be populated at random
            //This is the beginning of the function

            const randomUserName = 'test' + Math.random().toString(36).substring(2, 6);

            //This is the end of the function
            //now we call randomUserName in the code for filling in username for random names to be populated into the ui








//Fill in the invalid full name with space and confirm the error message displayed

    //Enter full name
    await page.getByLabel('Full name on ID').click();
    await page.getByLabel('Full name on ID').fill('test123 rest456');

    //Enter display name
    await page.getByLabel('Set a display name').click();
    await page.getByLabel('Set a display name').fill(randomUserName);

    //Select no for business acccount usage
    await page.getByText('No').click();

    //Click on continue
    await page.getByRole('button', { name: 'Continue' }).click();

    //confirm error message displayed says the full name is invalid and can only have letters
    await expect(page.getByText('Full name must be only letters')).toContainText(/Full name must be only letters/);


//Fill in the invalid full name without space and confirm the error message displayed

    //Enter full name
    await page.getByLabel('Full name on ID').click();
    await page.getByLabel('Full name on ID').fill('testrest');

    //Enter display name
    await page.getByLabel('Set a display name').click();
    await page.getByLabel('Set a display name').fill(randomUserName);

    // //Select no for business acccount usage
    // await page.getByText('No').click();

    //Click on continue
    await page.getByRole('button', { name: 'Continue' }).click();

    //confirm error message displayed says the full name is invalid and can only have letters
    await expect(page.getByText('Full name must be at least 2 names')).toContainText(/Full name must be at least 2 names/);





//Fill in the invalid username with space and confirm the error message displayed

    //Enter full name
    await page.getByLabel('Full name on ID').click();
    await page.getByLabel('Full name on ID').fill(randomFullName);

    //Enter display name
    await page.getByLabel('Set a display name').click();
    await page.getByLabel('Set a display name').fill('Tester Rester');

    // //Select no for business acccount usage
    // await page.getByText('No').click();

    //Click on continue
    await page.getByRole('button', { name: 'Continue' }).click();

    //confirm error message displayed says the Username is invalid and can not have space
    await expect(page.getByText('Display name should have no space')).toContainText(/Display name should have no space/);




})








test('Test Merchant Signup Not Business Account and skip', async ({ page }) => {
    await page.goto('https://app.dev.onboardpay.co/merchants/auth/sign-in');
  

//Testing signup with incremental email address
    // Expect a page to contain string.
    await expect(page.getByRole('heading', { name: 'Login or create an account' })).toContainText(/Login or create an account/);

    // Expect a email textbox to be empty.
    await expect(page.getByLabel('Email address')).toContainText("");



    //Function for random email save to email variable
    // Generate a random email address
    const email = 'AutoMerch' + Math.random().toString(36).substring(7) + '@mailinator.com';

    //Enter random/dynamic email address
    await page.getByLabel('Email address').fill(email);
    //Click on continue 
    await page.getByRole('button', { name: 'Continue' }).click();
    //Verify the email entered is the same displayed on the OTP screen
   // await expect(page.getByText('peterabah1@mailinator.com')).toContainText(/peterabah1@mailinator.com/);
 
    //Enter correct Pin
    await page.locator('.pin-input').first().fill('4');
    await page.locator('input:nth-child(2)').fill('9');
    await page.locator('input:nth-child(3)').fill('3');
    await page.locator('input:nth-child(4)').fill('0');
    await page.locator('input:nth-child(5)').fill('1');
    await page.locator('input:nth-child(6)').fill('9');


    //Confirm user is asked to enter phone number
    await expect(page.getByRole('heading', { name: 'Add your phone number' })).toContainText(/Add your phone number/);
    await expect(page.getByText('Provide a valid phone number for your Onboard account')).toContainText(/Provide a valid phone number for your Onboard account/);


    //Add phone number
    //await page.waitFor(3000);    
    //Select country code
    await page.getByRole('button', { name: '+93' }).click();
    await page.getByPlaceholder('Choose a country').click();
    await page.getByPlaceholder('Choose a country').fill('nigeria');
    await page.locator('a').filter({ hasText: '+234 - Nigeria' }).click();
    await page.getByLabel('Phone number').click();
    await page.getByLabel('Phone number').fill('08127738594');

    //Click on continue
    await page.getByRole('button', { name: 'Continue' }).click();

    //Confirm the screen displayed is the merchant onboarding checklist
    await expect(page.getByText('Let’s set up your account' )).toContainText(/Let’s set up your account/);
    await expect(page.getByText('This will help establish your identity and secure your account. Takes about 5 mi')).toContainText(/This will help establish your identity and secure your account. Takes about 5 mi/);



    //Click on continue on the checklist page
    await page.getByRole('button', { name: 'Continue' }).click();



    //Confirm step 1 of 3 (personal details) page is displayed in the onboarding flow
    await expect(page.getByRole('heading', { name: 'Step 1 of 3' })).toContainText(/Step 1 of 3/);
    await expect(page.getByRole('heading', { name: 'Personal details' })).toContainText(/Personal details/);
    await expect(page.getByText('Your personal details will serve as your identification on Onboard.')).toContainText(/Your personal details will serve as your identification on Onboard./);
  

            //Create a function that helps generate random fullname everytime
            //This is the beginning of the function
            const vowels = "aeiou";
            const consonants = "bcdfghjklmnpqrstvwxyz";

            function generateRandomName(length) {
            let name = "";
            for (let i = 0; i < length; i++) {
                if (i % 2 === 0) {
                // Generate a random consonant for even positions
                name += consonants[Math.floor(Math.random() * consonants.length)];
                } else {
                // Generate a random vowel for odd positions
                name += vowels[Math.floor(Math.random() * vowels.length)];
                }
            }
            return name;
            }

            const randomFirstName = generateRandomName(4);
            const randomLastName = generateRandomName(4);

            const randomFullName = randomFirstName + " " + randomLastName;

            //This is the end of the function
            //now we call randomFullName in the code for filling in fullname for random names to be populated into the ui

            //We will write another function for username to be populated at random
            //This is the beginning of the function

            const randomUserName = 'test' + Math.random().toString(36).substring(2, 6);

            //This is the end of the function
            //now we call randomUserName in the code for filling in username for random names to be populated into the ui










//Fill in the full name, display name and select no for business account

    //Enter full name
    await page.getByLabel('Full name on ID').click();
    await page.getByLabel('Full name on ID').fill(randomFullName);

    //Enter display name
    await page.getByLabel('Set a display name').click();
    await page.getByLabel('Set a display name').fill(randomUserName);

    //Select no for business acccount usage
    await page.getByText('No').click();

    //Click on continue
    await page.getByRole('button', { name: 'Continue' }).click();


//Confirm the page displayed is asking the merchant to agree to terms and policies and confirm them

    //Confirm the terms modal is displayed
    await expect(page.getByRole('heading', { name: 'Confirm the following statements below' })).toContainText(/Confirm the following statements below/);
    
    //Confirm legal use of funds terms text is displayed
    await expect(page.getByText('I confirm that all funds used on Onboard (crypto and fiat) are from legal sources')).toContainText("I confirm that all funds used on Onboard (crypto and fiat) are from legal sources");
    //Click on the first radio box to confirm
    await page.getByText('I confirm that all funds used on Onboard (crypto and fiat) are from legal source').click();
    //Confirm terms text is displayed
    await expect(page.getByText('I have read and accept Onboard\'s terms & conditions')).toContainText('I have read and accept Onboard\'s terms & conditions');
    //Click on the second radio box to confirm
    await page.getByText('I have read and accept Onboard\'s terms & conditions').click();
  
    //Click on I accept button
    await page.getByRole('button', { name: 'I accept' }).click();


//Skip the onboarding and confirm that the kyc banner is displayed with continue

    //Click on skip
    await page.getByRole('button', { name: 'Skip for now' }).click();
    await page.getByRole('button', { name: 'Skip', exact: true }).click();

    //Confirm that the user sees KYC banner with continue button
    await page.getByText('Complete your merchant profile to start trading. Continue').click();

    //Click on continue on the banner
    await page.getByRole('button', { name: 'Continue' }).click();

    //Clicking on continue leads the user back to the onboarding flow
    await expect(page.getByRole('heading', { name: 'Now, let’s verify your identity!' })).toContainText(/Now, let’s verify your identity!/);



})
