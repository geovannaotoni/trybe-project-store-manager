const route = require('express').Router();
const { productsController } = require('../controllers'); 

route.get('/', productsController.findAll);

route.get('/:id', productsController.findById);

module.exports = route;