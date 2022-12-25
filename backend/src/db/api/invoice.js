
const db = require('../models');
const FileDBApi = require('./file');
const crypto = require('crypto');
const Utils = require('../utils');

const Sequelize = db.Sequelize;
const Op = Sequelize.Op;

module.exports = class InvoiceDBApi {

  static async create(data, options) {
  const currentUser = (options && options.currentUser) || { id: null };
  const transaction = (options && options.transaction) || undefined;

  const invoice = await db.invoice.create(
  {
  id: data.id || undefined,

    invoiceNumber: data.invoiceNumber
    ||
    null
,

    clientCode: data.clientCode
    ||
    null
,

    invoiceDate: data.invoiceDate
    ||
    null
,

  importHash: data.importHash || null,
  createdById: currentUser.id,
  updatedById: currentUser.id,
  },
  { transaction },
  );

    await invoice.setEmployeeID(data.employeeID || null, {
    transaction,
    });

  return invoice;
  }

  static async update(id, data, options) {
    const currentUser = (options && options.currentUser) || {id: null};
    const transaction = (options && options.transaction) || undefined;

    const invoice = await db.invoice.findByPk(id, {
      transaction,
    });

    await invoice.update(
      {

        invoiceNumber: data.invoiceNumber
        ||
        null
,

        clientCode: data.clientCode
        ||
        null
,

        invoiceDate: data.invoiceDate
        ||
        null
,

        updatedById: currentUser.id,
      },
      {transaction},
    );

    await invoice.setEmployeeID(data.employeeID || null, {
      transaction,
    });

    return invoice;
  }

  static async remove(id, options) {
    const currentUser = (options && options.currentUser) || {id: null};
    const transaction = (options && options.transaction) || undefined;

    const invoice = await db.invoice.findByPk(id, options);

    await invoice.update({
      deletedBy: currentUser.id
    }, {
      transaction,
    });

    await invoice.destroy({
      transaction
    });

    return invoice;
  }

  static async findBy(where, options) {
    const transaction = (options && options.transaction) || undefined;

    const invoice = await db.invoice.findOne(
      { where },
      { transaction },
    );

    if (!invoice) {
      return invoice;
    }

    const output = invoice.get({plain: true});

    output.employeeID = await invoice.getEmployeeID({
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
        model: db.employee,
        as: 'employeeID',
      },

    ];

    if (filter) {
      if (filter.id) {
        where = {
          ...where,
          ['id']: Utils.uuid(filter.id),
        };
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

      if (filter.invoiceDateRange) {
        const [start, end] = filter.invoiceDateRange;

        if (start !== undefined && start !== null && start !== '') {
          where = {
            ...where,
            invoiceDate: {
              ...where.invoiceDate,
              [Op.gte]: start,
            },
          };
        }

        if (end !== undefined && end !== null && end !== '') {
          where = {
            ...where,
            invoiceDate: {
              ...where.invoiceDate,
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

      if (filter.employeeID) {
        var listItems = filter.employeeID.split('|').map(item => {
          return  Utils.uuid(item)
        });

        where = {
          ...where,
          employeeIDId: {[Op.or]: listItems}
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

    let { rows, count } = await db.invoice.findAndCountAll(
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
            'invoice',
            'id',
            query,
          ),
        ],
      };
    }

    const records = await db.invoice.findAll({
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

