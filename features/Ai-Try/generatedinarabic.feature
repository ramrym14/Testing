
Feature: Login Functionality

Scenario: Successful login with valid credentials
  Given the user is on the login page
  When I enter "Arvea" as username
  And I enter "megadios" as password
  When I click the login button
  Then I should be navigated to the dashboard (Control Panel)

Scenario: Failed login with invalid credentials
  Given the user is on the login page
  When I enter an invalid username
  And I enter an invalid password
  When I click the login button
  Then I should see an error message "Invalid username or password"

Scenario: Empty fields on login
  Given the user is on the login page
  When I do not enter any value for username
  And I do not enter any value for password
  When I click the login button
  Then I should see an error message "Username and Password are required"

Scenario: Login with empty username
  Given the user is on the login page
  When I do not enter any value for username
  And I enter a valid password
  When I click the login button
  Then I should see an error message "Username is required"

Scenario: Login with empty password
  Given the user is on the login page
  When I enter a valid username
  And do not enter any value for password
  When I click the login button
  Then I should see an error message "Password is required"

