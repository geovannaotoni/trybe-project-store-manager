const { salesService } = require('../services');
const mapStatusHTTP = require('../utils/mapStatusHTTP');

const findAll = async (req, res) => {
  const { status, data } = await salesService.findAll();

  return res.status(mapStatusHTTP(status)).json(data);
};

const findById = async (req, res) => {
  const { id } = req.params;
  const { status, data } = await salesService.findById(id);

  return res.status(mapStatusHTTP(status)).json(data);
};

const createSales = async (req, res) => {
  const { body } = req;
  const { status, data } = await salesService.createSales(body);

  return res.status(mapStatusHTTP(status)).json(data);
};

const deleteSales = async (req, res) => {
  const { id } = req.params;
  const { status, data } = await salesService.deleteSales(id);

  if (data) {
    return res.status(mapStatusHTTP(status)).json(data);
  }
  return res.status(mapStatusHTTP(status)).end();
};

module.exports = {
  findAll,
  findById,
  createSales,
  deleteSales,
};