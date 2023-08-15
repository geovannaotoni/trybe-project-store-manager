const { salesModel, productsModel } = require('../models');
const validation = require('./validations/validationsInputValues');

const findAll = async () => {
  const sales = await salesModel.findAll();

  return { status: 'SUCCESSFUL', data: sales };
};

const findById = async (salesId) => {
  const sale = await salesModel.findById(salesId);

  if (sale.length === 0) return { status: 'NOT_FOUND', data: { message: 'Sale not found' } };
  
  return { status: 'SUCCESSFUL', data: sale };
};

const verifyProductId = async (sales) => {
  const promises = sales
    .map(({ productId }) => productsModel.findById(productId));
  const results = await Promise.all(promises);
  const errorResults = results.some((result) => result === undefined);
  if (errorResults) {
    return { status: 'NOT_FOUND', message: 'Product not found' };
  }
};

const createSales = async (sales) => {
  const errorSchema = validation.validateNewSale(sales);
  if (errorSchema) return { status: errorSchema.status, data: { message: errorSchema.message } };

  const errorProductId = await verifyProductId(sales);
  if (errorProductId) {
    return { status: errorProductId.status, data: { message: errorProductId.message } };
  }

  const insertId = await salesModel.insert(sales);
  const groupSalesById = await salesModel.findById(insertId);
  const itemsSold = groupSalesById.map(({ productId, quantity }) => ({ productId, quantity }));

  return ({
    status: 'CREATED',
    data: { id: insertId, itemsSold },
  });
};

module.exports = {
  findAll,
  findById,
  createSales,
};