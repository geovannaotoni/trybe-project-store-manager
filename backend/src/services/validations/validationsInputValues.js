const { addProductSchema, addSaleSchema, addQuantitySchema } = require('./schemas');

const validateNewProduct = (product) => {
  const { error } = addProductSchema.validate(product);

  if (error) return { status: 'INVALID_VALUE', message: error.message };
};

const validateNewSale = (sales) => {
  for (let i = 0; i < sales.length; i += 1) {
    const sale = sales[i];
    const { error } = addSaleSchema.validate(sale);
    if (error) return { status: 'INVALID_VALUE', message: error.message };
  }
};

const validateNewQuantity = (quantity) => {
  const { error } = addQuantitySchema.validate(quantity);

  if (error) return { status: 'INVALID_VALUE', message: error.message };
};

module.exports = {
  validateNewProduct,
  validateNewSale,
  validateNewQuantity,
};