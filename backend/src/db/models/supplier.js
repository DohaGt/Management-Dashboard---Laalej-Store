const config = require('../../config');
const providers = config.providers;
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const moment = require('moment');

module.exports = function(sequelize, DataTypes) {
  const supplier = sequelize.define(
    'supplier',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },

supplierCode: {
        type: DataTypes.INTEGER,

      },

CompanyName: {
        type: DataTypes.TEXT,

      },

contactFirstName: {
        type: DataTypes.TEXT,

      },

contactLastName: {
        type: DataTypes.TEXT,

      },

phone: {
        type: DataTypes.TEXT,

      },

zipCode: {
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

  supplier.associate = (db) => {

    db.supplier.belongsTo(db.users, {
      as: 'createdBy',
    });

    db.supplier.belongsTo(db.users, {
      as: 'updatedBy',
    });
  };

  return supplier;
};

