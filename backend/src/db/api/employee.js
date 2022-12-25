
const db = require('../models');
const FileDBApi = require('./file');
const crypto = require('crypto');
const Utils = require('../utils');

const Sequelize = db.Sequelize;
const Op = Sequelize.Op;

module.exports = class EmployeeDBApi {

  static async create(data, options) {
  const currentUser = (options && options.currentUser) || { id: null };
  const transaction = (options && options.transaction) || undefined;

  const employee = await db.employee.create(
  {
  id: data.id || undefined,

    employeeID: data.employeeID
    ||
    null
,

    lastName: data.lastName
    ||
    null
,

    firstName: data.firstName
    ||
    null
,

    zipCode: data.zipCode
    ||
    null
,

    phoneNumber: data.phoneNumber
    ||
    null
,

    hireDate: data.hireDate
    ||
    null
,

    salary: data.salary
    ||
    null
,

    employeeType: data.employeeType
    ||
    null
,

  importHash: data.importHash || null,
  createdById: currentUser.id,
  updatedById: currentUser.id,
  },
  { transaction },
  );

  return employee;
  }

  static async update(id, data, options) {
    const currentUser = (options && options.currentUser) || {id: null};
    const transaction = (options && options.transaction) || undefined;

    const employee = await db.employee.findByPk(id, {
      transaction,
    });

    await employee.update(
      {

        employeeID: data.employeeID
        ||
        null
,

        lastName: data.lastName
        ||
        null
,

        firstName: data.firstName
        ||
        null
,

        zipCode: data.zipCode
        ||
        null
,

        phoneNumber: data.phoneNumber
        ||
        null
,

        hireDate: data.hireDate
        ||
        null
,

        salary: data.salary
        ||
        null
,

        employeeType: data.employeeType
        ||
        null
,

        updatedById: currentUser.id,
      },
      {transaction},
    );

    return employee;
  }

  static async remove(id, options) {
    const currentUser = (options && options.currentUser) || {id: null};
    const transaction = (options && options.transaction) || undefined;

    const employee = await db.employee.findByPk(id, options);

    await employee.update({
      deletedBy: currentUser.id
    }, {
      transaction,
    });

    await employee.destroy({
      transaction
    });

    return employee;
  }

  static async findBy(where, options) {
    const transaction = (options && options.transaction) || undefined;

    const employee = await db.employee.findOne(
      { where },
      { transaction },
    );

    if (!employee) {
      return employee;
    }

    const output = employee.get({plain: true});

    return output;
  }

  static async findAll(filter, options) {
    var limit = filter.limit || 0;
    var offset = 0;
    const currentPage = +filter.page;

    offset = currentPage * limit;

    var orderBy = null;

    const transaction = (options && options.transaction) || undefined;
    let where = {};
    let include = [

    ];

    if (filter) {
      if (filter.id) {
        where = {
          ...where,
          ['id']: Utils.uuid(filter.id),
        };
      }

      if (filter.lastName) {
        where = {
          ...where,
          [Op.and]: Utils.ilike(
            'employee',
            'lastName',
            filter.lastName,
          ),
        };
      }

      if (filter.firstName) {
        where = {
          ...where,
          [Op.and]: Utils.ilike(
            'employee',
            'firstName',
            filter.firstName,
          ),
        };
      }

      if (filter.phoneNumber) {
        where = {
          ...where,
          [Op.and]: Utils.ilike(
            'employee',
            'phoneNumber',
            filter.phoneNumber,
          ),
        };
      }

      if (filter.employeeIDRange) {
        const [start, end] = filter.employeeIDRange;

        if (start !== undefined && start !== null && start !== '') {
          where = {
            ...where,
            employeeID: {
              ...where.employeeID,
              [Op.gte]: start,
            },
          };
        }

        if (end !== undefined && end !== null && end !== '') {
          where = {
            ...where,
            employeeID: {
              ...where.employeeID,
              [Op.lte]: end,
            },
          };
        }
      }

      if (filter.zipCodeRange) {
        const [start, end] = filter.zipCodeRange;

        if (start !== undefined && start !== null && start !== '') {
          where = {
            ...where,
            zipCode: {
              ...where.zipCode,
              [Op.gte]: start,
            },
          };
        }

        if (end !== undefined && end !== null && end !== '') {
          where = {
            ...where,
            zipCode: {
              ...where.zipCode,
              [Op.lte]: end,
            },
          };
        }
      }

      if (filter.hireDateRange) {
        const [start, end] = filter.hireDateRange;

        if (start !== undefined && start !== null && start !== '') {
          where = {
            ...where,
            hireDate: {
              ...where.hireDate,
              [Op.gte]: start,
            },
          };
        }

        if (end !== undefined && end !== null && end !== '') {
          where = {
            ...where,
            hireDate: {
              ...where.hireDate,
              [Op.lte]: end,
            },
          };
        }
      }

      if (filter.salaryRange) {
        const [start, end] = filter.salaryRange;

        if (start !== undefined && start !== null && start !== '') {
          where = {
            ...where,
            salary: {
              ...where.salary,
              [Op.gte]: start,
            },
          };
        }

        if (end !== undefined && end !== null && end !== '') {
          where = {
            ...where,
            salary: {
              ...where.salary,
              [Op.lte]: end,
            },
          };
        }
      }

      if (
        filter.active === true ||
        filter.active === 'true' ||
        filter.active === false ||
        filter.active === 'false'
      ) {
        where = {
          ...where,
          active:
            filter.active === true ||
            filter.active === 'true',
        };
      }

      if (filter.employeeType) {
        where = {
          ...where,
          employeeType: filter.employeeType,
        };
      }

      if (filter.createdAtRange) {
        const [start, end] = filter.createdAtRange;

        if (start !== undefined && start !== null && start !== '') {
          where = {
            ...where,
            ['createdAt']: {
              ...where.createdAt,
              [Op.gte]: start,
            },
          };
        }

        if (end !== undefined && end !== null && end !== '') {
          where = {
            ...where,
            ['createdAt']: {
              ...where.createdAt,
              [Op.lte]: end,
            },
          };
        }
      }
    }

    let { rows, count } = await db.employee.findAndCountAll(
      {
        where,
        include,
        distinct: true,
        limit: limit ? Number(limit) : undefined,
        offset: offset ? Number(offset) : undefined,
        order: (filter.field && filter.sort)
          ? [[filter.field, filter.sort]]
          : [['createdAt', 'desc']],
        transaction,
      },
    );

//    rows = await this._fillWithRelationsAndFilesForRows(
//      rows,
//      options,
//    );

    return { rows, count };
  }

  static async findAllAutocomplete(query, limit) {
    let where = {};

    if (query) {
      where = {
        [Op.or]: [
          { ['id']: Utils.uuid(query) },
          Utils.ilike(
            'employee',
            'id',
            query,
          ),
        ],
      };
    }

    const records = await db.employee.findAll({
      attributes: [ 'id', 'id' ],
      where,
      limit: limit ? Number(limit) : undefined,
      orderBy: [['id', 'ASC']],
    });

    return records.map((record) => ({
      id: record.id,
      label: record.id,
    }));
  }

};

