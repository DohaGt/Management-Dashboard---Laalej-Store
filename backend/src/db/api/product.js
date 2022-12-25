
const db = require('../models');
const FileDBApi = require('./file');
const crypto = require('crypto');
const Utils = require('../utils');

const Sequelize = db.Sequelize;
const Op = Sequelize.Op;

module.exports = class ProductDBApi {

  static async create(data, options) {
  const currentUser = (options && options.currentUser) || { id: null };
  const transaction = (options && options.transaction) || undefined;

  const product = await db.product.create(
  {
  id: data.id || undefined,

    productCode: data.productCode
    ||
    null
,

    description: data.description
    ||
    null
,

    inDate: data.inDate
    ||
    null
,

    quantityOnHand: data.quantityOnHand
    ||
    null
,

    minQuantityOnHand: data.minQuantityOnHand
    ||
    null
,

    price: data.price
    ||
    null
,

    dicountRate: data.dicountRate
    ||
    null
,

  importHash: data.importHash || null,
  createdById: currentUser.id,
  updatedById: currentUser.id,
  },
  { transaction },
  );

    await product.setSupplierCode(data.supplierCode || null, {
    transaction,
    });

  return product;
  }

  static async update(id, data, options) {
    const currentUser = (options && options.currentUser) || {id: null};
    const transaction = (options && options.transaction) || undefined;

    const product = await db.product.findByPk(id, {
      transaction,
    });

    await product.update(
      {

        productCode: data.productCode
        ||
        null
,

        description: data.description
        ||
        null
,

        inDate: data.inDate
        ||
        null
,

        quantityOnHand: data.quantityOnHand
        ||
        null
,

        minQuantityOnHand: data.minQuantityOnHand
        ||
        null
,

        price: data.price
        ||
        null
,

        dicountRate: data.dicountRate
        ||
        null
,

        updatedById: currentUser.id,
      },
      {transaction},
    );

    await product.setSupplierCode(data.supplierCode || null, {
      transaction,
    });

    return product;
  }

  static async remove(id, options) {
    const currentUser = (options && options.currentUser) || {id: null};
    const transaction = (options && options.transaction) || undefined;

    const product = await db.product.findByPk(id, options);

    await product.update({
      deletedBy: currentUser.id
    }, {
      transaction,
    });

    await product.destroy({
      transaction
    });

    return product;
  }

  static async findBy(where, options) {
    const transaction = (options && options.transaction) || undefined;

    const product = await db.product.findOne(
      { where },
      { transaction },
    );

    if (!product) {
      return product;
    }

    const output = product.get({plain: true});

    output.supplierCode = await product.getSupplierCode({
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
        model: db.supplier,
        as: 'supplierCode',
      },

    ];

    if (filter) {
      if (filter.id) {
        where = {
          ...where,
          ['id']: Utils.uuid(filter.id),
        };
      }

      if (filter.description) {
        where = {
          ...where,
          [Op.and]: Utils.ilike(
            'product',
            'description',
            filter.description,
          ),
        };
      }

      if (filter.productCodeRange) {
        const [start, end] = filter.productCodeRange;

        if (start !== undefined && start !== null && start !== '') {
          where = {
            ...where,
            productCode: {
              ...where.productCode,
              [Op.gte]: start,
            },
          };
        }

        if (end !== undefined && end !== null && end !== '') {
          where = {
            ...where,
            productCode: {
              ...where.productCode,
              [Op.lte]: end,
            },
          };
        }
      }

      if (filter.inDateRange) {
        const [start, end] = filter.inDateRange;

        if (start !== undefined && start !== null && start !== '') {
          where = {
            ...where,
            inDate: {
              ...where.inDate,
              [Op.gte]: start,
            },
          };
        }

        if (end !== undefined && end !== null && end !== '') {
          where = {
            ...where,
            inDate: {
              ...where.inDate,
              [Op.lte]: end,
            },
          };
        }
      }

      if (filter.quantityOnHandRange) {
        const [start, end] = filter.quantityOnHandRange;

        if (start !== undefined && start !== null && start !== '') {
          where = {
            ...where,
            quantityOnHand: {
              ...where.quantityOnHand,
              [Op.gte]: start,
            },
          };
        }

        if (end !== undefined && end !== null && end !== '') {
          where = {
            ...where,
            quantityOnHand: {
              ...where.quantityOnHand,
              [Op.lte]: end,
            },
          };
        }
      }

      if (filter.minQuantityOnHandRange) {
        const [start, end] = filter.minQuantityOnHandRange;

        if (start !== undefined && start !== null && start !== '') {
          where = {
            ...where,
            minQuantityOnHand: {
              ...where.minQuantityOnHand,
              [Op.gte]: start,
            },
          };
        }

        if (end !== undefined && end !== null && end !== '') {
          where = {
            ...where,
            minQuantityOnHand: {
              ...where.minQuantityOnHand,
              [Op.lte]: end,
            },
          };
        }
      }

      if (filter.priceRange) {
        const [start, end] = filter.priceRange;

        if (start !== undefined && start !== null && start !== '') {
          where = {
            ...where,
            price: {
              ...where.price,
              [Op.gte]: start,
            },
          };
        }

        if (end !== undefined && end !== null && end !== '') {
          where = {
            ...where,
            price: {
              ...where.price,
              [Op.lte]: end,
            },
          };
        }
      }

      if (filter.dicountRateRange) {
        const [start, end] = filter.dicountRateRange;

        if (start !== undefined && start !== null && start !== '') {
          where = {
            ...where,
            dicountRate: {
              ...where.dicountRate,
              [Op.gte]: start,
            },
          };
        }

        if (end !== undefined && end !== null && end !== '') {
          where = {
            ...where,
            dicountRate: {
              ...where.dicountRate,
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

      if (filter.supplierCode) {
        var listItems = filter.supplierCode.split('|').map(item => {
          return  Utils.uuid(item)
        });

        where = {
          ...where,
          supplierCodeId: {[Op.or]: listItems}
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

    let { rows, count } = await db.product.findAndCountAll(
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
            'product',
            'id',
            query,
          ),
        ],
      };
    }

    const records = await db.product.findAll({
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

