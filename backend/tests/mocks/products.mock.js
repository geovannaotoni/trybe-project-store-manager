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

module.exports = {
  allProductsFromDB,
  productFromDB,
  allProductsFromModel,
  productFromModel,
  allProductsFromServiceSuccessful,
  productFromServiceSuccessful,
};
