const config = require('../../config');
const providers = config.providers;
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const moment = require('moment');

module.exports = function (sequelize, DataTypes) {
  const salesperson = sequelize.define(
    'salesperson',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },

      commission: {
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

  salesperson.associate = (db) => {
    db.salesperson.belongsTo(db.users, {
      as: 'createdBy',
    });

    db.salesperson.belongsTo(db.users, {
      as: 'updatedBy',
    });
  };

  return salesperson;
};
