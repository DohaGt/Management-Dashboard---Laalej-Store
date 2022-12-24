const cashierFields = {
  id: { type: 'id', label: 'ID' },

  cashDeskNumber: {
    type: 'int',
    label: 'Cash Desk Number',

    options: [{ value: 'value', label: 'value' }],
  },

  employeeID: {
    type: 'int',
    label: 'Employee ID',

    options: [{ value: 'value', label: 'value' }],
  },
};

export default cashierFields;
