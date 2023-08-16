const { expect } = require('chai');
const sinon = require('sinon');
const connection = require('../../../src/models/connection');
const { salesModel } = require('../../../src/models');
const { allSalesFromDB, saleFromDB, saleIdFromDB, newSalesFromModel, saleIdFromModel, deleteReturnFromDB } = require('../../mocks/sales.mock');

describe('Testes para a SALES MODEL:', function () {
  afterEach(function () {
    sinon.restore();
  });

  it('Recuperando todas as vendas com sucesso', async function () {
    sinon.stub(connection, 'execute').resolves([allSalesFromDB]);
    const sales = await salesModel.findAll();

    expect(sales).to.be.an('array');
    expect(sales).to.have.length(3);
    expect(sales).to.be.deep.equal(allSalesFromDB);
  });

  it('Recuperando sales por id com sucesso', async function () {
    sinon.stub(connection, 'execute').resolves([saleFromDB]);
    const inputData = 1;
    const sale = await salesModel.findById(inputData);

    expect(sale).to.be.an('array');
    expect(sale).to.have.length(2);
    expect(sale).to.be.deep.equal(saleFromDB);
  });

  it('Inserindo sales com sucesso', async function () {
    sinon.stub(connection, 'execute')
      .onFirstCall()
      .resolves([saleIdFromDB])
      .resolves();

    const saleId = await salesModel.insert(newSalesFromModel);

    expect(saleId).to.be.equal(saleIdFromModel);
  });

  it('Deletando sales com sucesso', async function () {
    sinon.stub(connection, 'execute')
      .resolves(deleteReturnFromDB);

    const saleId = 4;
    const result = await salesModel.exclude(saleId);

    expect(result[0].affectedRows).to.be.equal(1);
  });
});