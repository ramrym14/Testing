
Feature: Login Scenario
  As a QA Engineer
  In order to validate the login functionality
  I want to create test cases for various situations

Scenario: Successful login with valid credentials
  Given I am on the login page
  When I enter "Arvea" as username
     And I enter "megadios" as password
     And I click the login button
  Then I should be redirected to the dashboard page

Scenario: Unsuccessful login with invalid credentials
  Given I am on the login page
  When I enter an incorrect username
     And I enter "megadios" as password
     And I click the login button
  Then I should see an error message indicating incorrect credentials

Scenario: Empty fields validation upon login attempt
  Given I am on the login page
  When I click the login button without filling any fields
  Then I should see error messages for both username and password fields

Scenario: Login with special characters in credentials
  Given I am on the login page
  When I enter "Arvea@example.com" as username
     And I enter "m3g4d105" as password
     And I click the login button
  Then I should be redirected to the dashboard page 
