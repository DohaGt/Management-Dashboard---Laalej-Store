const db = require('../models');
const FileDBApi = require('./file');
const crypto = require('crypto');
const Utils = require('../utils');

const Sequelize = db.Sequelize;
const Op = Sequelize.Op;

module.exports = class SupplierDBApi {
  static async create(data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const supplier = await db.supplier.create(
      {
        id: data.id || undefined,

        supplierCode: data.supplierCode || null,
        CompanyName: data.CompanyName || null,
        contactFirstName: data.contactFirstName || null,
        contactLastName: data.contactLastName || null,
        phone: data.phone || null,
        zipCode: data.zipCode || null,
        importHash: data.importHash || null,
        createdById: currentUser.id,
        updatedById: currentUser.id,
      },
      { transaction },
    );

    return supplier;
  }

  static async update(id, data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const supplier = await db.supplier.findByPk(id, {
      transaction,
    });

    await supplier.update(
      {
        supplierCode: data.supplierCode || null,
        CompanyName: data.CompanyName || null,
        contactFirstName: data.contactFirstName || null,
        contactLastName: data.contactLastName || null,
        phone: data.phone || null,
        zipCode: data.zipCode || null,
        updatedById: currentUser.id,
      },
      { transaction },
    );

    return supplier;
  }

  static async remove(id, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const supplier = await db.supplier.findByPk(id, options);

    await supplier.update(
      {
        deletedBy: currentUser.id,
      },
      {
        transaction,
      },
    );

    await supplier.destroy({
      transaction,
    });

    return supplier;
  }

  static async findBy(where, options) {
    const transaction = (options && options.transaction) || undefined;

    const supplier = await db.supplier.findOne({ where }, { transaction });

    if (!supplier) {
      return supplier;
    }

    const output = supplier.get({ plain: true });

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
    let include = [];

    if (filter) {
      if (filter.id) {
        where = {
          ...where,
          ['id']: Utils.uuid(filter.id),
        };
      }

      if (filter.CompanyName) {
        where = {
          ...where,
          [Op.and]: Utils.ilike('supplier', 'CompanyName', filter.CompanyName),
        };
      }

      if (filter.contactFirstName) {
        where = {
          ...where,
          [Op.and]: Utils.ilike(
            'supplier',
            'contactFirstName',
            filter.contactFirstName,
          ),
        };
      }

      if (filter.contactLastName) {
        where = {
          ...where,
          [Op.and]: Utils.ilike(
            'supplier',
            'contactLastName',
            filter.contactLastName,
          ),
        };
      }

      if (filter.phone) {
        where = {
          ...where,
          [Op.and]: Utils.ilike('supplier', 'phone', filter.phone),
        };
      }

      if (filter.supplierCodeRange) {
        const [start, end] = filter.supplierCodeRange;

        if (start !== undefined && start !== null && start !== '') {
          where = {
            ...where,
            supplierCode: {
              ...where.supplierCode,
              [Op.gte]: start,
            },
          };
        }

        if (end !== undefined && end !== null && end !== '') {
          where = {
            ...where,
            supplierCode: {
              ...where.supplierCode,
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

      if (
        filter.active === true ||
        filter.active === 'true' ||
        filter.active === false ||
        filter.active === 'false'
      ) {
        where = {
          ...where,
          active: filter.active === true || filter.active === 'true',
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

    let { rows, count } = await db.supplier.findAndCountAll({
      where,
      include,
      distinct: true,
      limit: limit ? Number(limit) : undefined,
      offset: offset ? Number(offset) : undefined,
      order:
        filter.field && filter.sort
          ? [[filter.field, filter.sort]]
          : [['createdAt', 'desc']],
      transaction,
    });

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
          Utils.ilike('supplier', 'id', query),
        ],
      };
    }

    const records = await db.supplier.findAll({
      attributes: ['id', 'id'],
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
