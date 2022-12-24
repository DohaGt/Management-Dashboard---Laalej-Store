const db = require('../db/models');
const ProductDBApi = require('../db/api/product');

module.exports = class ProductService {
  static async create(data, currentUser) {
    const transaction = await db.sequelize.transaction();
    try {
      await ProductDBApi.create(data, {
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
      let product = await ProductDBApi.findBy({ id }, { transaction });

      if (!product) {
        throw new ValidationError('productNotFound');
      }

      await ProductDBApi.update(id, data, {
        currentUser,
        transaction,
      });

      await transaction.commit();
      return product;
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

      await ProductDBApi.remove(id, {
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
