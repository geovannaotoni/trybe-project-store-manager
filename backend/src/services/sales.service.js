const { salesModel } = require('../models');

const findAll = async () => {
  const sales = await salesModel.findAll();

  return { status: 'SUCCESSFUL', data: sales };
};

const findById = async (salesId) => {
  const sale = await salesModel.findById(salesId);

  if (sale.length === 0) return { status: 'NOT_FOUND', data: { message: 'Sale not found' } };
  
  return { status: 'SUCCESSFUL', data: sale };
};

const createSales = async (sales) => {
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