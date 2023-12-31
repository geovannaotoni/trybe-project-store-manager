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

const deleteSales = async (id) => {
  const [{ affectedRows }] = await salesModel.exclude(id);
  if (!affectedRows) return { status: 'NOT_FOUND', data: { message: 'Sale not found' } };
  return { status: 'DELETED' };
};

const updateQuantity = async (saleId, productId, quantity) => {
  const error = validation.validateNewQuantity(quantity);
  if (error) return { status: error.status, data: { message: error.message } };

  // aqui verifica somente se o produto existe, mas não se ele existe na venda de id = saleId
  // const oldProduct = await productsModel.findById(productId);
  // if (!oldProduct) return { status: 'NOT_FOUND', data: { message: 'Product not found in sale' } };

  const oldSale = await salesModel.findById(saleId);
  if (oldSale.length === 0) return { status: 'NOT_FOUND', data: { message: 'Sale not found' } };
  
  // aqui verifica se o produto existe naquela venda em específico
  const oldProduct = oldSale.find((product) => product.productId === Number(productId));
  if (!oldProduct) return { status: 'NOT_FOUND', data: { message: 'Product not found in sale' } };

  await salesModel.updateQuantity(saleId, productId, quantity);
  const result = await salesModel.findByProductAndSaleIds(saleId, productId);
  return { status: 'SUCCESSFUL', data: result };
};

module.exports = {
  findAll,
  findById,
  createSales,
  deleteSales,
  updateQuantity,
};