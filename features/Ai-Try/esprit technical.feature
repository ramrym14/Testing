 Here is a Gherkin BDD feature file for Playwright with CucumberJS that covers both valid and invalid login scenarios, using a table for input data:

```gherkin
Feature: Login functionality
  As a user, I want to be able to log in with a valid username and password, and also verify the error message when attempting to log in with invalid credentials.

Scenario: Valid login scenario
  Given I am on the login page
  | Country       | Username          | Password    |
  | Tunisia       | TN08343357        | megadios    |

  When I enter the provided credentials and submit the form
  Then I should be redirected to the dashboard page

Scenario: Invalid login scenario - empty fields
  Given I am on the login page with an empty username field
  | Country       | Username          | Password    |
  | Tunisia       |                   | megadios    |

  When I submit the form without filling out any fields
  Then I should see an error message "Please enter your username and password."

Scenario: Invalid login scenario - incorrect password
  Given I am on the login page with a valid username field
  | Country       | Username          | Password    |
  | Tunisia       | TN08343357        | wrong_pwd   |

  When I enter the provided credentials and submit the form
  Then I should see an error message "Incorrect password."

Scenario: Invalid login scenario - non-existent username
  Given I am on the login page with a valid country field
  | Country       | Username          | Password    |
  | Tunisia       | invalid_user      | megadios    |

  When I enter the provided credentials and submit the form
  Then I should see an error message "Username not found."
```

This feature file uses a table for input data, making it easy to add or modify login combinations in the future.