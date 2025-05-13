@login
Feature: Login functionality

  Scenario Outline: Login and check result and flag
    Given I am on the login page
    When I login using username "<username>" and password "<password>"
    Then I should see "<result>" and "<message>"
    And the country flag icon should be "<flagClass>"

    Examples:
      | username       | password | result     | message                                           | flagClass          |
      | TN08343357     | megadios | dashboard  |                                                   | flag-icon-tn       |
      | TN08343357     | wrongpwd | error      | Error : Incorrect credentials, please try again ! | flag-icon-tn       |
      | DZ108440950    | megadios | dashboard  |                                                   | flag-icon-dz       |
      | CI001798852    | megadios | dashboard  |                                                   | flag-icon-ci       |
      | EG29007020101141 | megadios | dashboard  |                                                   | flag-icon-eg     |
      | IQ199499330881 | megadios | dashboard  |                                                   | flag-icon-iq       |
      | BF20980614     | megadios | dashboard  |                                                   | flag-icon-bf       |
      | LYAC304976     | megadios | dashboard  |                                                   | flag-icon-ly       |
      | YE09986352     | megadios | dashboard  |                                                   | flag-icon-ye       |
      | OM17905937     | megadios | dashboard  |                                                   | flag-icon-om       |
