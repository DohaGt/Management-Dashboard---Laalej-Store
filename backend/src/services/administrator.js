const db = require('../db/models');
const AdministratorDBApi = require('../db/api/administrator');

module.exports = class AdministratorService {
  static async create(data, currentUser) {
    const transaction = await db.sequelize.transaction();
    try {
      await AdministratorDBApi.create(
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
      let administrator = await AdministratorDBApi.findBy(
        {id},
        {transaction},
      );

      if (!administrator) {
        throw new ValidationError(
          'administratorNotFound',
        );
      }

      await AdministratorDBApi.update(
        id,
        data,
        {
          currentUser,
          transaction,
        },
      );

      await transaction.commit();
      return administrator;

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

      await AdministratorDBApi.remove(
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

