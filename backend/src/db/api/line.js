
const db = require('../models');
const FileDBApi = require('./file');
const crypto = require('crypto');
const Utils = require('../utils');

const Sequelize = db.Sequelize;
const Op = Sequelize.Op;

module.exports = class LineDBApi {

  static async create(data, options) {
  const currentUser = (options && options.currentUser) || { id: null };
  const transaction = (options && options.transaction) || undefined;

  const line = await db.line.create(
  {
  id: data.id || undefined,

    quantity: data.quantity
    ||
    null
,

    lineNumber: data.lineNumber
    ||
    null
,

    unitPrice: data.unitPrice
    ||
    null
,

    invoiceNumber: data.invoiceNumber
    ||
    null
,

    clientCode: data.clientCode
    ||
    null
,

  importHash: data.importHash || null,
  createdById: currentUser.id,
  updatedById: currentUser.id,
  },
  { transaction },
  );

  return line;
  }

  static async update(id, data, options) {
    const currentUser = (options && options.currentUser) || {id: null};
    const transaction = (options && options.transaction) || undefined;

    const line = await db.line.findByPk(id, {
      transaction,
    });

    await line.update(
      {

        quantity: data.quantity
        ||
        null
,

        lineNumber: data.lineNumber
        ||
        null
,

        unitPrice: data.unitPrice
        ||
        null
,

        invoiceNumber: data.invoiceNumber
        ||
        null
,

        clientCode: data.clientCode
        ||
        null
,

        updatedById: currentUser.id,
      },
      {transaction},
    );

    return line;
  }

  static async remove(id, options) {
    const currentUser = (options && options.currentUser) || {id: null};
    const transaction = (options && options.transaction) || undefined;

    const line = await db.line.findByPk(id, options);

    await line.update({
      deletedBy: currentUser.id
    }, {
      transaction,
    });

    await line.destroy({
      transaction
    });

    return line;
  }

  static async findBy(where, options) {
    const transaction = (options && options.transaction) || undefined;

    const line = await db.line.findOne(
      { where },
      { transaction },
    );

    if (!line) {
      return line;
    }

    const output = line.get({plain: true});

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

      if (filter.quantityRange) {
        const [start, end] = filter.quantityRange;

        if (start !== undefined && start !== null && start !== '') {
          where = {
            ...where,
            quantity: {
              ...where.quantity,
              [Op.gte]: start,
            },
          };
        }

        if (end !== undefined && end !== null && end !== '') {
          where = {
            ...where,
            quantity: {
              ...where.quantity,
              [Op.lte]: end,
            },
          };
        }
      }

      if (filter.lineNumberRange) {
        const [start, end] = filter.lineNumberRange;

        if (start !== undefined && start !== null && start !== '') {
          where = {
            ...where,
            lineNumber: {
              ...where.lineNumber,
              [Op.gte]: start,
            },
          };
        }

        if (end !== undefined && end !== null && end !== '') {
          where = {
            ...where,
            lineNumber: {
              ...where.lineNumber,
              [Op.lte]: end,
            },
          };
        }
      }

      if (filter.unitPriceRange) {
        const [start, end] = filter.unitPriceRange;

        if (start !== undefined && start !== null && start !== '') {
          where = {
            ...where,
            unitPrice: {
              ...where.unitPrice,
              [Op.gte]: start,
            },
          };
        }

        if (end !== undefined && end !== null && end !== '') {
          where = {
            ...where,
            unitPrice: {
              ...where.unitPrice,
              [Op.lte]: end,
            },
          };
        }
      }

      if (filter.invoiceNumberRange) {
        const [start, end] = filter.invoiceNumberRange;

        if (start !== undefined && start !== null && start !== '') {
          where = {
            ...where,
            invoiceNumber: {
              ...where.invoiceNumber,
              [Op.gte]: start,
            },
          };
        }

        if (end !== undefined && end !== null && end !== '') {
          where = {
            ...where,
            invoiceNumber: {
              ...where.invoiceNumber,
              [Op.lte]: end,
            },
          };
        }
      }

      if (filter.clientCodeRange) {
        const [start, end] = filter.clientCodeRange;

        if (start !== undefined && start !== null && start !== '') {
          where = {
            ...where,
            clientCode: {
              ...where.clientCode,
              [Op.gte]: start,
            },
          };
        }

        if (end !== undefined && end !== null && end !== '') {
          where = {
            ...where,
            clientCode: {
              ...where.clientCode,
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

    let { rows, count } = await db.line.findAndCountAll(
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
            'line',
            'id',
            query,
          ),
        ],
      };
    }

    const records = await db.line.findAll({
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

