
Feature: Delivery address management

  Scenario: Verify delivery address table structure and content
    When I close the popup
    And I click on the user icon
    And I click on "My account"
    And I click on "DELIVERY ADDRESS"
    Then I should see a delivery address table
    And every row in the table should have valid address data and not empty
