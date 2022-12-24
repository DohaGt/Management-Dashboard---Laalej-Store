const db = require('../db/models');
const InvoiceDBApi = require('../db/api/invoice');

module.exports = class InvoiceService {
  static async create(data, currentUser) {
    const transaction = await db.sequelize.transaction();
    try {
      await InvoiceDBApi.create(data, {
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
      let invoice = await InvoiceDBApi.findBy({ id }, { transaction });

      if (!invoice) {
        throw new ValidationError('invoiceNotFound');
      }

      await InvoiceDBApi.update(id, data, {
        currentUser,
        transaction,
      });

      await transaction.commit();
      return invoice;
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

      await InvoiceDBApi.remove(id, {
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
