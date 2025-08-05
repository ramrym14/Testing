
Feature: Login functionality for multiple countries
  As a QA engineer
  I want to test the login functionality for multiple countries
  So that I can validate its correctness

Scenario Outline: Verify login process with given credentials
  Given the user navigates to the login page
  When they enter "<username>" and "<password>"
  And press the login button
  Then they should be redirected to "<result>"
  But if the credentials are incorrect for Tunisia,
    And I expect to see an error message "<message>"

Examples:
  | country       | username   | password | result      | message              |
  | Tunisia       | TN08343357 | megadios | dashboard   |                      |
  | Tunisia       | TN08343357 | wrongpwd | error       | "Error : Incorrect credentials, please try again !" |
  | Algeria       | DZ108440950| megadios | dashboard   |                      |
  | Côte d’Ivoire  | CI001798852| megadios | dashboard   |                      |
  | Kuwait        | EG29007020101141| megadios | dashboard   |                      |
  | United Arab Emirates| IQ199499330881| megadios | dashboard   |                      |
  | Burkina Faso   | BF20980614  | megadios | dashboard   |                      |
  | Libya         | LYAC304976  | megadios | dashboard   |                      |
  | Saudi Arabia | YE09986352  | megadios | dashboard   |                      |
  | Oman          | OM17905937  | megadios | dashboard   |                      |
