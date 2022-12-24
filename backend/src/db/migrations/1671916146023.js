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

                    await queryInterface.removeColumn(
                        'adminhistory',
                        'startDate',
                        { transaction }
                    );

                    await queryInterface.removeColumn(
                        'adminhistory',
                        'endDate',
                        { transaction }
                    );

                    await queryInterface.addColumn(
                      'adminhistory',
                      'startDate',
                      {
                          type: Sequelize.DataTypes.DATEONLY,

                      },
                      { transaction }
                    );

                    await queryInterface.addColumn(
                      'adminhistory',
                      'endDate',
                      {
                          type: Sequelize.DataTypes.DATEONLY,

                      },
                      { transaction }
                    );

                    await queryInterface.removeColumn(
                        'administrator',
                        'password',
                        { transaction }
                    );

                    await queryInterface.addColumn(
                      'administrator',
                      'password',
                      {
                          type: Sequelize.DataTypes.TEXT,

                      },
                      { transaction }
                    );

                    await queryInterface.removeColumn(
                        'cashier',
                        'cashDeskNumber',
                        { transaction }
                    );

                    await queryInterface.addColumn(
                      'cashier',
                      'cashDeskNumber',
                      {
                          type: Sequelize.DataTypes.INTEGER,

                      },
                      { transaction }
                    );

                    await queryInterface.removeColumn(
                        'line',
                        'quantity',
                        { transaction }
                    );

                    await queryInterface.removeColumn(
                        'line',
                        'unitPrice',
                        { transaction }
                    );

                    await queryInterface.addColumn(
                      'line',
                      'quantity',
                      {
                          type: Sequelize.DataTypes.INTEGER,

                      },
                      { transaction }
                    );

                    await queryInterface.addColumn(
                      'line',
                      'unitPrice',
                      {
                          type: Sequelize.DataTypes.DECIMAL,

                      },
                      { transaction }
                    );

                    await queryInterface.removeColumn(
                        'salesperson',
                        'commission',
                        { transaction }
                    );

                    await queryInterface.addColumn(
                      'salesperson',
                      'commission',
                      {
                          type: Sequelize.DataTypes.DECIMAL,

                      },
                      { transaction }
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

                    await queryInterface.removeColumn(
                        'salesperson',
                        'commission',
                        { transaction }
                    );

                    await queryInterface.addColumn(
                      'salesperson',
                      'commission',
                      {
                          type: Sequelize.DataTypes.DECIMAL,

                      },
                      { transaction }
                    );

                    await queryInterface.removeColumn(
                        'line',
                        'unitPrice',
                        { transaction }
                    );

                    await queryInterface.removeColumn(
                        'line',
                        'quantity',
                        { transaction }
                    );

                    await queryInterface.addColumn(
                      'line',
                      'unitPrice',
                      {
                          type: Sequelize.DataTypes.DECIMAL,

                      },
                      { transaction }
                    );

                    await queryInterface.addColumn(
                      'line',
                      'quantity',
                      {
                          type: Sequelize.DataTypes.INTEGER,

                      },
                      { transaction }
                    );

                    await queryInterface.removeColumn(
                        'cashier',
                        'cashDeskNumber',
                        { transaction }
                    );

                    await queryInterface.addColumn(
                      'cashier',
                      'cashDeskNumber',
                      {
                          type: Sequelize.DataTypes.INTEGER,

                      },
                      { transaction }
                    );

                    await queryInterface.removeColumn(
                        'administrator',
                        'password',
                        { transaction }
                    );

                    await queryInterface.addColumn(
                      'administrator',
                      'password',
                      {
                          type: Sequelize.DataTypes.TEXT,

                      },
                      { transaction }
                    );

                    await queryInterface.removeColumn(
                        'adminhistory',
                        'endDate',
                        { transaction }
                    );

                    await queryInterface.removeColumn(
                        'adminhistory',
                        'startDate',
                        { transaction }
                    );

                    await queryInterface.addColumn(
                      'adminhistory',
                      'endDate',
                      {
                          type: Sequelize.DataTypes.DATEONLY,

                      },
                      { transaction }
                    );

                    await queryInterface.addColumn(
                      'adminhistory',
                      'startDate',
                      {
                          type: Sequelize.DataTypes.DATEONLY,

                      },
                      { transaction }
                    );

            await transaction.commit();
        } catch (err) {
            await transaction.rollback();
            throw err;
        }
    }
};
