
const salespersonFields = {
	id: { type: 'id', label: 'ID' },

    employeeID: { type: 'relation_one', label: 'Employee ID',

    options: [

    { value: 'value', label: 'value' },

]

    },

    commission: { type: 'decimal', label: 'Commission',

    options: [

    { value: 'value', label: 'value' },

]

    },

}

export default salespersonFields;
