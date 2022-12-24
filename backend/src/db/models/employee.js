const config = require('../../config');
const providers = config.providers;
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const moment = require('moment');

module.exports = function (sequelize, DataTypes) {
  const employee = sequelize.define(
    'employee',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },

      employeeID: {
        type: DataTypes.INTEGER,
      },

      lastName: {
        type: DataTypes.TEXT,
      },

      firstName: {
        type: DataTypes.TEXT,
      },

      zipCode: {
        type: DataTypes.INTEGER,
      },

      phoneNumber: {
        type: DataTypes.TEXT,
      },

      hireDate: {
        type: DataTypes.DATEONLY,

        get: function () {
          return this.getDataValue('hireDate')
            ? moment.utc(this.getDataValue('hireDate')).format('YYYY-MM-DD')
            : null;
        },
      },

      salary: {
        type: DataTypes.DECIMAL,
      },

      employeeType: {
        type: DataTypes.ENUM,

        values: ['Cashier', 'Administrator', 'Salesperson'],
      },

      importHash: {
        type: DataTypes.STRING(255),
        allowNull: true,
        unique: true,
      },
    },
    {
      timestamps: true,
      paranoid: true,
      freezeTableName: true,
    },
  );

  employee.associate = (db) => {
    db.employee.belongsTo(db.users, {
      as: 'createdBy',
    });

    db.employee.belongsTo(db.users, {
      as: 'updatedBy',
    });
  };

  return employee;
};
