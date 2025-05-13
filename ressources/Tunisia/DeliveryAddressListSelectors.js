module.exports = {
    // ID selector 
    popupCloseButton: 'button#closeButton',
  
    // Class selector 
    userIcon: 'a.profile-button',
  
    // Text-based selector 
    myAccountLink: 'text=My account',
  
    // Text-based selector 
    deliveryAddressTab: 'text=DELIVERY ADDRESS',
  
  
    deliverySectionContainer: '#page-length-option_wrapper',

    // 🧾 Delivery section/table using unique ID
    deliverySectionContainer: '#page-length-option',      

    // ✅ Use unique table ID
    addressTable: 'table#page-length-option',
    tableRow: 'table#page-length-option tbody tr',
    tableCell: (rowIndex, colIndex) =>
      `table#page-length-option tbody tr:nth-child(${rowIndex + 1}) td:nth-child(${colIndex + 1})`
  };