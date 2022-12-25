
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

    lineNumber: data.lineNumber
    ||
    null
,

    quantity: data.quantity
    ||
    null
,

    unitPrice: data.unitPrice
    ||
    null
,

  importHash: data.importHash || null,
  createdById: currentUser.id,
  updatedById: currentUser.id,
  },
  { transaction },
  );

    await line.setInvoiceNumber(data.invoiceNumber || null, {
    transaction,
    });

    await line.setProductCode(data.productCode || null, {
    transaction,
    });

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

        lineNumber: data.lineNumber
        ||
        null
,

        quantity: data.quantity
        ||
        null
,

        unitPrice: data.unitPrice
        ||
        null
,

        updatedById: currentUser.id,
      },
      {transaction},
    );

    await line.setInvoiceNumber(data.invoiceNumber || null, {
      transaction,
    });

    await line.setProductCode(data.productCode || null, {
      transaction,
    });

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

    output.invoiceNumber = await line.getInvoiceNumber({
      transaction
    });

    output.productCode = await line.getProductCode({
      transaction
    });

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

      {
        model: db.invoice,
        as: 'invoiceNumber',
      },

      {
        model: db.product,
        as: 'productCode',
      },

    ];

    if (filter) {
      if (filter.id) {
        where = {
          ...where,
          ['id']: Utils.uuid(filter.id),
        };
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

      if (filter.invoiceNumber) {
        var listItems = filter.invoiceNumber.split('|').map(item => {
          return  Utils.uuid(item)
        });

        where = {
          ...where,
          invoiceNumberId: {[Op.or]: listItems}
        };
      }

      if (filter.productCode) {
        var listItems = filter.productCode.split('|').map(item => {
          return  Utils.uuid(item)
        });

        where = {
          ...where,
          productCodeId: {[Op.or]: listItems}
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

