const db = require('../db/models');
const AdminhistoryDBApi = require('../db/api/adminhistory');

module.exports = class AdminhistoryService {
  static async create(data, currentUser) {
    const transaction = await db.sequelize.transaction();
    try {
      await AdminhistoryDBApi.create(data, {
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
      let adminhistory = await AdminhistoryDBApi.findBy(
        { id },
        { transaction },
      );

      if (!adminhistory) {
        throw new ValidationError('adminhistoryNotFound');
      }

      await AdminhistoryDBApi.update(id, data, {
        currentUser,
        transaction,
      });

      await transaction.commit();
      return adminhistory;
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

      await AdminhistoryDBApi.remove(id, {
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
