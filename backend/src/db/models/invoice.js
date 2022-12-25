const config = require('../../config');
const providers = config.providers;
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const moment = require('moment');

module.exports = function(sequelize, DataTypes) {
  const invoice = sequelize.define(
    'invoice',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },

invoiceNumber: {
        type: DataTypes.INTEGER,

      },

clientCode: {
        type: DataTypes.INTEGER,

      },

invoiceDate: {
        type: DataTypes.DATE,

      },

employeeID: {
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

  invoice.associate = (db) => {

    db.invoice.belongsTo(db.users, {
      as: 'createdBy',
    });

    db.invoice.belongsTo(db.users, {
      as: 'updatedBy',
    });
  };

  return invoice;
};

