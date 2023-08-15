const { addProductSchema } = require('./schemas');

const validateNewProduct = (product) => {
  const { error } = addProductSchema.validate(product);

  if (error) return { status: 'INVALID_VALUE', message: error.message };
};

module.exports = {
  validateNewProduct,
};