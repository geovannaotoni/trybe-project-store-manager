const { expect } = require('chai');
const sinon = require('sinon');
const connection = require('../../../src/models/connection');
const { productsModel } = require('../../../src/models');
const { productFromDB, allProductsFromDB } = require('../../mocks/products.mock');

describe('Testes para a PRODUCTS MODEL:', function () {
  afterEach(function () {
    sinon.restore();
  });

  it('Recuperando todos os products com sucesso', async function () {
    sinon.stub(connection, 'execute').resolves([allProductsFromDB]);
    const products = await productsModel.findAll();

    expect(products).to.be.an('array');
    expect(products).to.have.length(3);
    expect(products).to.be.deep.equal(allProductsFromDB);
  });
  it('Recuperando product por id com sucesso', async function () {
    sinon.stub(connection, 'execute').resolves([[productFromDB]]);
    const inputData = 1;
    const product = await productsModel.findById(inputData);

    expect(product).to.be.an('object');
    expect(product).to.be.deep.equal(productFromDB);
  });
});