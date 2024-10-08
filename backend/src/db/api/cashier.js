
const db = require('../models');
const FileDBApi = require('./file');
const crypto = require('crypto');
const Utils = require('../utils');

const Sequelize = db.Sequelize;
const Op = Sequelize.Op;

module.exports = class CashierDBApi {

  static async create(data, options) {
  const currentUser = (options && options.currentUser) || { id: null };
  const transaction = (options && options.transaction) || undefined;

  const cashier = await db.cashier.create(
  {
  id: data.id || undefined,

    employeeID: data.employeeID
    ||
    null
,

    cashDeskNumber: data.cashDeskNumber
    ||
    null
,

  importHash: data.importHash || null,
  createdById: currentUser.id,
  updatedById: currentUser.id,
  },
  { transaction },
  );

  return cashier;
  }

  static async update(id, data, options) {
    const currentUser = (options && options.currentUser) || {id: null};
    const transaction = (options && options.transaction) || undefined;

    const cashier = await db.cashier.findByPk(id, {
      transaction,
    });

    await cashier.update(
      {

        employeeID: data.employeeID
        ||
        null
,

        cashDeskNumber: data.cashDeskNumber
        ||
        null
,

        updatedById: currentUser.id,
      },
      {transaction},
    );

    return cashier;
  }

  static async remove(id, options) {
    const currentUser = (options && options.currentUser) || {id: null};
    const transaction = (options && options.transaction) || undefined;

    const cashier = await db.cashier.findByPk(id, options);

    await cashier.update({
      deletedBy: currentUser.id
    }, {
      transaction,
    });

    await cashier.destroy({
      transaction
    });

    return cashier;
  }

  static async findBy(where, options) {
    const transaction = (options && options.transaction) || undefined;

    const cashier = await db.cashier.findOne(
      { where },
      { transaction },
    );

    if (!cashier) {
      return cashier;
    }

    const output = cashier.get({plain: true});

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

      if (filter.cashDeskNumberRange) {
        const [start, end] = filter.cashDeskNumberRange;

        if (start !== undefined && start !== null && start !== '') {
          where = {
            ...where,
            cashDeskNumber: {
              ...where.cashDeskNumber,
              [Op.gte]: start,
            },
          };
        }

        if (end !== undefined && end !== null && end !== '') {
          where = {
            ...where,
            cashDeskNumber: {
              ...where.cashDeskNumber,
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

    let { rows, count } = await db.cashier.findAndCountAll(
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
            'cashier',
            'id',
            query,
          ),
        ],
      };
    }

    const records = await db.cashier.findAll({
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

