
const lineFields = {
	id: { type: 'id', label: 'ID' },

    lineNumber: { type: 'int', label: 'Line Number',

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

    invoiceNumber: { type: 'relation_one', label: 'Invoice Number',

    options: [

    { value: 'value', label: 'value' },

]

    },

    productCode: { type: 'relation_one', label: 'Product Code',

    options: [

    { value: 'value', label: 'value' },

]

    },

}

export default lineFields;
