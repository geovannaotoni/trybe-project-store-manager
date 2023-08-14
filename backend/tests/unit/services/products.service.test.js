const { expect } = require('chai');
const sinon = require('sinon');
const { productsModel } = require('../../../src/models');
const { allProductsFromModel, productFromModel } = require('../../mocks/products.mock');
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
});