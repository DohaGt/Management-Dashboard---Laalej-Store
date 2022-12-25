const db = require('../db/models');
const EmployeeDBApi = require('../db/api/employee');

module.exports = class EmployeeService {
  static async create(data, currentUser) {
    const transaction = await db.sequelize.transaction();
    try {
      await EmployeeDBApi.create(
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
      let employee = await EmployeeDBApi.findBy(
        {id},
        {transaction},
      );

      if (!employee) {
        throw new ValidationError(
          'employeeNotFound',
        );
      }

      await EmployeeDBApi.update(
        id,
        data,
        {
          currentUser,
          transaction,
        },
      );

      await transaction.commit();
      return employee;

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

      await EmployeeDBApi.remove(
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

