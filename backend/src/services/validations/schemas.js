const Joi = require('joi');

const addProductSchema = Joi.object({
  name: Joi.string().min(5),
});

const addSaleSchema = Joi.object({
  quantity: Joi.number().min(1),
  productId: Joi.number().integer(),
});

module.exports = {
  addProductSchema,
  addSaleSchema,
};