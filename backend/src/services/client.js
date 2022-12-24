const db = require('../db/models');
const ClientDBApi = require('../db/api/client');

module.exports = class ClientService {
  static async create(data, currentUser) {
    const transaction = await db.sequelize.transaction();
    try {
      await ClientDBApi.create(
        data,
        {
          currentUser,
          transaction,
        },
      );

      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  };
  static async update(data, id, currentUser) {
    const transaction = await db.sequelize.transaction();
    try {
      let client = await ClientDBApi.findBy(
        {id},
        {transaction},
      );

      if (!client) {
        throw new ValidationError(
          'clientNotFound',
        );
      }

      await ClientDBApi.update(
        id,
        data,
        {
          currentUser,
          transaction,
        },
      );

      await transaction.commit();
      return client;

    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  };

  static async remove(id, currentUser) {
    const transaction = await db.sequelize.transaction();

    try {
      if (currentUser.role !== 'admin') {
        throw new ValidationError(
          'errors.forbidden.message',
        );
      }

      await ClientDBApi.remove(
        id,
        {
          currentUser,
          transaction,
        },
      );

      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }
};

