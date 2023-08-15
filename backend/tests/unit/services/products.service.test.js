const { expect } = require('chai');
const sinon = require('sinon');
const { productsModel } = require('../../../src/models');
const { allProductsFromModel, productFromModel, productIdFromModel, newProductFromModel, updatedProductFromModel, updateReturnFromDB, deleteReturnFromDB, notDeletedReturnFromDB } = require('../../mocks/products.mock');
const { productsService } = require('../../../src/services');

describe('Testes para a PRODUCTS SERVICE:', function () {
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

  it('Alterando product com sucesso', async function () {
    sinon.stub(productsModel, 'findById')
      .onFirstCall()
      .resolves(productFromModel)
      .onSecondCall()
      .resolves(updatedProductFromModel);
    sinon.stub(productsModel, 'update').resolves(updateReturnFromDB);

    const productId = 1;
    const inputData = { name: 'Martelo do Batman' };
    const responseService = await productsService.updateProduct(inputData, productId);

    expect(responseService.status).to.equal('SUCCESSFUL');
    expect(responseService.data).to.deep.equal(updatedProductFromModel);
  });

  it('Não altera product se o tamanho do campo "name" for menor que 5 caracteres', async function () {
    sinon.stub(productsModel, 'findById')
      .resolves(undefined);

    const productId = 1;
    const inputData = { name: 'Martelo do Batman' };
    const responseService = await productsService.updateProduct(inputData, productId);
    expect(responseService.status).to.equal('NOT_FOUND');
    expect(responseService.data).to.deep.equal({ message: 'Product not found' });
  });

  it('Não altera product se o id recebido não existir', async function () {
    const productId = 9999;
    const inputData = { name: 'Anel' };
    const responseService = await productsService.updateProduct(inputData, productId);
    expect(responseService.status).to.equal('INVALID_VALUE');
    expect(responseService.data).to.deep.equal({ message: '"name" length must be at least 5 characters long' });
  });

  it('Deletando product com sucesso', async function () {
    sinon.stub(productsModel, 'exclude')
      .resolves(deleteReturnFromDB);

    const productId = 4;
    const responseService = await productsService.deleteProduct(productId);

    expect(responseService.status).to.equal('DELETED');
  });

  it('Não deleta product se o id recebido não existir', async function () {
    sinon.stub(productsModel, 'exclude')
      .resolves(notDeletedReturnFromDB);

    const productId = 4;
    const responseService = await productsService.deleteProduct(productId);

    expect(responseService.status).to.equal('NOT_FOUND');
    expect(responseService.data).to.deep.equal({ message: 'Product not found' });
  });
});