const route = require('express').Router();
const { salesController } = require('../controllers');
const validateSalesFields = require('../middlewares/validateSalesFields');

route.get('/', salesController.findAll);

route.get('/:id', salesController.findById);

route.post('/', validateSalesFields, salesController.createSales);

module.exports = route;