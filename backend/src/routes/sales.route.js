const route = require('express').Router();
const { salesController } = require('../controllers');
const validateQuantityField = require('../middlewares/validateQuantityField');
const validateSalesFields = require('../middlewares/validateSalesFields');

route.get('/', salesController.findAll);

route.get('/:id', salesController.findById);

route.post('/', validateSalesFields, salesController.createSales);

route.delete('/:id', salesController.deleteSales);

route.put(
  '/:saleId/products/:productId/quantity',
  validateQuantityField,
  salesController.updateQuantity,
);

module.exports = route;