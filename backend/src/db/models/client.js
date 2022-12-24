const config = require('../../config');
const providers = config.providers;
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const moment = require('moment');

module.exports = function(sequelize, DataTypes) {
  const client = sequelize.define(
    'client',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },

clientCode: {
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

email: {
        type: DataTypes.TEXT,

      },

balance: {
        type: DataTypes.DECIMAL,

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

  client.associate = (db) => {

    db.client.belongsTo(db.users, {
      as: 'createdBy',
    });

    db.client.belongsTo(db.users, {
      as: 'updatedBy',
    });
  };

  return client;
};

