
Feature: Test login functionality for multiple countries

Scenario Outline: Verify user can log in with correct/incorrect credentials based on country
  Given the user navigates to the login page
  When they enter "<username>" as their username
  And they enter "<password>" as their password
  Then they should be redirected to the dashboard if credentials are valid
  But if credentials are invalid for Tunisia, they see the error message: "Error : Incorrect credentials, please try again !"

  Examples: | country       | username    | password | result     | message         |
    | Tunisia     | TN08343357  | megadios  | dashboard  |                   |
    | Tunisia     | TN08343357  | invalidpw | error      | Error : Incorrect credentials, please try again !|
    | Algeria     | DZ108440950 | megadios  | dashboard  |                   |
    | Côte d’Ivoire| CI001798852| megadios  | dashboard  |                   |
    | Kuwait      | EG29007020101141| megadios  | dashboard  |                   |
    | United Arab Emirates| IQ199499330881| megadios  | dashboard  |                   |
    | Burkina Faso  | BF20980614   | megadios  | dashboard  |                   |
    | Libya       | LYAC304976   | megadios  | dashboard  |                   |
    | Saudi Arabia| YE09986352   | megadios  | dashboard  |                   |
    | Oman        | OM17905937   | megadios  | dashboard  |                   |
