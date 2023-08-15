const route = require('express').Router();
const { salesController } = require('../controllers');

route.get('/', salesController.findAll);

route.get('/:id', salesController.findById);

route.post('/', salesController.createSales);

module.exports = route;