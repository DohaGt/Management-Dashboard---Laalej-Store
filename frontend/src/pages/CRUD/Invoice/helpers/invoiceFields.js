
const invoiceFields = {
	id: { type: 'id', label: 'ID' },

    invoiceNumber: { type: 'int', label: 'Invoice Number',

    },

    clientCode: { type: 'int', label: 'Client Code',

    options: [

    { value: 'value', label: 'value' },

]

    },

    invoiceDate: { type: 'datetime', label: 'Invoice Date',

    options: [

    { value: 'value', label: 'value' },

]

    },

    employeeID: { type: 'relation_one', label: 'Employee ID',

    options: [

    { value: 'value', label: 'value' },

]

    },

}

export default invoiceFields;
