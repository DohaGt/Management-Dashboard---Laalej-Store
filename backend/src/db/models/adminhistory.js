const config = require('../../config');
const providers = config.providers;
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const moment = require('moment');

module.exports = function(sequelize, DataTypes) {
  const adminhistory = sequelize.define(
    'adminhistory',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },

startDate: {
        type: DataTypes.DATEONLY,

        get: function() {
          return this.getDataValue('startDate')
            ? moment
                .utc(this.getDataValue('startDate'))
                .format('YYYY-MM-DD')
            : null;
        },

      },

endDate: {
        type: DataTypes.DATEONLY,

        get: function() {
          return this.getDataValue('endDate')
            ? moment
                .utc(this.getDataValue('endDate'))
                .format('YYYY-MM-DD')
            : null;
        },

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

  adminhistory.associate = (db) => {

    db.adminhistory.belongsTo(db.users, {
      as: 'createdBy',
    });

    db.adminhistory.belongsTo(db.users, {
      as: 'updatedBy',
    });
  };

  return adminhistory;
};

