
Feature: Login with username and password (table-based scenario)
  As a QA engineer,
  In order to verify the login functionality,
  I want to test the login scenarios using table-based scenario for better clarity.

  Scenario Outline: Validating successful login with different credentials
    Given that I am on the login page
    When I enter "<username>" and "<password>"
    And I click the login button
    Then I should be redirected to the panel

    Examples:
      | username | password | expectedResult |
      | Arvea    | megadios | true           |
      | invalid  | invalid  | false          |
      | empty    |          | false          |

  Scenario Outline: Invalid login scenarios
    Given that I am on the login page
    When I enter "<username>" and "<password>"
    And I click the login button
    Then I should see an error message indicating invalid credentials

    Examples:
      | username | password | expectedErrorMessage                         |
      | Arvea    | wrongpwd | Invalid Credentials: Username or Password Wrong|
      | Arvea    | megadios |                                             |
      | wrongusr | megadios | Invalid Credentials: Username or Password Wrong|

