const config = require('../../config');
const providers = config.providers;
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const moment = require('moment');

module.exports = function(sequelize, DataTypes) {
  const cashier = sequelize.define(
    'cashier',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },

cashDeskNumber: {
        type: DataTypes.INTEGER,

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

  cashier.associate = (db) => {

    db.cashier.belongsTo(db.employee, {
      as: 'employeeID',
      foreignKey: {
        name: 'employeeIDId',
      },
      constraints: false,
    });

    db.cashier.belongsTo(db.users, {
      as: 'createdBy',
    });

    db.cashier.belongsTo(db.users, {
      as: 'updatedBy',
    });
  };

  return cashier;
};

