
Feature: Test login functionality for multiple countries
  As a QA engineer,
  In order to verify the login functionality for each country,
  I want to test the following scenarios using Playwright with CucumberJS.

Scenario Outline: Verify login with different credentials
  Given the user navigates to the login page
  When they enter "<username>" and "<password>"
  And click on login button
  Then they should be redirected to "<result>" page
  But if "<result>" is "Error" then I should see the message "<message>"

Examples:
  | country       | username                         | password          | result    | message              |
  | Tunisia       | TN08343357                      | megadios           | dashboard |                     |
  | Tunisia       | TN08343357                      | invalid_password  | Error     | "Error : Incorrect credentials, please try again !" |
  | Algeria       | DZ108440950                     | megadios           | dashboard |                     |
  | Côte d’Ivoire | CI001798852                     | megadios           | dashboard |                     |
  | Kuwait        | EG29007020101141                | megadios           | dashboard |                     |
  | United Arab Emirates      | IQ199499330881             | megadios           | dashboard |                     |
  | Burkina Faso          | BF20980614                     | megadios           | dashboard |                     |
  | Libya            | LYAC304976                      | megadios           | dashboard |                     |
  | Saudi Arabia        | YE09986352                     | megadios           | dashboard |                     |
  | Oman              | OM17905937                      | megadios           | dashboard |                     |
