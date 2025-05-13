Feature: Modify delivery address

  Scenario Outline: Modify an address for a given country with various inputs
    Given I am on the modify delivery address section
    When I select country "<country>"
    And I click on the edit icon of an address
    Then the Modify delivery address modal should open
    When I fill the Modify Address form with:
      | phoneInput   | addressInput      |
      | <phoneInput> | <addressInput>    |
    And I click on "REGISTER" from modify modal
    Then I should see the messages from modify modal:
      | <expectedMessages> |

    Examples:
      | country       | phoneInput          | addressInput               | expectedMessages                                               |
      |               | 9865478222222222222 |                            | Too long , Please enter your address!                          |
      |               | 22                  |                            | Too short , Please enter your address!                         |
      |               | 98654787            | rue ben mandhour212121     | Operation performed successfully                               |
      |Algeria        | 0551124567          | rue algeria                | Operation performed successfully                               |
      |Ivory Coast    | 0123456787          | rue ivory coast            | Operation performed successfully                               |
      |Libya          | 0913456787          | rue libya                  | Operation performed successfully                               |  # check if he detect empty data