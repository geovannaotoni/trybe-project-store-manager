const checkRequiredFields = require('../utils/checkRequiredFields');

const validateSalesFields = (req, res, next) => {
  const { body } = req;
  const requiredProductFields = ['productId', 'quantity'];

  for (let i = 0; i < body.length; i += 1) {
    const product = body[i];
    const error = checkRequiredFields(product, requiredProductFields);
    if (error) return res.status(400).json({ message: error });
  }

  return next();
};

module.exports = validateSalesFields;