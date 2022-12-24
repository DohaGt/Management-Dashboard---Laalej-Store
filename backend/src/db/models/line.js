const config = require('../../config');
const providers = config.providers;
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const moment = require('moment');

module.exports = function(sequelize, DataTypes) {
  const line = sequelize.define(
    'line',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },

quantity: {
        type: DataTypes.INTEGER,

      },

lineNumber: {
        type: DataTypes.INTEGER,

      },

unitPrice: {
        type: DataTypes.DECIMAL,

      },

invoiceNumber: {
        type: DataTypes.INTEGER,

      },

clientCode: {
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

  line.associate = (db) => {

    db.line.belongsTo(db.users, {
      as: 'createdBy',
    });

    db.line.belongsTo(db.users, {
      as: 'updatedBy',
    });
  };

  return line;
};

