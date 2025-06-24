@login @low
Feature: Login functionality

  Scenario Outline: Login and check result and flag
    Given I am on the login page
    When I login using username "<username>" and password "<password>"
    Then I should see "<result>" and "<message>"
    And the country flag icon should be "<flagClass>"

    Examples:
      | country          | username         | password | result     | message                                           | flagClass      |
      | Tunisia          | TN08343357       | megadios | dashboard  |                                                   | flag-icon-tn   |
      | Tunisia (invalid)| TN08343357       | wrongpwd | error      | Error : Incorrect credentials, please try again ! | flag-icon-tn   |
      | Algeria          | DZ108440950      | megadios | dashboard  |                                                   | flag-icon-dz   |
      | Côte d’Ivoire    | CI001798852      | megadios | dashboard  |                                                   | flag-icon-ci   |
      | Kuwait           | EG29007020101141 | megadios | dashboard  |                                                   | flag-icon-kw   |
      | United Arab Emirates | IQ199499330881 | megadios | dashboard  |                                                 | flag-icon-ae   |
      | Burkina Faso     | BF20980614       | megadios | dashboard  |                                                   | flag-icon-bf   |
      | Libya            | LYAC304976       | megadios | dashboard  |                                                   | flag-icon-ly   |
      | Saudi Arabia     | YE09986352       | megadios | dashboard  |                                                   | flag-icon-sa   |
      | Oman             | OM17905937       | megadios | dashboard  |                                                   | flag-icon-om   |
