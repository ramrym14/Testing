
Feature: Login functionality for the web application
  As a QA Engineer,
  I want to verify that users can log in successfully and navigate to the dashboard.

Scenario Outline: User logs in with valid credentials
  Given the user is on the login page
  When they enter "<username>" and "<password>"
  And click the Login button
  Then they should be redirected to the dashboard

Examples:
  | username   | password |
  | Arvea      | megadios |

Scenario Outline: User logs in with invalid credentials
  Given the user is on the login page
  When they enter "<invalid_username>" and "<password>"
  And click the Login button
  Then an error message should be displayed

Examples:
  | invalid_username   | password       |
  | empty              | megadios       |
  | Arvea              | incorrect     |
  | arvea              | megadios      |
