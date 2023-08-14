const express = require('express');
const { productsRoutes, salesRoutes } = require('./routes');

const app = express();
app.use(express.json());

// não remova esse endpoint, é para o avaliador funcionar
app.get('/', (_request, response) => {
  response.json({ status: 'Store Manager UP!' });
});

app.use('/products', productsRoutes);
app.use('/sales', salesRoutes);

module.exports = app;
