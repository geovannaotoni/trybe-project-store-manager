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

const saveSalesProducts = async (sales, salesId) => {
  // inserindo a venda e os produtos na tabela sales_products
  const query = 'INSERT INTO sales_products (sale_id, product_id, quantity) VALUES (?, ?, ?)';
  const insertPromises = sales
    .map(({ productId, quantity }) => connection.execute(query, [salesId, productId, quantity]));
  await Promise.all(insertPromises);
};

const insert = async (sales) => {
  // inserindo a venda na tabela sales
  const data = new Date();
  const query = 'INSERT INTO sales (date) VALUES (?);';
  const [{ insertId }] = await connection.execute(query, [data]);

  await saveSalesProducts(sales, insertId);

  return insertId;  
};

const exclude = async (id) => {
  const query = 'DELETE FROM sales WHERE id = ?';
  return connection.execute(query, [id]);
};

const updateQuantity = async (saleId, productId, quantity) => {
  const query = 'UPDATE sales_products SET quantity = ? WHERE sale_id = ? AND product_id = ?';
  return connection.execute(query, [quantity, saleId, productId]);
};

const findByProductAndSaleIds = async (saleId, productId) => {
  const query = `SELECT s.date, sp.product_id, sp.quantity, sp.sale_id 
  FROM sales s 
  INNER JOIN sales_products sp 
  ON s.id = sp.sale_id
  WHERE sp.sale_id = ? 
  AND sp.product_id = ?;`;
  const [[product]] = await connection.execute(query, [saleId, productId]);
  return camelize(product);
};

module.exports = {
  findAll,
  findById,
  insert,
  exclude,
  updateQuantity,
  findByProductAndSaleIds,
};