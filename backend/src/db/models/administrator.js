const config = require('../../config');
const providers = config.providers;
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const moment = require('moment');

module.exports = function(sequelize, DataTypes) {
  const administrator = sequelize.define(
    'administrator',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },

employeeID: {
        type: DataTypes.INTEGER,

      },

password: {
        type: DataTypes.TEXT,

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

  administrator.associate = (db) => {

    db.administrator.belongsTo(db.users, {
      as: 'createdBy',
    });

    db.administrator.belongsTo(db.users, {
      as: 'updatedBy',
    });
  };

  return administrator;
};

