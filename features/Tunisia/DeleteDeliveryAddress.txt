Feature: Delete delivery address

  Scenario Outline: Try to delete delivery addresses from different cases
  Given I am on the delete delivery address section
  And I switch to country "<country>" if needed
  And I store the text of the first address in the list
  When I click the delete icon of the first address
  And I choose to "<confirmationAction>" the deletion
  Then I should <successMessageVisibility> the success message
  And I click OK to close the success message if visible
  Then I should <addressVisibility> the address in the list

  Examples:
    | country   | confirmationAction | successMessageVisibility | addressVisibility |
    |           | Cancel             | not see                  | still see         |
    |           | Yes, delete!       | see                      | not see           |
    |  Algeria  | Yes, delete!       | see                      | not see           |
    |           | Yes, delete!       | not see                  | not see         |  
      # if he detect a default adress then he will  try to delete it and then go to the seconde adress
