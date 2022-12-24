module.exports = {
  /**
   * @param {QueryInterface} queryInterface
   * @param {Sequelize} Sequelize
   * @returns {Promise<void>}
   */
  async up(queryInterface, Sequelize) {
    /**
     * @type {Transaction}
     */
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.createTable(
        'users',
        {
          id: {
            type: Sequelize.DataTypes.UUID,
            defaultValue: Sequelize.DataTypes.UUIDV4,
            primaryKey: true,
          },
          createdById: {
            type: Sequelize.DataTypes.UUID,
            references: {
              key: 'id',
              model: 'users',
            },
          },
          updatedById: {
            type: Sequelize.DataTypes.UUID,
            references: {
              key: 'id',
              model: 'users',
            },
          },
          createdAt: { type: Sequelize.DataTypes.DATE },
          updatedAt: { type: Sequelize.DataTypes.DATE },
          deletedAt: { type: Sequelize.DataTypes.DATE },
          importHash: {
            type: Sequelize.DataTypes.STRING(255),
            allowNull: true,
            unique: true,
          },
        },
        { transaction },
      );

      await queryInterface.createTable(
        'adminhistory',
        {
          id: {
            type: Sequelize.DataTypes.UUID,
            defaultValue: Sequelize.DataTypes.UUIDV4,
            primaryKey: true,
          },
          createdById: {
            type: Sequelize.DataTypes.UUID,
            references: {
              key: 'id',
              model: 'users',
            },
          },
          updatedById: {
            type: Sequelize.DataTypes.UUID,
            references: {
              key: 'id',
              model: 'users',
            },
          },
          createdAt: { type: Sequelize.DataTypes.DATE },
          updatedAt: { type: Sequelize.DataTypes.DATE },
          deletedAt: { type: Sequelize.DataTypes.DATE },
          importHash: {
            type: Sequelize.DataTypes.STRING(255),
            allowNull: true,
            unique: true,
          },
        },
        { transaction },
      );

      await queryInterface.createTable(
        'administrator',
        {
          id: {
            type: Sequelize.DataTypes.UUID,
            defaultValue: Sequelize.DataTypes.UUIDV4,
            primaryKey: true,
          },
          createdById: {
            type: Sequelize.DataTypes.UUID,
            references: {
              key: 'id',
              model: 'users',
            },
          },
          updatedById: {
            type: Sequelize.DataTypes.UUID,
            references: {
              key: 'id',
              model: 'users',
            },
          },
          createdAt: { type: Sequelize.DataTypes.DATE },
          updatedAt: { type: Sequelize.DataTypes.DATE },
          deletedAt: { type: Sequelize.DataTypes.DATE },
          importHash: {
            type: Sequelize.DataTypes.STRING(255),
            allowNull: true,
            unique: true,
          },
        },
        { transaction },
      );

      await queryInterface.createTable(
        'cashier',
        {
          id: {
            type: Sequelize.DataTypes.UUID,
            defaultValue: Sequelize.DataTypes.UUIDV4,
            primaryKey: true,
          },
          createdById: {
            type: Sequelize.DataTypes.UUID,
            references: {
              key: 'id',
              model: 'users',
            },
          },
          updatedById: {
            type: Sequelize.DataTypes.UUID,
            references: {
              key: 'id',
              model: 'users',
            },
          },
          createdAt: { type: Sequelize.DataTypes.DATE },
          updatedAt: { type: Sequelize.DataTypes.DATE },
          deletedAt: { type: Sequelize.DataTypes.DATE },
          importHash: {
            type: Sequelize.DataTypes.STRING(255),
            allowNull: true,
            unique: true,
          },
        },
        { transaction },
      );

      await queryInterface.createTable(
        'client',
        {
          id: {
            type: Sequelize.DataTypes.UUID,
            defaultValue: Sequelize.DataTypes.UUIDV4,
            primaryKey: true,
          },
          createdById: {
            type: Sequelize.DataTypes.UUID,
            references: {
              key: 'id',
              model: 'users',
            },
          },
          updatedById: {
            type: Sequelize.DataTypes.UUID,
            references: {
              key: 'id',
              model: 'users',
            },
          },
          createdAt: { type: Sequelize.DataTypes.DATE },
          updatedAt: { type: Sequelize.DataTypes.DATE },
          deletedAt: { type: Sequelize.DataTypes.DATE },
          importHash: {
            type: Sequelize.DataTypes.STRING(255),
            allowNull: true,
            unique: true,
          },
        },
        { transaction },
      );

      await queryInterface.createTable(
        'employee',
        {
          id: {
            type: Sequelize.DataTypes.UUID,
            defaultValue: Sequelize.DataTypes.UUIDV4,
            primaryKey: true,
          },
          createdById: {
            type: Sequelize.DataTypes.UUID,
            references: {
              key: 'id',
              model: 'users',
            },
          },
          updatedById: {
            type: Sequelize.DataTypes.UUID,
            references: {
              key: 'id',
              model: 'users',
            },
          },
          createdAt: { type: Sequelize.DataTypes.DATE },
          updatedAt: { type: Sequelize.DataTypes.DATE },
          deletedAt: { type: Sequelize.DataTypes.DATE },
          importHash: {
            type: Sequelize.DataTypes.STRING(255),
            allowNull: true,
            unique: true,
          },
        },
        { transaction },
      );

      await queryInterface.createTable(
        'invoice',
        {
          id: {
            type: Sequelize.DataTypes.UUID,
            defaultValue: Sequelize.DataTypes.UUIDV4,
            primaryKey: true,
          },
          createdById: {
            type: Sequelize.DataTypes.UUID,
            references: {
              key: 'id',
              model: 'users',
            },
          },
          updatedById: {
            type: Sequelize.DataTypes.UUID,
            references: {
              key: 'id',
              model: 'users',
            },
          },
          createdAt: { type: Sequelize.DataTypes.DATE },
          updatedAt: { type: Sequelize.DataTypes.DATE },
          deletedAt: { type: Sequelize.DataTypes.DATE },
          importHash: {
            type: Sequelize.DataTypes.STRING(255),
            allowNull: true,
            unique: true,
          },
        },
        { transaction },
      );

      await queryInterface.createTable(
        'line',
        {
          id: {
            type: Sequelize.DataTypes.UUID,
            defaultValue: Sequelize.DataTypes.UUIDV4,
            primaryKey: true,
          },
          createdById: {
            type: Sequelize.DataTypes.UUID,
            references: {
              key: 'id',
              model: 'users',
            },
          },
          updatedById: {
            type: Sequelize.DataTypes.UUID,
            references: {
              key: 'id',
              model: 'users',
            },
          },
          createdAt: { type: Sequelize.DataTypes.DATE },
          updatedAt: { type: Sequelize.DataTypes.DATE },
          deletedAt: { type: Sequelize.DataTypes.DATE },
          importHash: {
            type: Sequelize.DataTypes.STRING(255),
            allowNull: true,
            unique: true,
          },
        },
        { transaction },
      );

      await queryInterface.createTable(
        'product',
        {
          id: {
            type: Sequelize.DataTypes.UUID,
            defaultValue: Sequelize.DataTypes.UUIDV4,
            primaryKey: true,
          },
          createdById: {
            type: Sequelize.DataTypes.UUID,
            references: {
              key: 'id',
              model: 'users',
            },
          },
          updatedById: {
            type: Sequelize.DataTypes.UUID,
            references: {
              key: 'id',
              model: 'users',
            },
          },
          createdAt: { type: Sequelize.DataTypes.DATE },
          updatedAt: { type: Sequelize.DataTypes.DATE },
          deletedAt: { type: Sequelize.DataTypes.DATE },
          importHash: {
            type: Sequelize.DataTypes.STRING(255),
            allowNull: true,
            unique: true,
          },
        },
        { transaction },
      );

      await queryInterface.createTable(
        'salesperson',
        {
          id: {
            type: Sequelize.DataTypes.UUID,
            defaultValue: Sequelize.DataTypes.UUIDV4,
            primaryKey: true,
          },
          createdById: {
            type: Sequelize.DataTypes.UUID,
            references: {
              key: 'id',
              model: 'users',
            },
          },
          updatedById: {
            type: Sequelize.DataTypes.UUID,
            references: {
              key: 'id',
              model: 'users',
            },
          },
          createdAt: { type: Sequelize.DataTypes.DATE },
          updatedAt: { type: Sequelize.DataTypes.DATE },
          deletedAt: { type: Sequelize.DataTypes.DATE },
          importHash: {
            type: Sequelize.DataTypes.STRING(255),
            allowNull: true,
            unique: true,
          },
        },
        { transaction },
      );

      await queryInterface.createTable(
        'supplier',
        {
          id: {
            type: Sequelize.DataTypes.UUID,
            defaultValue: Sequelize.DataTypes.UUIDV4,
            primaryKey: true,
          },
          createdById: {
            type: Sequelize.DataTypes.UUID,
            references: {
              key: 'id',
              model: 'users',
            },
          },
          updatedById: {
            type: Sequelize.DataTypes.UUID,
            references: {
              key: 'id',
              model: 'users',
            },
          },
          createdAt: { type: Sequelize.DataTypes.DATE },
          updatedAt: { type: Sequelize.DataTypes.DATE },
          deletedAt: { type: Sequelize.DataTypes.DATE },
          importHash: {
            type: Sequelize.DataTypes.STRING(255),
            allowNull: true,
            unique: true,
          },
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'users',
        'firstName',
        {
          type: Sequelize.DataTypes.TEXT,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'users',
        'lastName',
        {
          type: Sequelize.DataTypes.TEXT,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'users',
        'phoneNumber',
        {
          type: Sequelize.DataTypes.TEXT,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'users',
        'email',
        {
          type: Sequelize.DataTypes.TEXT,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'users',
        'password',
        {
          type: Sequelize.DataTypes.TEXT,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'users',
        'emailVerified',
        {
          type: Sequelize.DataTypes.BOOLEAN,

          defaultValue: false,
          allowNull: false,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'users',
        'emailVerificationToken',
        {
          type: Sequelize.DataTypes.TEXT,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'users',
        'emailVerificationTokenExpiresAt',
        {
          type: Sequelize.DataTypes.DATE,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'users',
        'passwordResetToken',
        {
          type: Sequelize.DataTypes.TEXT,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'users',
        'passwordResetTokenExpiresAt',
        {
          type: Sequelize.DataTypes.DATE,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'users',
        'provider',
        {
          type: Sequelize.DataTypes.TEXT,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'line',
        'quantity',
        {
          type: Sequelize.DataTypes.INTEGER,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'users',
        'role',
        {
          type: Sequelize.DataTypes.ENUM,

          values: ['admin', 'user'],
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'users',
        'disabled',
        {
          type: Sequelize.DataTypes.BOOLEAN,

          defaultValue: false,
          allowNull: false,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'adminhistory',
        'startDate',
        {
          type: Sequelize.DataTypes.DATEONLY,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'adminhistory',
        'endDate',
        {
          type: Sequelize.DataTypes.DATEONLY,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'administrator',
        'password',
        {
          type: Sequelize.DataTypes.TEXT,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'cashier',
        'cashDeskNumber',
        {
          type: Sequelize.DataTypes.INTEGER,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'client',
        'clientCode',
        {
          type: Sequelize.DataTypes.INTEGER,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'client',
        'lastName',
        {
          type: Sequelize.DataTypes.TEXT,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'client',
        'firstName',
        {
          type: Sequelize.DataTypes.TEXT,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'client',
        'zipCode',
        {
          type: Sequelize.DataTypes.INTEGER,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'client',
        'phoneNumber',
        {
          type: Sequelize.DataTypes.TEXT,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'client',
        'email',
        {
          type: Sequelize.DataTypes.TEXT,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'client',
        'balance',
        {
          type: Sequelize.DataTypes.DECIMAL,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'employee',
        'employeeID',
        {
          type: Sequelize.DataTypes.INTEGER,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'employee',
        'lastName',
        {
          type: Sequelize.DataTypes.TEXT,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'employee',
        'firstName',
        {
          type: Sequelize.DataTypes.TEXT,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'employee',
        'zipCode',
        {
          type: Sequelize.DataTypes.INTEGER,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'employee',
        'phoneNumber',
        {
          type: Sequelize.DataTypes.TEXT,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'employee',
        'hireDate',
        {
          type: Sequelize.DataTypes.DATEONLY,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'employee',
        'salary',
        {
          type: Sequelize.DataTypes.DECIMAL,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'employee',
        'employeeType',
        {
          type: Sequelize.DataTypes.ENUM,

          values: ['Cashier', 'Administrator', 'Salesperson'],
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'invoice',
        'invoiceNumber',
        {
          type: Sequelize.DataTypes.INTEGER,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'invoice',
        'clientCode',
        {
          type: Sequelize.DataTypes.INTEGER,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'invoice',
        'invoiceDate',
        {
          type: Sequelize.DataTypes.DATE,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'line',
        'lineNumber',
        {
          type: Sequelize.DataTypes.INTEGER,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'line',
        'unitPrice',
        {
          type: Sequelize.DataTypes.DECIMAL,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'product',
        'productCode',
        {
          type: Sequelize.DataTypes.INTEGER,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'product',
        'description',
        {
          type: Sequelize.DataTypes.TEXT,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'product',
        'inDate',
        {
          type: Sequelize.DataTypes.DATEONLY,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'product',
        'quantityOnHand',
        {
          type: Sequelize.DataTypes.INTEGER,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'product',
        'minQuantityOnHand',
        {
          type: Sequelize.DataTypes.INTEGER,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'invoice',
        'employeeIDId',
        {
          type: Sequelize.DataTypes.UUID,

          references: {
            model: 'employee',
            key: 'id',
          },
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'adminhistory',
        'employeeIDId',
        {
          type: Sequelize.DataTypes.UUID,

          references: {
            model: 'administrator',
            key: 'id',
          },
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'client',
        'employeeIDId',
        {
          type: Sequelize.DataTypes.UUID,

          references: {
            model: 'employee',
            key: 'id',
          },
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'product',
        'price',
        {
          type: Sequelize.DataTypes.DECIMAL,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'product',
        'dicountRate',
        {
          type: Sequelize.DataTypes.DECIMAL,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'salesperson',
        'employeeIDId',
        {
          type: Sequelize.DataTypes.UUID,

          references: {
            model: 'employee',
            key: 'id',
          },
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'salesperson',
        'commission',
        {
          type: Sequelize.DataTypes.DECIMAL,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'supplier',
        'supplierCode',
        {
          type: Sequelize.DataTypes.INTEGER,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'supplier',
        'CompanyName',
        {
          type: Sequelize.DataTypes.TEXT,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'supplier',
        'contactFirstName',
        {
          type: Sequelize.DataTypes.TEXT,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'supplier',
        'contactLastName',
        {
          type: Sequelize.DataTypes.TEXT,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'supplier',
        'phone',
        {
          type: Sequelize.DataTypes.TEXT,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'supplier',
        'zipCode',
        {
          type: Sequelize.DataTypes.INTEGER,
        },
        { transaction },
      );

      await transaction.commit();
    } catch (err) {
      await transaction.rollback();
      throw err;
    }
  },
  /**
   * @param {QueryInterface} queryInterface
   * @param {Sequelize} Sequelize
   * @returns {Promise<void>}
   */
  async down(queryInterface, Sequelize) {
    /**
     * @type {Transaction}
     */
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.removeColumn('supplier', 'zipCode', { transaction });

      await queryInterface.removeColumn('supplier', 'phone', { transaction });

      await queryInterface.removeColumn('supplier', 'contactLastName', {
        transaction,
      });

      await queryInterface.removeColumn('supplier', 'contactFirstName', {
        transaction,
      });

      await queryInterface.removeColumn('supplier', 'CompanyName', {
        transaction,
      });

      await queryInterface.removeColumn('supplier', 'supplierCode', {
        transaction,
      });

      await queryInterface.removeColumn('salesperson', 'commission', {
        transaction,
      });

      await queryInterface.removeColumn('salesperson', 'employeeIDId', {
        transaction,
      });

      await queryInterface.removeColumn('product', 'dicountRate', {
        transaction,
      });

      await queryInterface.removeColumn('product', 'price', { transaction });

      await queryInterface.removeColumn('client', 'employeeIDId', {
        transaction,
      });

      await queryInterface.removeColumn('adminhistory', 'employeeIDId', {
        transaction,
      });

      await queryInterface.removeColumn('invoice', 'employeeIDId', {
        transaction,
      });

      await queryInterface.removeColumn('product', 'minQuantityOnHand', {
        transaction,
      });

      await queryInterface.removeColumn('product', 'quantityOnHand', {
        transaction,
      });

      await queryInterface.removeColumn('product', 'inDate', { transaction });

      await queryInterface.removeColumn('product', 'description', {
        transaction,
      });

      await queryInterface.removeColumn('product', 'productCode', {
        transaction,
      });

      await queryInterface.removeColumn('line', 'unitPrice', { transaction });

      await queryInterface.removeColumn('line', 'lineNumber', { transaction });

      await queryInterface.removeColumn('invoice', 'invoiceDate', {
        transaction,
      });

      await queryInterface.removeColumn('invoice', 'clientCode', {
        transaction,
      });

      await queryInterface.removeColumn('invoice', 'invoiceNumber', {
        transaction,
      });

      await queryInterface.removeColumn('employee', 'employeeType', {
        transaction,
      });

      await queryInterface.removeColumn('employee', 'salary', { transaction });

      await queryInterface.removeColumn('employee', 'hireDate', {
        transaction,
      });

      await queryInterface.removeColumn('employee', 'phoneNumber', {
        transaction,
      });

      await queryInterface.removeColumn('employee', 'zipCode', { transaction });

      await queryInterface.removeColumn('employee', 'firstName', {
        transaction,
      });

      await queryInterface.removeColumn('employee', 'lastName', {
        transaction,
      });

      await queryInterface.removeColumn('employee', 'employeeID', {
        transaction,
      });

      await queryInterface.removeColumn('client', 'balance', { transaction });

      await queryInterface.removeColumn('client', 'email', { transaction });

      await queryInterface.removeColumn('client', 'phoneNumber', {
        transaction,
      });

      await queryInterface.removeColumn('client', 'zipCode', { transaction });

      await queryInterface.removeColumn('client', 'firstName', { transaction });

      await queryInterface.removeColumn('client', 'lastName', { transaction });

      await queryInterface.removeColumn('client', 'clientCode', {
        transaction,
      });

      await queryInterface.removeColumn('cashier', 'cashDeskNumber', {
        transaction,
      });

      await queryInterface.removeColumn('administrator', 'password', {
        transaction,
      });

      await queryInterface.removeColumn('adminhistory', 'endDate', {
        transaction,
      });

      await queryInterface.removeColumn('adminhistory', 'startDate', {
        transaction,
      });

      await queryInterface.removeColumn('users', 'disabled', { transaction });

      await queryInterface.removeColumn('users', 'role', { transaction });

      await queryInterface.removeColumn('line', 'quantity', { transaction });

      await queryInterface.removeColumn('users', 'provider', { transaction });

      await queryInterface.removeColumn(
        'users',
        'passwordResetTokenExpiresAt',
        { transaction },
      );

      await queryInterface.removeColumn('users', 'passwordResetToken', {
        transaction,
      });

      await queryInterface.removeColumn(
        'users',
        'emailVerificationTokenExpiresAt',
        { transaction },
      );

      await queryInterface.removeColumn('users', 'emailVerificationToken', {
        transaction,
      });

      await queryInterface.removeColumn('users', 'emailVerified', {
        transaction,
      });

      await queryInterface.removeColumn('users', 'password', { transaction });

      await queryInterface.removeColumn('users', 'email', { transaction });

      await queryInterface.removeColumn('users', 'phoneNumber', {
        transaction,
      });

      await queryInterface.removeColumn('users', 'lastName', { transaction });

      await queryInterface.removeColumn('users', 'firstName', { transaction });

      await queryInterface.dropTable('supplier', { transaction });

      await queryInterface.dropTable('salesperson', { transaction });

      await queryInterface.dropTable('product', { transaction });

      await queryInterface.dropTable('line', { transaction });

      await queryInterface.dropTable('invoice', { transaction });

      await queryInterface.dropTable('employee', { transaction });

      await queryInterface.dropTable('client', { transaction });

      await queryInterface.dropTable('cashier', { transaction });

      await queryInterface.dropTable('administrator', { transaction });

      await queryInterface.dropTable('adminhistory', { transaction });

      await queryInterface.dropTable('users', { transaction });

      await transaction.commit();
    } catch (err) {
      await transaction.rollback();
      throw err;
    }
  },
};
