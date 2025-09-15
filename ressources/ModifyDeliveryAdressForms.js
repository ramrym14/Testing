module.exports = {
  Tunisia: {
    selectors: {
      addressRow: 'table tbody tr:first-child',
      editIcon: 'a.editModalAddress',
      modifyModalForm: '[id^="editaddress"]',
      phoneInput: '#phone2',
      addressInput: '#address2',
      registerButton: '[id^="editaddress"] button[type="submit"]',
    },
    validData: {
      phone: '94654780',
      address: 'rue ben mandhour modified',
    },
    shortPhone: {
      phone: '22',
      address: '',
    },
    longPhone: {
      phone: '9865478222222222222',
      address: '',
    },
  },

'Algeria': {
  selectors: {
    address: '#address',
    phone: '#phone1',
    registerButton: '#addaddressAllCountry',
     addressRow: 'table tbody tr:first-child',
      editIcon: 'a.editModalAddress',
      modifyModalForm: '[id^="editaddress"]',
      phoneInput: '#phone2',
      addressInput: '#address2',
      registerButton: '[id^="editaddress"] button[type="submit"]',

  },
  validData: {
   
    address: 'Rue ALGERIA modified',
    phone: '0551234569'
 },
  shortPhone: {

    address: '',
    phone: '05'
  },
  longPhone: {
   
    address: '',
    phone: '05345678901234567890'
  }
},

'IvoryCoast': {
  selectors: {
 
    address: '#address',
    phone: '#phone1',
    registerButton: '#addaddressAllCountry',
     addressRow: 'table tbody tr:first-child',
      editIcon: 'a.editModalAddress',
      modifyModalForm: '[id^="editaddress"]',
      phoneInput: '#phone2',
      addressInput: '#address2',
      registerButton: '[id^="editaddress"] button[type="submit"]',
  },
 
  validData: {
   
    address: 'Rue de Cocody modified',
    phone: '0123456789'
  },
  shortPhone: {
   
    address: '',
    phone: '01'
  },
  longPhone: {
   
    address: '',
    phone: '01345678901234567890'
  }
},
    'Libya': {
  selectors: {
    address: '#address',
    phone: '#phone1',
    registerButton: '#addaddressAllCountry',
    addressRow: 'table tbody tr:first-child',
      editIcon: 'a.editModalAddress',
      modifyModalForm: '[id^="editaddress"]',
      phoneInput: '#phone2',
      addressInput: '#address2',
      registerButton: '[id^="editaddress"] button[type="submit"]',
  },
  validData: {
   
    address: 'Tripoli Street 12 modified ',
    phone: '0912345679'
  
  },
  shortPhone: {
    
    address: '',
    phone: '091'
  },
  longPhone: {
    
    address: '',
    phone: '09145678901234567890'
  }
} ,

'BurkinaFaso': {
  selectors: {
  editIcon: 'a.editModalAddress',
      modifyModalForm: '[id^="editaddress"]',
      phoneInput: '#phone2',
      addressInput: '#address2',
      registerButton: '[id^="editaddress"] button[type="submit"]',
    address: '#address',
    phone: '#phone1',
    registerButton: '#addaddressAllCountry',
     addressRow: 'table tbody tr:first-child',
  },
  validData: {
    
    address: 'Secteur 8 Ouagadougou modified',
    phone: '70123459'
  }
  ,
  shortPhone: {
   
    address: '',
    phone: '7012'
  },
  longPhone: {
   
    address: '',
    phone: '701278901234567890'
  }
},


'Kuwait': {
  selectors: {
   addressRow: 'table tbody tr:first-child',
      editIcon: 'a.editModalAddress',
      modifyModalForm: '[id^="editaddress"]',
      phoneInput: '#phone2',
      addressInput: '#address2',
      registerButton: '[id^="editaddress"] button[type="submit"]',
    address:'#address2',
    houseNumber: '#house_number2',
    phone:'#phone2',
  
  },
  validData: {
    
    address: 'Ahmad Al Jaber Street modified ',
    houseNumber: 'Building 14',
    phone: '50012349'
  },
  shortPhone: {
 
    address: '',
    
    phone: '50'
  },
  longPhone: {
    address: '',
    
    phone: '12345678901234567890',
  }
},


'Iraq': {
  selectors: {
    addressRow: 'table tbody tr:first-child',
      editIcon: 'a.editModalAddress',
      modifyModalForm: '[id^="editaddress"]',
      addressInput: '#address2',             
    phoneInput: '#phone2',              
    registerButton: 'button:has-text("Register")',
  registerButton: '[id^="editaddress"] button[type="submit"]',
  },
  validData: {
    
    address: 'Baghdad Street 5 modified',
    phone: '07912345679'
  },
  shortPhone: {

    address: '',
    phone: '079'
  },
  longPhone: {
    
    address: '',
    phone: '07915678901234567890'
  }
},


'Kingdom of Saudi Arabia': {
  selectors: {
    editIcon: 'a.editModalAddress',
      modifyModalForm: '[id^="editaddress"]',
      phoneInput: '#phone2',
      addressInput: '#address2',
      registerButton: '[id^="editaddress"] button[type="submit"]',
 
    registerButton: '#addaddressAllCountry'
  },
  validData: {
   
    address: 'Villa 12 Riyadh modified',
    phone: '0512345679'
  },
  shortPhone: {
    
    address: '',
    phone: '051'
  },
  longPhone: {
   
    address: '',
    phone: '051678901234567890'
  }
},
'The Sultanate of Oman': {
  selectors: {
    editIcon: 'a.editModalAddress',
      modifyModalForm: '[id^="editaddress"]',
      phoneInput: '#phone2',
      addressInput: '#address2',
      registerButton: '[id^="editaddress"] button[type="submit"]',
    registerButton: '#addaddressAllCountry'
  },
  validData: {
    
    address: 'Sultan Qaboos University  Apt 3 modified',
    phone: '92123456'
  } ,

   shortPhone: {
    
    address: '',
    phone: '92'
  },
  longPhone: {
    
    address: '',
    phone: '92345678901234567890'
  }
},

'United Arab Emirates': {
  selectors: {
     editIcon: 'a.editModalAddress',
      modifyModalForm: '[id^="editaddress"]',
      phoneInput: '#phone2',
      addressInput: '#house_number2',
      registerButton: '[id^="editaddress"] button[type="submit"]',

  
    
    registerButton: '#addaddressAllCountry'
  },
  validData: {
    address: 'Villa 22 modified',
   
    phone: '0501234569'

  },
   shortPhone: {
 
     address: '',
   
    phone: '051'
  },
  longPhone: {
   
     address: '',
    
    phone: '050145678901234567890'
  }
}


};
