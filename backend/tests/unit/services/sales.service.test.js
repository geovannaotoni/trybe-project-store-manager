const { expect } = require('chai');
const sinon = require('sinon');
const { salesModel } = require('../../../src/models');
const { salesService } = require('../../../src/services');
const { allSalesFromModel, saleFromModel, newSalesFromModel, newSalesFromServiceCreated, saleIdFromModel } = require('../../mocks/sales.mock');

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
});