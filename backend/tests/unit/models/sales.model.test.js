const { expect } = require('chai');
const sinon = require('sinon');
const connection = require('../../../src/models/connection');
const { salesModel } = require('../../../src/models');
const { allSalesFromDB, saleFromDB } = require('../../mocks/sales.mock');

describe('Testes para a SALES MODEL:', function () {
  afterEach(function () {
    sinon.restore();
  });

  it('Recuperando todos as vendas com sucesso', async function () {
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
});