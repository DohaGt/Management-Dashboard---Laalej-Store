const lineFields = {
  id: { type: 'id', label: 'ID' },

  quantity: { type: 'int', label: 'quantity' },

  lineNumber: { type: 'int', label: 'Line Number' },

  unitPrice: { type: 'decimal', label: 'Unit Price' },

  invoiceNumber: {
    type: 'int',
    label: 'Invoice Number',

    options: [{ value: 'value', label: 'value' }],
  },

  clientCode: {
    type: 'int',
    label: 'Client Code',

    options: [{ value: 'value', label: 'value' }],
  },
};

export default lineFields;
