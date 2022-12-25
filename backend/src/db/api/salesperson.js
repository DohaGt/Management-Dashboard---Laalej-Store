
const db = require('../models');
const FileDBApi = require('./file');
const crypto = require('crypto');
const Utils = require('../utils');

const Sequelize = db.Sequelize;
const Op = Sequelize.Op;

module.exports = class SalespersonDBApi {

  static async create(data, options) {
  const currentUser = (options && options.currentUser) || { id: null };
  const transaction = (options && options.transaction) || undefined;

  const salesperson = await db.salesperson.create(
  {
  id: data.id || undefined,

    employeeID: data.employeeID
    ||
    null
,

    commission: data.commission
    ||
    null
,

  importHash: data.importHash || null,
  createdById: currentUser.id,
  updatedById: currentUser.id,
  },
  { transaction },
  );

  return salesperson;
  }

  static async update(id, data, options) {
    const currentUser = (options && options.currentUser) || {id: null};
    const transaction = (options && options.transaction) || undefined;

    const salesperson = await db.salesperson.findByPk(id, {
      transaction,
    });

    await salesperson.update(
      {

        employeeID: data.employeeID
        ||
        null
,

        commission: data.commission
        ||
        null
,

        updatedById: currentUser.id,
      },
      {transaction},
    );

    return salesperson;
  }

  static async remove(id, options) {
    const currentUser = (options && options.currentUser) || {id: null};
    const transaction = (options && options.transaction) || undefined;

    const salesperson = await db.salesperson.findByPk(id, options);

    await salesperson.update({
      deletedBy: currentUser.id
    }, {
      transaction,
    });

    await salesperson.destroy({
      transaction
    });

    return salesperson;
  }

  static async findBy(where, options) {
    const transaction = (options && options.transaction) || undefined;

    const salesperson = await db.salesperson.findOne(
      { where },
      { transaction },
    );

    if (!salesperson) {
      return salesperson;
    }

    const output = salesperson.get({plain: true});

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

      if (filter.commissionRange) {
        const [start, end] = filter.commissionRange;

        if (start !== undefined && start !== null && start !== '') {
          where = {
            ...where,
            commission: {
              ...where.commission,
              [Op.gte]: start,
            },
          };
        }

        if (end !== undefined && end !== null && end !== '') {
          where = {
            ...where,
            commission: {
              ...where.commission,
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

    let { rows, count } = await db.salesperson.findAndCountAll(
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
            'salesperson',
            'id',
            query,
          ),
        ],
      };
    }

    const records = await db.salesperson.findAll({
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

