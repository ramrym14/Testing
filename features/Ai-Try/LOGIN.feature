
Feature: Login functionality for multiple countries

Scenario Outline: Validate login credentials based on country
    Given I navigate to the login page
    When I enter "<username>" and "<password>"
    And I click the login button
    Then I should be redirected to "<result>" page
    But if the password is incorrect for Tunisia, then I should see "Error : Incorrect credentials, please try again !" message

Examples:
  | country   | username          | password         | result     | message            |
  | Tunisia   | TN08343357        | megadios         | dashboard  |                    |
  | Tunisia   | TN08343357        | invalid_password | error      | Error : Incorrect credentials, please try again ! |
  | Algeria   | DZ108440950       | megadios         | dashboard  |                    |
  | Côte d’Ivoire | CI001798852     | megadios        | dashboard  |                    |
  | Kuwait   | EG29007020101141 | megadios        | dashboard  |                    |
  | United Arab Emirates | IQ199499330881     | megadios        | dashboard  |                    |
  | Burkina Faso   | BF20980614        | megadios        | dashboard  |                    |
  | Libya       | LYAC304976        | megadios        | dashboard  |                    |
  | Saudi Arabia| YE09986352        | megadios        | dashboard  |                    |
  | Oman       | OM17905937        | megadios        | dashboard  |                    |
