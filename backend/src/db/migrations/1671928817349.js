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
                        'client',
                        'employeeID',
                        { transaction }
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
                      { transaction }
                    );

                    await queryInterface.removeColumn(
                        'administrator',
                        'employeeID',
                        { transaction }
                    );

                    await queryInterface.removeColumn(
                        'administrator',
                        'password',
                        { transaction }
                    );

                    await queryInterface.addColumn(
                      'administrator',
                      'employeeIDId',
                      {
                          type: Sequelize.DataTypes.UUID,

                            references: {
                                model: 'employee',
                                key: 'id',
                            },

                      },
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
                        'administrator',
                        'password',
                        { transaction }
                    );

                    await queryInterface.removeColumn(
                        'administrator',
                        'employeeIDId',
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

                    await queryInterface.addColumn(
                      'administrator',
                      'employeeID',
                      {
                          type: Sequelize.DataTypes.INTEGER,

                      },
                      { transaction }
                    );

                    await queryInterface.removeColumn(
                        'client',
                        'employeeIDId',
                        { transaction }
                    );

                    await queryInterface.addColumn(
                      'client',
                      'employeeID',
                      {
                          type: Sequelize.DataTypes.INTEGER,

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
