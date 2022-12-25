
const lineFields = {
	id: { type: 'id', label: 'ID' },

    lineNumber: { type: 'int', label: 'Line Number',

    },

    invoiceNumber: { type: 'int', label: 'Invoice Number',

    options: [

    { value: 'value', label: 'value' },

]

    },

    clientCode: { type: 'int', label: 'Client Code',

    options: [

    { value: 'value', label: 'value' },

]

    },

    quantity: { type: 'int', label: 'Quantity',

    options: [

    { value: 'value', label: 'value' },

]

    },

    unitPrice: { type: 'decimal', label: 'Unit Price',

    options: [

    { value: 'value', label: 'value' },

]

    },

}

export default lineFields;
