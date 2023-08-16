const { expect } = require('chai');
const sinon = require('sinon');
const { salesModel } = require('../../../src/models');
const { salesService } = require('../../../src/services');
const { allSalesFromModel, saleFromModel, newSalesFromModel, newSalesFromServiceCreated, saleIdFromModel, deleteReturnFromDB, notDeletedReturnFromDB } = require('../../mocks/sales.mock');

describe('Testes para a SALES SERVICE:', function () {
  afterEach(function () {
    sinon.restore();
  });

  it('Recuperando todos as vendas com sucesso', async function () {
    sinon.stub(salesModel, 'findAll').resolves(allSalesFromModel);
    const responseService = await salesService.findAll();
    expect(responseService.status).to.equal('SUCCESSFUL');
    expect(responseService.data).to.deep.equal(allSalesFromModel);
  });

  it('Recuperando venda por id com sucesso', async function () {
    sinon.stub(salesModel, 'findById').resolves(saleFromModel);
    const inputData = 1;
    const responseService = await salesService.findById(inputData);
    expect(responseService.status).to.equal('SUCCESSFUL');
    expect(responseService.data).to.deep.equal(saleFromModel);
  });

  it('Não recupera venda com id inexistente', async function () {
    sinon.stub(salesModel, 'findById').resolves([]);
    const inputData = 9999;
    const responseService = await salesService.findById(inputData);
    expect(responseService.status).to.equal('NOT_FOUND');
    expect(responseService.data).to.deep.equal({ message: 'Sale not found' });
  });

  it('Inserindo vendas com sucesso', async function () {
    sinon.stub(salesModel, 'insert').resolves(saleIdFromModel);
    sinon.stub(salesModel, 'findById').resolves(newSalesFromModel);

    const responseService = await salesService.createSales(newSalesFromModel);

    expect(responseService.status).to.equal('CREATED');
    expect(responseService.data).to.deep.equal(newSalesFromServiceCreated.data);
  });

  it('Não insere a venda se o campo quantity for menor que 1', async function () {
    const inputData = [
      { productId: 1, quantity: 0 },
    ];
    const responseService = await salesService.createSales(inputData);

    expect(responseService.status).to.equal('INVALID_VALUE');
    expect(responseService.data).to.deep.equal({ message: '"quantity" must be greater than or equal to 1' });
  });

  it('Não insere a venda se o productId for inválido', async function () {
    sinon.stub(salesModel, 'findById').resolves(undefined);

    const inputData = [
      { productId: 9999, quantity: 1 },
    ];
    const responseService = await salesService.createSales(inputData);

    expect(responseService.status).to.equal('NOT_FOUND');
    expect(responseService.data).to.deep.equal({ message: 'Product not found' });
  });

  it('Deletando a venda com sucesso', async function () {
    sinon.stub(salesModel, 'exclude')
      .resolves(deleteReturnFromDB);

    const productId = 4;
    const responseService = await salesService.deleteSales(productId);

    expect(responseService.status).to.equal('DELETED');
  });

  it('Não deleta sale se o id recebido não existir', async function () {
    sinon.stub(salesModel, 'exclude')
      .resolves(notDeletedReturnFromDB);

    const productId = 9999;
    const responseService = await salesService.deleteSales(productId);

    expect(responseService.status).to.equal('NOT_FOUND');
    expect(responseService.data).to.deep.equal({ message: 'Sale not found' });
  });
});