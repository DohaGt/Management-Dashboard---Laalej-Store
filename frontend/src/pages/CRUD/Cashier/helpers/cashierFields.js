
const cashierFields = {
	id: { type: 'id', label: 'ID' },

    employeeID: { type: 'relation_one', label: 'Employee ID',

    options: [

    { value: 'value', label: 'value' },

]

    },

    cashDeskNumber: { type: 'int', label: 'Cash Desk Number',

    options: [

    { value: 'value', label: 'value' },

]

    },

}

export default cashierFields;
