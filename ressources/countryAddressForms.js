module.exports = {

  'Tunisia': {
    selectors: {
      governorate: '#select2-gouvernorat_id-container',
      governorateOptions: '#select2-gouvernorat_id-results',
      city: '#select2-ville_id-container',
      cityOptions: '#select2-ville_id-results',
      locality: '#select2-locality_id-container',
      localityOptions: '#select2-locality_id-results',
      address: '#address',
      phone: '#phone1',
       registerButton: '#addaddressAllCountry',
    },
    validData: {
      governorateIndex: 0,
      cityIndex: 0,
      localityIndex: 0,
      address: ' esprit ',
      phone: '50123456'
    },
    shortPhone: {
      governorateIndex: 0,
      cityIndex: 0,
      localityIndex: 0,
      address: '',
      phone: '22'
    } ,
       longPhone: {
      governorateIndex: 0,
      cityIndex: 0,
      localityIndex: 0,
      address: '',
      phone: '12345678901234567890'
    },
  },


'Algeria': {
  selectors: {
    wilaya: '#select2-gouvernorat_id-container',
    wilayaOptions: '#select2-gouvernorat_id-results',
    commune: '#select2-locality_id-container',
    communeOptions: '#select2-locality_id-results',
    address: '#address',
    phone: '#phone1',
    registerButton: '#addaddressAllCountry'
  },
  validData: {
    wilayaIndex: 0,
    communeIndex: 0,
    address: 'Rue ALGERIA',
    phone: '0551234567'
  },
  shortPhone: {
    wilayaIndex: 0,
    communeIndex: 0,
    address: '',
    phone: '05'
  },
  longPhone: {
    wilayaIndex: 0,
    communeIndex: 0,
    address: '',
    phone: '05345678901234567890'
  }
},

'Libya': {
  selectors: {
    city: '#select2-locality_id-container',
    cityOptions: '#select2-locality_id-results',
    address: '#address',
    phone: '#phone1',
    registerButton: '#addaddressAllCountry'
  },
  validData: {
    cityIndex: 0, 
    address: 'Tripoli Street 12',
    phone: '0912345678'
  },
  shortPhone: {
    cityIndex: 0,
    address: '',
    phone: '091'
  },
  longPhone: {
    cityIndex: 0,
    address: '',
    phone: '09145678901234567890'
  }
} ,

'IvoryCoast': {
  selectors: {
    region: '#select2-gouvernorat_id-container',
    regionOptions: '#select2-gouvernorat_id-results',
    city: '#select2-locality_id-container',
    cityOptions: '#select2-locality_id-results',
    address: '#address',
    phone: '#phone1',
    registerButton: '#addaddressAllCountry'
  },
  validData: {
    regionIndex: 0,  // Abidjan-Lagunes
    cityIndex: 0,    // Abobo Akekoi
    address: 'Rue de Cocody',
    phone: '0123456789'
  },
  shortPhone: {
    regionIndex: 0,
    cityIndex: 0,
    address: '',
    phone: '01'
  },
  longPhone: {
    regionIndex: 0,
    cityIndex: 0,
    address: '',
    phone: '01345678901234567890'
  }
},

'BurkinaFaso': {
  selectors: {
    region: '#select2-gouvernorat_id-container',
    regionOptions: '#select2-gouvernorat_id-results',
    province: '#select2-ville_id-container',
    provinceOptions: '#select2-ville_id-results',
    department: '#select2-locality_id-container',
    departmentOptions: '#select2-locality_id-results',
    address: '#address',
    phone: '#phone1',
    registerButton: '#addaddressAllCountry'
  },
  validData: {
    regionIndex: 0,     // Boucle du Mouhoun
    provinceIndex: 0,   // Balé
    departmentIndex: 0, // Bagassi
    address: 'Secteur 8 Ouagadougou',
    phone: '70123456'
  },
  shortPhone: {
    regionIndex: 0,
    provinceIndex: 0,
    departmentIndex: 0,
    address: '',
    phone: '7012'
  },
  longPhone: {
    regionIndex: 0,
    provinceIndex: 0,
    departmentIndex: 0,
    address: '',
    phone: '701278901234567890'
  }
},

'Kuwait': {
  selectors: {
    governorate: '#select2-gouvernorat_id-container',
    governorateOptions: '#select2-gouvernorat_id-results',
    area: '#select2-ville_id-container',
    areaOptions: '#select2-ville_id-results',
    block: '#select2-locality_id-container',
    blockOptions: '#select2-locality_id-results',
    street: '#address',
    houseNumber: '#house_number',
    phone: '#phone1',
    registerButton: '#addaddressAllCountry'
  },
  validData: {
    governorateIndex: 0,
    areaIndex: 0,
    blockIndex: 0,
    street: 'Ahmad Al Jaber Street',
    houseNumber: 'Building 14',
    phone: '50012345'
  },
  shortPhone: {
    governorateIndex: 0,
    areaIndex: 0,
    blockIndex: 0,
    street: '',
    houseNumber: '',
    phone: '50'
  },
  longPhone: {
    governorateIndex: 0,
    areaIndex: 0,
    blockIndex: 0,
    street: '',
    houseNumber: '',
    phone: '12345678901234567890'
  }
},

'Iraq': {
  selectors: {
    city: '#select2-locality_id-container',
    cityOptions: '#select2-locality_id-results',
    address: '#address',
    phone: '#phone1',
    registerButton: '#addaddressAllCountry'
  },
  validData: {
    cityIndex: 0,
    address: 'Baghdad Street 5',
    phone: '07912345678'
  },
  shortPhone: {
    cityIndex: 0,
    address: '',
    phone: '079'
  },
  longPhone: {
    cityIndex: 0,
    address: '',
    phone: '07915678901234567890'
  }
},

'SaudiArabia': {
  selectors: {
    region: '#select2-gouvernorat_id-container',
    regionOptions: '#select2-gouvernorat_id-results',
    city: '#select2-locality_id-container',
    cityOptions: '#select2-locality_id-results',
    address: '#address', 
    phone: '#phone1',
    registerButton: '#addaddressAllCountry'
  },
  validData: {
    regionIndex: 0,
    cityIndex: 0,
    address: 'Villa 12 Riyadh',
    phone: '0512345678'
  },
  shortPhone: {
    regionIndex: 0,
    cityIndex: 0,
    address: '',
    phone: '051'
  },
  longPhone: {
    regionIndex: 0,
    cityIndex: 0,
    address: '',
    phone: '051678901234567890'
  }
},
'Oman': {
  selectors: {
    region: '#select2-gouvernorat_id-container',
    regionOptions: '#select2-gouvernorat_id-results',
    city: '#select2-locality_id-container',
    cityOptions: '#select2-locality_id-results',
    address: '#address',
    phone: '#phone1',
    registerButton: '#addaddressAllCountry'
  },
  validData: {
    regionIndex: 0,
    cityIndex: 0,
    address: 'Sultan Qaboos University  Apt 3',
    phone: '92123456'
  },
  shortPhone: {
    regionIndex: 0,
    cityIndex: 0,
    address: '',
    phone: '92'
  },
  longPhone: {
    regionIndex: 0,
    cityIndex: 0,
    address: '',
    phone: '92345678901234567890'
  }
},

'UAE': {
  selectors: {
    city: '#select2-gouvernorat_id-container',
    cityOptions: '#select2-gouvernorat_id-results',
    zone: '#select2-locality_id-container',
    zoneOptions: '#select2-locality_id-results',
    houseNumber: '#house_number',
    apartmentNumber: '#apartment_number',
    additionalDirections: '#additional_directions',
    phone: '#phone1',
    registerButton: '#addaddressAllCountry'
  },
  validData: {
    cityIndex: 0,
    zoneIndex: 0,
    houseNumber: 'Villa 22',
    apartmentNumber: 'Apt 302',
    additionalDirections: 'Near City Center',
    phone: '0501234567'
  },
  shortPhone: {
    cityIndex: 0,
    zoneIndex: 0,
    houseNumber: '',
    apartmentNumber: '',
    additionalDirections: '',
    phone: '051'
  },
  longPhone: {
    cityIndex: 0,
    zoneIndex: 0,
    houseNumber: '',
    apartmentNumber: '',
    additionalDirections: '',
    phone: '050145678901234567890'
  }
}



   
};
