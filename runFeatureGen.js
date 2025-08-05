const { generateFeatureFromText } = require('./generateFeatureFromText');

const requirement = `
I want to test the login functionality for multiple countries.

- The login password is always "megadios", except in one case where we test an invalid password for Tunisia.
- Each test case will use a specific username for each country.
- The user should go to the login page.
- They enter a username and password.
- If the credentials are correct, they should be redirected to the dashboard.
- If the credentials are incorrect (only for Tunisia with a wrong password), they should see the error message: "Error : Incorrect credentials, please try again !"

The test should use a Scenario Outline format with an Examples table containing:
- country
- username
- password
- result (dashboard or error)
- message (empty or the error message if login fails)

Include the following countries and credentials:

- Tunisia: username "TN08343357" (test with correct and incorrect password)
- Algeria: username "DZ108440950"
- Côte d’Ivoire: username "CI001798852"
- Kuwait: username "EG29007020101141"
- United Arab Emirates: username "IQ199499330881"
- Burkina Faso: username "BF20980614"
- Libya: username "LYAC304976"
- Saudi Arabia: username "YE09986352"
- Oman: username "OM17905937"
 , just put code without comments just pure gherkin language` ;


const outputFile = 'LOGIN.feature';

generateFeatureFromText(requirement, outputFile);
