const config = require('../../config');
const providers = config.providers;
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const moment = require('moment');

module.exports = function (sequelize, DataTypes) {
  const product = sequelize.define(
    'product',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },

      productCode: {
        type: DataTypes.INTEGER,
      },

      description: {
        type: DataTypes.TEXT,
      },

      inDate: {
        type: DataTypes.DATEONLY,

        get: function () {
          return this.getDataValue('inDate')
            ? moment.utc(this.getDataValue('inDate')).format('YYYY-MM-DD')
            : null;
        },
      },

      quantityOnHand: {
        type: DataTypes.INTEGER,
      },

      minQuantityOnHand: {
        type: DataTypes.INTEGER,
      },

      price: {
        type: DataTypes.DECIMAL,
      },

      dicountRate: {
        type: DataTypes.DECIMAL,
      },

      supplierCode: {
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

  product.associate = (db) => {
    db.product.belongsTo(db.users, {
      as: 'createdBy',
    });

    db.product.belongsTo(db.users, {
      as: 'updatedBy',
    });
  };

  return product;
};
