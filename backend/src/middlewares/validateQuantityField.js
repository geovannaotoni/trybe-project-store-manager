const checkRequiredFields = require('../utils/checkRequiredFields');

const validateQuantityField = (req, res, next) => {
  const { body } = req;
  const requiredProductFields = ['quantity'];

  const quantityError = checkRequiredFields(body, requiredProductFields);

  if (quantityError) {
    return res.status(400).json({ message: quantityError });
  }
  return next();
};

module.exports = validateQuantityField;