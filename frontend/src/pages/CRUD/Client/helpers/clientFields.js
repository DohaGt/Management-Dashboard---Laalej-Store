
const clientFields = {
	id: { type: 'id', label: 'ID' },

    clientCode: { type: 'int', label: 'Client Code',

    },

    lastName: { type: 'string', label: 'Last Name',

    options: [

    { value: 'value', label: 'value' },

]

    },

    firstName: { type: 'string', label: 'First Name',

    options: [

    { value: 'value', label: 'value' },

]

    },

    zipCode: { type: 'int', label: 'Zip Code',

    options: [

    { value: 'value', label: 'value' },

]

    },

    phoneNumber: { type: 'string', label: 'Phone Number',

    options: [

    { value: 'value', label: 'value' },

]

    },

    email: { type: 'string', label: 'Email',

    options: [

    { value: 'value', label: 'value' },

]

    },

    balance: { type: 'decimal', label: 'Balance',

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

export default clientFields;
