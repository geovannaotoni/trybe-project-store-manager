const { productsService } = require('../services');
const mapStatusHTTP = require('../utils/mapStatusHTTP');

const findAll = async (req, res) => {
  const { status, data } = await productsService.findAll();

  return res.status(mapStatusHTTP(status)).json(data);
};

const findById = async (req, res) => {
  const { id } = req.params;
  const { status, data } = await productsService.findById(id);

  return res.status(mapStatusHTTP(status)).json(data);
};

const createProduct = async (req, res) => {
  const { body } = req;
  const { status, data } = await productsService.createProduct(body);

  return res.status(mapStatusHTTP(status)).json(data);
};

const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { body } = req;
  const { status, data } = await productsService.updateProduct(body, id);

  return res.status(mapStatusHTTP(status)).json(data);
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;
  const { status, data } = await productsService.deleteProduct(id);

  if (data) {
    return res.status(mapStatusHTTP(status)).json(data);
  }
  return res.status(mapStatusHTTP(status)).end();
};

const searchProduct = async (req, res) => {
  const { q } = req.query;
  const { status, data } = await productsService.searchProduct(q);
  return res.status(mapStatusHTTP(status)).json(data);
};

module.exports = {
  findAll,
  findById,
  createProduct,
  updateProduct,
  deleteProduct,
  searchProduct,
};