const checkRequiredFields = require('../utils/checkRequiredFields');

const validateProductFields = (req, res, next) => {
  const { body } = req;
  const requiredProductFields = ['name'];

  const productError = checkRequiredFields(body, requiredProductFields);

  if (productError) {
    return res.status(400).json({ message: productError });
  }
  return next();
};

module.exports = validateProductFields;
