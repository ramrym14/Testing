module.exports = {
  addButton: 'a.orderAddress:has-text("ADD")',

  countryDropdown: '.select-2-custom-int .select2-container',
  countryDropdownList: 'ul#select2-order_country-results',
  countryOption: (country) => `ul#select2-order_country-results >> text="${country.trim()}"`,

  modalForm: '#addaddress',  // modal form id
  governorateDropdown: '#select2-gouvernorat_id-container',
  governorateOptionList: '#select2-gouvernorat_id-results',
  cityDropdown: '#select2-ville_id-container',
  cityOptionList: '#select2-ville_id-results',
  localityDropdown: '#select2-locality_id-container',
  localityOptionList: '#select2-locality_id-results',
  addressInput: '#address',
  phoneInput: '#phone1',
  registerButton: '#addaddressAllCountry',

};
