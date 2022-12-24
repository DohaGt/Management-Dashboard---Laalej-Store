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
      await queryInterface.removeColumn('adminhistory', 'employeeIDId', {
        transaction,
      });

      await queryInterface.addColumn(
        'adminhistory',
        'employeeID',
        {
          type: Sequelize.DataTypes.INTEGER,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'administrator',
        'employeeID',
        {
          type: Sequelize.DataTypes.INTEGER,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'cashier',
        'employeeID',
        {
          type: Sequelize.DataTypes.INTEGER,
        },
        { transaction },
      );

      await queryInterface.removeColumn('client', 'employeeIDId', {
        transaction,
      });

      await queryInterface.addColumn(
        'client',
        'employeeID',
        {
          type: Sequelize.DataTypes.INTEGER,
        },
        { transaction },
      );

      await queryInterface.removeColumn('invoice', 'employeeIDId', {
        transaction,
      });

      await queryInterface.addColumn(
        'invoice',
        'employeeID',
        {
          type: Sequelize.DataTypes.INTEGER,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'line',
        'invoiceNumber',
        {
          type: Sequelize.DataTypes.INTEGER,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'line',
        'clientCode',
        {
          type: Sequelize.DataTypes.INTEGER,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'product',
        'supplierCode',
        {
          type: Sequelize.DataTypes.INTEGER,
        },
        { transaction },
      );

      await queryInterface.removeColumn('salesperson', 'employeeIDId', {
        transaction,
      });

      await queryInterface.addColumn(
        'salesperson',
        'employeeID',
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
      await queryInterface.removeColumn('salesperson', 'employeeID', {
        transaction,
      });

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

      await queryInterface.removeColumn('product', 'supplierCode', {
        transaction,
      });

      await queryInterface.removeColumn('line', 'clientCode', { transaction });

      await queryInterface.removeColumn('line', 'invoiceNumber', {
        transaction,
      });

      await queryInterface.removeColumn('invoice', 'employeeID', {
        transaction,
      });

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

      await queryInterface.removeColumn('client', 'employeeID', {
        transaction,
      });

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

      await queryInterface.removeColumn('cashier', 'employeeID', {
        transaction,
      });

      await queryInterface.removeColumn('administrator', 'employeeID', {
        transaction,
      });

      await queryInterface.removeColumn('adminhistory', 'employeeID', {
        transaction,
      });

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

      await transaction.commit();
    } catch (err) {
      await transaction.rollback();
      throw err;
    }
  },
};
