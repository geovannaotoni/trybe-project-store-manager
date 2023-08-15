const { expect } = require('chai');
const sinon = require('sinon');
const { productsModel } = require('../../../src/models');
const { allProductsFromModel, productFromModel, productIdFromModel, newProductFromModel } = require('../../mocks/products.mock');
const { productsService } = require('../../../src/services');

describe('Testes para a PRODUCTS CONTROLLER:', function () {
  afterEach(function () {
    sinon.restore();
  });

  it('Recuperando todos os products com sucesso', async function () {
    sinon.stub(productsModel, 'findAll').resolves(allProductsFromModel);
    const responseService = await productsService.findAll();
    expect(responseService.status).to.equal('SUCCESSFUL');
    expect(responseService.data).to.deep.equal(allProductsFromModel);
  });

  it('Recuperando product por id com sucesso', async function () {
    sinon.stub(productsModel, 'findById').resolves(productFromModel);
    const inputData = 1;
    const responseService = await productsService.findById(inputData);
    expect(responseService.status).to.equal('SUCCESSFUL');
    expect(responseService.data).to.deep.equal(productFromModel);
  });

  it('Não recupera product com id inexistente', async function () {
    sinon.stub(productsModel, 'findById').resolves(undefined);
    const inputData = 9999;
    const responseService = await productsService.findById(inputData);
    expect(responseService.status).to.equal('NOT_FOUND');
    expect(responseService.data).to.deep.equal({ message: 'Product not found' });
  });

  it('Inserindo product com sucesso', async function () {
    sinon.stub(productsModel, 'insert').resolves(productIdFromModel);
    sinon.stub(productsModel, 'findById').resolves(newProductFromModel);
    const inputData = { name: 'Anel do Lanterna Verde' };
    const responseService = await productsService.createProduct(inputData);
    expect(responseService.status).to.equal('CREATED');
    expect(responseService.data).to.deep.equal(newProductFromModel);
  });

  it('Não insere product se o tamanho do campo "name" for menor que 5 caracteres', async function () {
    const inputData = { name: 'Anel' };
    const responseService = await productsService.createProduct(inputData);
    expect(responseService.status).to.equal('INVALID_VALUE');
    expect(responseService.data).to.deep.equal({ message: '"name" length must be at least 5 characters long' });
  });
});