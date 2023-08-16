const { productsModel } = require('../models');
const validation = require('./validations/validationsInputValues');

const findAll = async () => {
  const products = await productsModel.findAll();

  return { status: 'SUCCESSFUL', data: products };
};

const findById = async (id) => {
  const product = await productsModel.findById(id);

  if (!product) return { status: 'NOT_FOUND', data: { message: 'Product not found' } };
  
  return { status: 'SUCCESSFUL', data: product };
};

const createProduct = async (product) => {
  const error = validation.validateNewProduct(product);
  if (error) return { status: error.status, data: { message: error.message } };
  
  const insertId = await productsModel.insert(product);
  const newProduct = await productsModel.findById(insertId);

  return { status: 'CREATED', data: newProduct };
};

const updateProduct = async (product, id) => {
  const error = validation.validateNewProduct(product);
  if (error) return { status: error.status, data: { message: error.message } };

  const oldProduct = await productsModel.findById(id);
  if (!oldProduct) return { status: 'NOT_FOUND', data: { message: 'Product not found' } };

  await productsModel.update(product, id);

// outra forma de resolver:
  // const [{ affectedRows }] = await productsModel.update(product, id);
  // if (!affectedRows) return { status: 'NOT_FOUND', data: { message: 'Product not found' } };

  const updatedProduct = await productsModel.findById(id);
  return { status: 'SUCCESSFUL', data: updatedProduct };
};

const deleteProduct = async (id) => {
  const [{ affectedRows }] = await productsModel.exclude(id);
  if (!affectedRows) return { status: 'NOT_FOUND', data: { message: 'Product not found' } };

  return { status: 'DELETED' };
};

const searchProduct = async (q) => {
  const products = await productsModel.findAll();
  const filteredProducts = products
    .filter(({ name }) => name.toLowerCase().includes(q.toLowerCase()));
  return { status: 'SUCCESSFUL', data: filteredProducts };
};

module.exports = {
  findAll,
  findById,
  createProduct,
  updateProduct,
  deleteProduct,
  searchProduct,
};