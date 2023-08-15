const productDate = '2023-08-14T21:51:46.000Z';

// obs: as vendas que chegam do banco de dados vem em snake_case, porém como o lint está habilitado para a pasta de mocks, estou colocando como camelCase aqui nos mocks
const allSalesFromDB = [
  {
    saleId: 1,
    date: productDate,
    productId: 1,
    quantity: 5,
  },
  {
    saleId: 1,
    date: productDate,
    productId: 2,
    quantity: 10,
  },
  {
    saleId: 2,
    date: productDate,
    productId: 3,
    quantity: 15,
  },
];

const saleFromDB = [
  {
    date: productDate,
    productId: 1,
    quantity: 5,
  },
  {
    date: productDate,
    productId: 2,
    quantity: 10,
  },
];

const allSalesFromModel = [
  {
    saleId: 1,
    date: productDate,
    productId: 1,
    quantity: 5,
  },
  {
    saleId: 1,
    date: productDate,
    productId: 2,
    quantity: 10,
  },
  {
    saleId: 2,
    date: productDate,
    productId: 3,
    quantity: 15,
  },
];

const saleFromModel = [
  {
    date: productDate,
    productId: 1,
    quantity: 5,
  },
  {
    date: productDate,
    productId: 2,
    quantity: 10,
  },
];

const allSalesFromServiceSuccessful = {
  status: 'SUCCESSFUL',
  data: allSalesFromModel,
};

const saleFromServiceSuccessful = {
  status: 'SUCCESSFUL',
  data: saleFromModel,
};

const saleFromServiceNotFound = { 
  status: 'NOT_FOUND', 
  data: { message: 'Sale not found' },
};

const newSalesFromModel = [
  {
    productId: 1,
    quantity: 1,
  },
  {
    productId: 2,
    quantity: 5,
  },
];

const newSalesFromServiceCreated = {
  status: 'CREATED',
  data: { id: 10, itemsSold: newSalesFromModel },
};

const saleIdFromDB = { insertId: 10 };
const saleIdFromModel = 10;

module.exports = {
  allSalesFromDB,
  saleFromDB,
  allSalesFromModel,
  saleFromModel,
  allSalesFromServiceSuccessful,
  saleFromServiceSuccessful,
  saleFromServiceNotFound,
  newSalesFromModel,
  newSalesFromServiceCreated,
  saleIdFromDB,
  saleIdFromModel,
};
