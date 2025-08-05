@delete @low
Feature: Delete delivery address

  Scenario Outline: Try to delete delivery addresses from different cases
     Given I am logged in as "<username>" from "<loginCountry>"
    And I am on the delivery address section
    And I switch to country "<country>" if needed
    And I store the text of the first address in the list
    When I click the delete icon of the first address
    And I choose to "<confirmationAction>" the deletion
    And I choose to "<confirmationAction>" the deletion
  Then I should <successMessageVisibility> the success message
  And I click OK to close the success message if visible
  Then I should <addressVisibility> the address in the list


  Examples:
    | loginCountry | username     | country | confirmationAction | successMessageVisibility | addressVisibility |
    | Tunisia      | TN08343357   |                 | Cancel             | not see                  | still see         |
    | Tunisia      | TN08343357   |                 | Yes, delete!       | see                      | not see           |
   | Tunisia      | TN08343357   | Algeria         | Yes, delete!       | see                      | not see           |
 

   #| Algeria      | DZ108440950   |                 | Cancel             | not see                  | still see         |
  # | Algeria      | DZ108440950   |                 | Yes, delete!       | see                      | not see           |
  # | Algeria      | DZ108440950   | Tunisia         | Yes, delete!       | see                      | not see           |


   #| Libya     | LYAC304976   |                 | Cancel             | not see                  | still see         |
  # | Libya     | LYAC304976   |                 | Yes, delete!       | see                      | not see           |
   #| Libya     | LYAC304976   | Tunisia         | Yes, delete!       | see                      | not see           |


   #| IvoryCoast   | CI001798852   |                 | Cancel             | not see                  | still see         |
   #| IvoryCoast   | CI001798852   |                 | Yes, delete!       | see                      | not see           |
   #| IvoryCoast   | CI001798852   | Tunisia         | Yes, delete!       | see                      | not see           |

  
   #| BurkinaFaso   | BF20980614   |                 | Cancel             | not see                  | still see         |
  # | BurkinaFaso   | BF20980614   |                 | Yes, delete!       | see                      | not see           |
   #| BurkinaFaso   | BF20980614   | Tunisia         | Yes, delete!       | see                      | not see           |

  
   #| Kuwait   | EG29007020101141   |                              | Cancel             | not see                  | still see         |
   #| Kuwait   | EG29007020101141   |                              | Yes, delete!       | see                      | not see           |
   #| Kuwait   | EG29007020101141   | United Arab Emirates         | Yes, delete!       | see                      | not see           |

  
   #| Iraq   | IQ199499330881   |                               | Cancel             | not see                  | still see         |
   #| Iraq   | IQ199499330881   |                               | Yes, delete!       | see                      | not see           |
   #| Iraq   | IQ199499330881   |  United Arab Emirates         | Yes, delete!       | see                      | not see           |

  
   #| SaudiArabia   | YE09986352   |                 | Cancel             | not see                  | still see         |
   #| SaudiArabia   | YE09986352   |                 | Yes, delete!       | see                      | not see           |
   #| SaudiArabia   | YE09986352   | United Arab Emirates         | Yes, delete!       | see                      | not see           |

  # | Oman   | OM17905937   |                 | Cancel             | not see                  | still see         |
  #  | Oman   | OM17905937   |                 | Yes, delete!       | see                      | not see           |
   #| Oman   | OM17905937   | Kuwait         | Yes, delete!       | see                      | not see           |

  
   #| UAE   | EG29509141602348   |                 | Cancel             | not see                  | still see         |
  # | UAE   | EG29509141602348   |                 | Yes, delete!       | see                      | not see           |
  # | UAE   | EG29509141602348   | Kuwait         | Yes, delete!       | see                      | not see           |