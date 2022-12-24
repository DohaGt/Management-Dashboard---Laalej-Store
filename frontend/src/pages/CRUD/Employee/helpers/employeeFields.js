const employeeFields = {
  id: { type: 'id', label: 'ID' },

  employeeID: { type: 'int', label: 'Employee ID' },

  lastName: {
    type: 'string',
    label: 'Last Name',

    options: [{ value: 'value', label: 'value' }],
  },

  firstName: {
    type: 'string',
    label: 'First Name',

    options: [{ value: 'value', label: 'value' }],
  },

  zipCode: {
    type: 'int',
    label: 'Zip Code',

    options: [{ value: 'value', label: 'value' }],
  },

  phoneNumber: {
    type: 'string',
    label: 'Phone Number',

    options: [{ value: 'value', label: 'value' }],
  },

  hireDate: {
    type: 'date',
    label: 'Hire Date',

    options: [{ value: 'value', label: 'value' }],
  },

  salary: {
    type: 'decimal',
    label: 'Salary',

    options: [{ value: 'value', label: 'value' }],
  },

  employeeType: {
    type: 'enum',
    label: 'Employee Type',

    options: [
      { value: 'Cashier', label: 'Cashier' },

      { value: 'Administrator', label: 'Administrator' },

      { value: 'Salesperson', label: 'Salesperson' },
    ],
  },
};

export default employeeFields;
