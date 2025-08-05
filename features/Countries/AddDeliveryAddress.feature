@add  @high
Feature: Delivery address behavior based on selected country

  Scenario Outline: Verify ADD button behavior and address form outcome by selected country
    Given I am logged in as "<username>" from "<loginCountry>"
    And I am on the delivery address section
    When I select "<selectedCountry>"
    Then the "ADD" button should <visibility> visible
    And the "ADD" button should <enabled> enabled
    When I click on the "ADD" button
    Then the Add Address modal should <modalState> open
    When I fill the Add Address form with "<formType>"
    And I click on "REGISTER"
    Then the address should be "<creationStatus>"
    And I should see the messages:
      | <expectedMessages> |

  Examples:
  
  | loginCountry | username     | selectedCountry | visibility | enabled | modalState | formType    | creationStatus | expectedMessages                                      |
  | Tunisia      | TN08343358   |                 | be         | be      | be         | validData   | success        | Operation performed successfully                      |#error credential in user name 
  | Tunisia      | TN08343357   |                 | be         | be      | be         | validData   | success        | Operation performed successfully                      |
  | Tunisia      | TN08343357   |                 | be         | be      | be         | shortPhone  | error          | Too short , Please enter your address!                |
  | Tunisia      | TN08343357   |                 | be         | be      | be         | longPhone   | error          | Too long , Please enter your address!                 |
  | Tunisia      | TN08343357   | Algeria         | be         | not     | not        | valid       | skipped        |                                                       |


  #| Algeria     | DZ108440950   |                 | be         | be      | be         | validData   | success        | Operation performed successfully                      |
  #| Algeria     | DZ108440950   |                 | be         | be      | be         | shortPhone  | error          | Too short , Please enter your address!                |
 # | Algeria     | DZ108440950   |                 | be         | be      | be         | longPhone   | error          | Too long , Please enter your address!                 |
 # | Algeria     | DZ108440950   | Tunisia         | be         | not     | not        | valid       | skipped        |                                                       |

 # | Libya     | LYAC304976   |                 | be         | be      | be         | validData   | success           | Operation performed successfully                      |
 # | Libya     | LYAC304976   |                 | be         | be      | be         | shortPhone  | error             | Too short , Please enter your address!                |
  #| Libya     | LYAC304976   |                 | be         | be      | be         | longPhone   | error             | Too long , Please enter your address!                 |
 # | Libya     | LYAC304976   | Tunisia         | be         | not     | not        | valid       | skipped           |                                                       |

 # | IvoryCoast   | CI001798852   |                 | be         | be      | be         | validData   | success       | Operation performed successfully                      |
 # |IvoryCoast    | CI001798852   |                 | be         | be      | be         | shortPhone  | error         | Too short , Please enter your address!                |
 # | IvoryCoast   | CI001798852   |                 | be         | be      | be         | longPhone   | error         | Too long , Please enter your address!                 |
  #|IvoryCoast    | CI001798852   | Tunisia         | be         | not     | not        | valid       | skipped       |                                                       |


 #|BurkinaFaso   | BF20980614   |                 | be         | be      | be         | validData   | success        | Operation performed successfully                      |
 # |BurkinaFaso  | BF20980614   |                 | be         | be      | be         | shortPhone  | error           | Too short , Please enter your address!                |
 # |BurkinaFaso  | BF20980614   |                 | be         | be      | be         | longPhone   | error           | Too long , Please enter your address!                 |
 # |BurkinaFaso   | BF20980614   | Tunisia         | be         | not     | not        | valid       | skipped        |                                                       |

  # | Kuwait  | EG29007020101141   |                         | be          | be     | be    | validData   | success   | Operation performed successfully                              |
  # | Kuwait  | EG29007020101141   |                         | be          | be     | be    | shortPhone  | error     | Too short , Please enter your street , Please enter your house / building number |
  # | Kuwait  | EG29007020101141   |                         | be          | be     | be    | longPhone   | error     | Too long , Please enter your street , Please enter your house / building number |
  # | Kuwait  | EG29007020101141   | United Arab Emirates    | be          | not    | not   | valid       | skipped   |                                                              |

  # | Iraq  | IQ199499330881   |                         | be          | be     | be    | validData   | success        | Operation performed successfully         |
  # | Iraq  | IQ199499330881   |                         | be          | be     | be    | shortPhone  | error          |Too short , Please enter your address!    |
  # | Iraq  | IQ199499330881   |                         | be          | be     | be    | longPhone   | error          | Too long , Please enter your address!    |
  # | Iraq  | IQ199499330881   | United Arab Emirates    | be          | not    | not   | valid       | skipped        |                                          |

  # | SaudiArabia | YE09986352   |                         | be          | be     | be    | validData   | success      | Operation performed successfully         |
  # | SaudiArabia | YE09986352   |                         | be          | be     | be    | shortPhone  | error        |Too short ,Please enter your building / villa name or number   |
  # | SaudiArabia | YE09986352   |                         | be          | be     | be    | longPhone   | error        | Too long , Please enter your building / villa name or number   |
  # | SaudiArabia | YE09986352  | United Arab Emirates     | be          | not    | not   | valid       | skipped      |                                          |

  # | Oman | OM17905937        |                         | be          | be     | be    | validData   | success        | Operation performed successfully         |
  # | Oman | OM17905937        |                         | be          | be     | be    | shortPhone  | error          |     Too short , Please enter your address! |
  # | Oman | OM17905937        |                         | be          | be     | be    | longPhone   | error          | Too long , Please enter your address!    |
  # | Oman | OM17905937        | Kuwait                  | be          | not    | not   | valid       | skipped        |                                          |

  # | UAE | EG29509141602348   |                         | be          | be     | be    | validData   | success        | Operation performed successfully         |
 #  | UAE | EG29509141602348   |                         | be          | be     | be    | shortPhone  | error          |     Too short ,  Please enter your building / villa name or number  |
 #| UAE | EG29509141602348   |                         | be          | be     | be    | longPhone   | error          | Too long ,  Please enter your building / villa name or number    |
  # | UAE | EG29509141602348   | Kuwait                  | be          | not    | not   | valid       | skipped        |                                          |
