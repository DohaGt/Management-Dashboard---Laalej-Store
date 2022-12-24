const db = require('../db/models');
const CashierDBApi = require('../db/api/cashier');

module.exports = class CashierService {
  static async create(data, currentUser) {
    const transaction = await db.sequelize.transaction();
    try {
      await CashierDBApi.create(data, {
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
      let cashier = await CashierDBApi.findBy({ id }, { transaction });

      if (!cashier) {
        throw new ValidationError('cashierNotFound');
      }

      await CashierDBApi.update(id, data, {
        currentUser,
        transaction,
      });

      await transaction.commit();
      return cashier;
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

      await CashierDBApi.remove(id, {
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
