const { expect } = require('chai');
const sinon = require('sinon');
const connection = require('../../../src/models/connection');
const { productsModel } = require('../../../src/models');
const { productFromDB, allProductsFromDB, productIdFromDB, productIdFromModel, updateReturnFromDB, deleteReturnFromDB } = require('../../mocks/products.mock');

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

  it('Inserindo product com sucesso', async function () {
    sinon.stub(connection, 'execute').resolves([productIdFromDB]);
    const inputData = { name: 'Anel do Lanterna Verde' };
    const productId = await productsModel.insert(inputData);

    expect(productId).to.be.equal(productIdFromModel);
  });

  it('Alterando product com sucesso', async function () {
    sinon.stub(connection, 'execute').resolves(updateReturnFromDB);

    const productId = 1;
    const inputData = { name: 'Martelo do Batman' };
    const result = await productsModel.update(inputData, productId);

    expect(result[0].affectedRows).to.be.equal(1);
    expect(result[0].changedRows).to.be.equal(1);
  });

  it('Deletando product com sucesso', async function () {
    sinon.stub(connection, 'execute').resolves(deleteReturnFromDB);

    const productId = 4;
    const result = await productsModel.exclude(productId);

    expect(result[0].affectedRows).to.be.equal(1);
  });
});