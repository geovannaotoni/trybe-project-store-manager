const camelize = require('camelize');
const connection = require('./connection');

const findAll = async () => {
  const [sales] = await connection.execute(`SELECT sp.sale_id, s.date, sp.product_id, sp.quantity 
  FROM sales s 
  INNER JOIN sales_products sp 
  ON s.id = sp.sale_id
  ORDER BY sale_id, product_id;`);
  return camelize(sales);
};

const findById = async (salesId) => {
  const [sales] = await connection.execute(`SELECT s.date, sp.product_id, sp.quantity 
  FROM sales s 
  INNER JOIN sales_products sp 
  ON s.id = sp.sale_id
  WHERE sp.sale_id = ? 
  ORDER BY sale_id, product_id;`, [salesId]);
  return camelize(sales);
};

module.exports = {
  findAll,
  findById,
};