module.exports = {
    deleteIcon: 'a.deleteAddress', // icône de suppression (dans chaque ligne)
    confirmDeleteButton: 'button.swal-button--delete', // bouton "Yes, delete!" dans SweetAlert
    cancelDeleteButton: 'button.swal-button--cancel',  // bouton "Cancel" dans SweetAlert
    successMessage: 'text="Operation performed successfully"', // message de succès
    successOkButton: 'div.swal-footer button', // bouton "OK" après suppression réussie
    addressRow: 'table tbody tr:first-child' ,// première ligne du tableau

     // ➕ Nouveaux locators :
  defaultToggleInput: 'input.changeStatus:checked', // pour identifier une ligne par défaut
  countryDropdown: '.select-2-custom-int .select2-container',
  countryDropdownList: 'ul#select2-order_country-results', // garde inchangé

  countryOption: (country) => `ul#select2-order_country-results li:has-text("${country.trim()}")`,

 
  errorMessage: 'text="Vous ne pouvez pas supprimer une adresse principale !"'
  };
  