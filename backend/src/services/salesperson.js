const db = require('../db/models');
const SalespersonDBApi = require('../db/api/salesperson');

module.exports = class SalespersonService {
  static async create(data, currentUser) {
    const transaction = await db.sequelize.transaction();
    try {
      await SalespersonDBApi.create(data, {
        currentUser,
        transaction,
      });

      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }
  static async update(data, id, currentUser) {
    const transaction = await db.sequelize.transaction();
    try {
      let salesperson = await SalespersonDBApi.findBy({ id }, { transaction });

      if (!salesperson) {
        throw new ValidationError('salespersonNotFound');
      }

      await SalespersonDBApi.update(id, data, {
        currentUser,
        transaction,
      });

      await transaction.commit();
      return salesperson;
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }

  static async remove(id, currentUser) {
    const transaction = await db.sequelize.transaction();

    try {
      if (currentUser.role !== 'admin') {
        throw new ValidationError('errors.forbidden.message');
      }

      await SalespersonDBApi.remove(id, {
        currentUser,
        transaction,
      });

      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }
};
