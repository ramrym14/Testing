@modify @medium
Feature: Modify delivery address

  Scenario Outline: Modify an address using various data inputs and verify the outcome
 Given I am logged in as "<username>" from "<loginCountry>"
    And I am on the delivery address section
    When I select country "<country>"
    And I click on the edit icon of an address
    Then the Modify delivery address modal should open
    When I fill the Modify Address form with "<formType>"
    And I click on "REGISTER" from modify modal
    Then I should see the messages from modify modal:
      | <expectedMessages> |

  Examples:
    | loginCountry | username      | country       | formType    | expectedMessages                                               |
   | Tunisia     | TN08343357    |               | longPhone   | Too long , Please enter your address!                          |
  # | Tunisia      | TN08343357    |               | shortPhone  | Too short , Please enter your address!                         |
   #| Tunisia      | TN08343357    |               | validData   | Operation performed successfully                               |
   #| Tunisia     | TN08343357    | Algeria       | validData   | Operation performed successfully                               |
   #| Tunisia      | TN08343357    | Ivory Coast   | validData   | Operation performed successfully                               |
   #| Tunisia      | TN08343357    | Libya         | validData   | Operation performed successfully                               |
    
    
   #| Algeria      | DZ108440950   |               | longPhone   | Too long , Please enter your address!                          |
  # | Algeria      | DZ108440950   |               | shortPhone  | Too short , Please enter your address!                         |
   #| Algeria      | DZ108440950   |               | validData   | Operation performed successfully                               |
   #| Algeria      | DZ108440950   | Ivory Coast   | validData   | Operation performed successfully                               |
   #| Algeria      | DZ108440950   | Libya         | validData   | Operation performed successfully                               |
   #| Algeria      | DZ108440950   | Tunisia       | validData   | Operation performed successfully                               |

   # | Libya      | LYAC304976   |               | longPhone   | Too long , Please enter your address!                          |
   # | Libya      | LYAC304976   |               | shortPhone  | Too short , Please enter your address!                         |
   # | Libya      | LYAC304976   |               | validData   | Operation performed successfully                               |
    #| Libya      | LYAC304976   | Algeria       | validData   | Operation performed successfully                               |
    #| Libya      | LYAC304976   | Ivory Coast   | validData   | Operation performed successfully                               |
    #| Libya      | LYAC304976   | Tunisia       | validData   | Operation performed successfully                               |
 
   #| IvoryCoast      | CI001798852    |               | longPhone   | Too long , Please enter your address!                          |
    #|IvoryCoast     | CI001798852   |               | shortPhone  | Too short , Please enter your address!                         |
    #| IvoryCoast      | CI001798852   |               | validData   | Operation performed successfully                               |
    #| IvoryCoast      | CI001798852   | Algeria  | validData   | Operation performed successfully                               |
    #| IvoryCoast     | CI001798852   | Libya       | validData   | Operation performed successfully                               |
    #| IvoryCoast      | CI001798852   | Tunisia         | validData   | Operation performed successfully                               |


  #| BurkinaFaso      | BF20980614    |               | longPhone   | Too long , Please enter your address!                          |
   # |BurkinaFaso     | BF20980614   |               | shortPhone  | Too short , Please enter your address!                         |
    #| BurkinaFaso      | BF20980614   |               | validData   | Operation performed successfully                               |
   #| BurkinaFaso      | BF20980614   | Algeria  | validData   | Operation performed successfully                               |
    #|BurkinaFaso     | BF20980614   | Libya       | validData   | Operation performed successfully                               |
    #| BurkinaFaso      | BF20980614   | Tunisia         | validData   | Operation performed successfully                               |

   #| Kuwait      | EG29007020101141    |               | longPhone   | Too long , Please enter your street                         |
    #|Kuwait     | EG29007020101141   |               | shortPhone  | Too short ,  Please enter your street                        |
    #| Kuwait      | EG29007020101141   |               | validData   | Operation performed successfully                               |
    #| Kuwait      | EG29007020101141   | United Arab Emirates  | validData   | Operation performed successfully                               |
    #|Kuwait     | EG29007020101141   | Kingdom of Saudi Arabia      | validData   | Operation performed successfully                               |
   #| Kuwait      | EG29007020101141   | The Sultanate of Oman        | validData   | Operation performed successfully                               | 
   #| Kuwait      | EG29007020101141   | Iraq       | validData   | Operation performed successfully                               |
    
    #| Iraq      | IQ199499330881    |               | longPhone   | Too long , Please enter your address!                          |
    #|Iraq       | IQ199499330881   |               | shortPhone  | Too short , Please enter your address!                         |
    #| Iraq      | IQ199499330881   |               | validData   | Operation performed successfully                               |
   #| Iraq      | IQ199499330881   | United Arab Emirates  | validData   | Operation performed successfully                               |
   #|Iraq     | IQ199499330881   | Kingdom of Saudi Arabia      | validData   | Operation performed successfully                               |
   #| Iraq      | IQ199499330881   | The Sultanate of Oman        | validData   | Operation performed successfully                               | 
    #| Iraq      | IQ199499330881   | Kuwait       | validData   | Operation performed successfully                               |


   #| Kingdom of Saudi Arabia         | YE09986352    |               | longPhone   | Too long , Please enter your building / villa name or number                         |
    #|Kingdom of Saudi Arabia      | YE09986352   |               | shortPhone  | Too short , Please enter your building / villa name or number                        |
    #| Kingdom of Saudi Arabia       | YE09986352   |               | validData   | Operation performed successfully                               |
    #| Kingdom of Saudi Arabia      | YE09986352   | United Arab Emirates  | validData   | Operation performed successfully                               |
    #|Kingdom of Saudi Arabia      | YE09986352   | Iraq     | validData   | Operation performed successfully                               |
    #| Kingdom of Saudi Arabia       | YE09986352   | The Sultanate of Oman        | validData   | Operation performed successfully                               | 
   #| Kingdom of Saudi Arabia      | YE09986352   | Kuwait       | validData   | Operation performed successfully                               |

   #| The Sultanate of Oman      | OM17905937    |               | longPhone   | Too long , Please enter your address!                       |
   # |The Sultanate of Oman     | OM17905937   |               | shortPhone  | Too short ,  Please enter your address!                       |
    #| The Sultanate of Oman      | OM17905937   |               | validData   | Operation performed successfully                               |
    #| The Sultanate of Oman      | OM17905937   | United Arab Emirates  | validData   | Operation performed successfully                               |
    #|The Sultanate of Oman     | OM17905937   | Iraq     | validData   | Operation performed successfully                               |
    #| The Sultanate of Oman      | OM17905937   | Kingdom of Saudi Arabia       | validData   | Operation performed successfully                               | 
   #| The Sultanate of Oman      | OM17905937   | Kuwait       | validData   | Operation performed successfully                               |


   #| United Arab Emirates      | EG29509141602348    |               | longPhone   | Too long , Please enter your building / villa name or number                         |
    #|United Arab Emirates     | EG29509141602348   |               | shortPhone  | Too short , Please enter your building / villa name or number                        |
    #| United Arab Emirates      | EG29509141602348   |               | validData   | Operation performed successfully                               |
    #| United Arab Emirates      | EG29509141602348   | Kingdom of Saudi Arabia   | validData   | Operation performed successfully                               |
    #|United Arab Emirates     | EG29509141602348   | Iraq     | validData   | Operation performed successfully                               |
   #| United Arab Emirates      | EG29509141602348   | The Sultanate of Oman        | validData   | Operation performed successfully                               | 
   #| United Arab Emirates      | EG29509141602348   | Kuwait        | validData   | Operation performed successfully                               | 