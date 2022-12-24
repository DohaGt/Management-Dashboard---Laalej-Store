
const productFields = {
	id: { type: 'id', label: 'ID' },

    productCode: { type: 'int', label: 'Product Code',

    },

    description: { type: 'string', label: 'Description',

    options: [

    { value: 'value', label: 'value' },

]

    },

    inDate: { type: 'date', label: 'In Date',

    options: [

    { value: 'value', label: 'value' },

]

    },

    quantityOnHand: { type: 'int', label: 'Quantity On Hand',

    options: [

    { value: 'value', label: 'value' },

]

    },

    minQuantityOnHand: { type: 'int', label: 'Min Quantity On Hand',

    options: [

    { value: 'value', label: 'value' },

]

    },

    price: { type: 'decimal', label: 'Price',

    options: [

    { value: 'value', label: 'value' },

]

    },

    dicountRate: { type: 'decimal', label: 'Dicount Rate',

    options: [

    { value: 'value', label: 'value' },

]

    },

    supplierCode: { type: 'int', label: 'Supplier Code',

    options: [

    { value: 'value', label: 'value' },

]

    },

}

export default productFields;
