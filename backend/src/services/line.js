const db = require('../db/models');
const LineDBApi = require('../db/api/line');

module.exports = class LineService {
  static async create(data, currentUser) {
    const transaction = await db.sequelize.transaction();
    try {
      await LineDBApi.create(data, {
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
      let line = await LineDBApi.findBy({ id }, { transaction });

      if (!line) {
        throw new ValidationError('lineNotFound');
      }

      await LineDBApi.update(id, data, {
        currentUser,
        transaction,
      });

      await transaction.commit();
      return line;
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

      await LineDBApi.remove(id, {
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
