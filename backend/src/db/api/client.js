
const db = require('../models');
const FileDBApi = require('./file');
const crypto = require('crypto');
const Utils = require('../utils');

const Sequelize = db.Sequelize;
const Op = Sequelize.Op;

module.exports = class ClientDBApi {

  static async create(data, options) {
  const currentUser = (options && options.currentUser) || { id: null };
  const transaction = (options && options.transaction) || undefined;

  const client = await db.client.create(
  {
  id: data.id || undefined,

    clientCode: data.clientCode
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

    email: data.email
    ||
    null
,

    balance: data.balance
    ||
    null
,

    employeeID: data.employeeID
    ||
    null
,

  importHash: data.importHash || null,
  createdById: currentUser.id,
  updatedById: currentUser.id,
  },
  { transaction },
  );

  return client;
  }

  static async update(id, data, options) {
    const currentUser = (options && options.currentUser) || {id: null};
    const transaction = (options && options.transaction) || undefined;

    const client = await db.client.findByPk(id, {
      transaction,
    });

    await client.update(
      {

        clientCode: data.clientCode
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

        email: data.email
        ||
        null
,

        balance: data.balance
        ||
        null
,

        employeeID: data.employeeID
        ||
        null
,

        updatedById: currentUser.id,
      },
      {transaction},
    );

    return client;
  }

  static async remove(id, options) {
    const currentUser = (options && options.currentUser) || {id: null};
    const transaction = (options && options.transaction) || undefined;

    const client = await db.client.findByPk(id, options);

    await client.update({
      deletedBy: currentUser.id
    }, {
      transaction,
    });

    await client.destroy({
      transaction
    });

    return client;
  }

  static async findBy(where, options) {
    const transaction = (options && options.transaction) || undefined;

    const client = await db.client.findOne(
      { where },
      { transaction },
    );

    if (!client) {
      return client;
    }

    const output = client.get({plain: true});

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
            'client',
            'lastName',
            filter.lastName,
          ),
        };
      }

      if (filter.firstName) {
        where = {
          ...where,
          [Op.and]: Utils.ilike(
            'client',
            'firstName',
            filter.firstName,
          ),
        };
      }

      if (filter.phoneNumber) {
        where = {
          ...where,
          [Op.and]: Utils.ilike(
            'client',
            'phoneNumber',
            filter.phoneNumber,
          ),
        };
      }

      if (filter.email) {
        where = {
          ...where,
          [Op.and]: Utils.ilike(
            'client',
            'email',
            filter.email,
          ),
        };
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

      if (filter.balanceRange) {
        const [start, end] = filter.balanceRange;

        if (start !== undefined && start !== null && start !== '') {
          where = {
            ...where,
            balance: {
              ...where.balance,
              [Op.gte]: start,
            },
          };
        }

        if (end !== undefined && end !== null && end !== '') {
          where = {
            ...where,
            balance: {
              ...where.balance,
              [Op.lte]: end,
            },
          };
        }
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

    let { rows, count } = await db.client.findAndCountAll(
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
            'client',
            'id',
            query,
          ),
        ],
      };
    }

    const records = await db.client.findAll({
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

