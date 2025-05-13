Feature: Add button behavior based on country selection

  Scenario Outline: Verify ADD button behavior and address creation based on country selection
    Given I am on the delivery address section
    Then I should see the "ADD" button
    When I select "<country>"
    Then the "ADD" button should <visibility> visible
    And the "ADD" button should <enabled> enabled
    When I click on the "ADD" button
    Then the Add Address modal should <modalState> open
    When I fill the Add Address form with "<formType>"
    And I click on "REGISTER"
    Then the address should be "<creationStatus>"

    Examples:
      | country      | visibility  | enabled | modalState | formType | creationStatus |
      | Ivory Coast  | be          | not     | not        | valid    | skipped        |#u can t add adress from another country 
      |              | be          | be      | be         | valid    | success        |#valid input
      |              | be          | be      | be         | invalid  | error          |#invalid Scenario
