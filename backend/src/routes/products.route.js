const route = require('express').Router();
const { productsController } = require('../controllers'); 
const validateProductFields = require('../middlewares/validateProductFields');

route.get('/', productsController.findAll);

route.get('/:id', productsController.findById);

route.post('/', validateProductFields, productsController.createProduct);

module.exports = route;