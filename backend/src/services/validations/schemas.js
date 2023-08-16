const Joi = require('joi');

const addProductSchema = Joi.object({
  name: Joi.string().min(5),
});

const addSaleSchema = Joi.object({
  quantity: Joi.number().min(1),
  productId: Joi.number().integer(),
});

const addQuantitySchema = Joi.number().min(1)
  .message('"quantity" must be greater than or equal to 1');

module.exports = {
  addProductSchema,
  addSaleSchema,
  addQuantitySchema,
};