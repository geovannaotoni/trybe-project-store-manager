const allProductsFromDB = [
  {
    id: 1,
    name: 'Martelo de Thor',
  },
  {
    id: 2,
    name: 'Traje de encolhimento',
  },
  {
    id: 3,
    name: 'Escudo do Capitão América',
  },
];

const productFromDB = {
  id: 1,
  name: 'Martelo de Thor',
};

const allProductsFromModel = [
  {
    id: 1,
    name: 'Martelo de Thor',
  },
  {
    id: 2,
    name: 'Traje de encolhimento',
  },
  {
    id: 3,
    name: 'Escudo do Capitão América',
  },
];

const productFromModel = {
  id: 1,
  name: 'Martelo de Thor',
};

const allProductsFromServiceSuccessful = {
  status: 'SUCCESSFUL',
  data: allProductsFromModel,
};

const productFromServiceSuccessful = {
  status: 'SUCCESSFUL',
  data: productFromModel,
};

const productFromServiceNotFound = { 
  status: 'NOT_FOUND', 
  data: { message: 'Product not found' },
};

const newProductFromModel = {
  id: 4,
  name: 'Anel do Lanterna Verde',
};

const productFromServiceCreated = {
  status: 'CREATED', 
  data: newProductFromModel,
};

const productIdFromDB = { insertId: 4 };
const productIdFromModel = 4;

const updateReturnFromDB = [
  {
    fieldCount: 0,
    affectedRows: 1,
    insertId: 0,
    info: 'Rows matched: 1  Changed: 1  Warnings: 0',
    serverStatus: 2,
    warningStatus: 0,
    changedRows: 1,
  },
  undefined,
];

const updatedProductFromModel = {
  id: 1,
  name: 'Martelo do Batman',
};

const productFromServiceUpdated = {
  status: 'SUCCESSFUL', 
  data: updatedProductFromModel,
};

const deleteReturnFromDB = [
  {
    fieldCount: 0,
    affectedRows: 1,
    insertId: 0,
    info: '',
    serverStatus: 2,
    warningStatus: 0,
  },
  undefined,
];

const productFromServiceDeleted = {
  status: 'DELETED',
};

const notDeletedReturnFromDB = [
  {
    fieldCount: 0,
    affectedRows: 0,
    insertId: 0,
    info: '',
    serverStatus: 2,
    warningStatus: 0,
  },
  undefined,
];

module.exports = {
  allProductsFromDB,
  productFromDB,
  allProductsFromModel,
  productFromModel,
  allProductsFromServiceSuccessful,
  productFromServiceSuccessful,
  productFromServiceNotFound,
  newProductFromModel,
  productFromServiceCreated,
  productIdFromDB,
  productIdFromModel,
  updateReturnFromDB,
  updatedProductFromModel,
  productFromServiceUpdated,
  deleteReturnFromDB,
  productFromServiceDeleted,
  notDeletedReturnFromDB,
};
