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

module.exports = {
  findAll,
  findById,
};