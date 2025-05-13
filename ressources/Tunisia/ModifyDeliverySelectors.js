module.exports = {
  editIcon: 'a.editModalAddress',                      //  icon to edit
  modifyModalForm: '[id^="editaddress"]' ,// matche: editaddressTunisie, editaddressAlgerie, etc.
  // ID of the modify modal form
    phoneInput: '#phone2',                             // Phone input inside the modify modal
    addressInput: '#address2',                         // Address input inside the modify modal
    registerButton: '[id^="editaddress"] button[type="submit"]',

 
    successMessage: 'text="Operation performed successfully"',   // Success modal text
    phoneTooShortError: 'text="Too short"',             // Phone "Too short" error
    phoneTooLongError: 'text="Too long"',               // Phone "Too long" error
    phoneRequiredError: 'text="Please enter your phone number!"', // Phone missing
    addressRequiredError: 'text="Please enter your address!"',    // Address missing


    countryDropdown: '.select-2-custom-int .select2-container',
  countryDropdownList: 'ul#select2-order_country-results',
  countryOption: (country) => `ul#select2-order_country-results >> text="${country.trim()}"`,
  addressRow: 'table tbody tr:first-child',



  };
