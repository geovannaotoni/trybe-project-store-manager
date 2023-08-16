const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const { salesService } = require('../../../src/services');
const { allSalesFromServiceSuccessful, allSalesFromModel, saleFromModel, saleFromServiceSuccessful, saleFromServiceNotFound, newSalesFromServiceCreated, newSalesFromModel, saleFromServiceDeleted } = require('../../mocks/sales.mock');
const { salesController } = require('../../../src/controllers');

const { expect } = chai;
chai.use(sinonChai);

describe('Testes para a SALES CONTROLLER:', function () {
  afterEach(function () {
    sinon.restore();
  });

  it('Recuperando todas as sales com sucesso - Status 200', async function () {
    sinon.stub(salesService, 'findAll').resolves(allSalesFromServiceSuccessful);

    const req = { params: { }, body: { } };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    await salesController.findAll(req, res);
    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(allSalesFromModel);
  });

  it('Recuperando sale por id com sucesso - Status 200', async function () {
    sinon.stub(salesService, 'findById').resolves(saleFromServiceSuccessful);

    const req = { params: { id: 1 }, body: { } };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    await salesController.findById(req, res);
    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(saleFromModel);
  });

  it('Não recupera sale com id inexistente - status 404', async function () {
    sinon.stub(salesService, 'findById').resolves(saleFromServiceNotFound);

    const req = { params: { id: 9999 }, body: { } };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    await salesController.findById(req, res);
    expect(res.status).to.have.been.calledWith(404);
    expect(res.json).to.have.been.calledWith(saleFromServiceNotFound.data);
  });

  it('Inserindo sales com sucesso - status 201', async function () {
    sinon.stub(salesService, 'createSales').resolves(newSalesFromServiceCreated);
    const req = { params: { }, body: newSalesFromModel };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    await salesController.createSales(req, res);
    expect(res.status).to.have.been.calledWith(201);
    expect(res.json).to.have.been.calledWith(newSalesFromServiceCreated.data);
  });

  it('Deletando sales por id com sucesso - Status 204', async function () {
    sinon.stub(salesService, 'deleteSales').resolves(saleFromServiceDeleted);
    const req = { params: { id: 1 }, body: { } };
    const res = {
      status: sinon.stub().returnsThis(),
      end: sinon.stub(),
    };

    await salesController.deleteSales(req, res);
    expect(res.status).to.have.been.calledWith(204);
    expect(res.end).to.have.been.calledWith();
  });

  it('Não deleta sales com id inexistente - Status 404', async function () {
    sinon.stub(salesService, 'deleteSales').resolves(saleFromServiceNotFound);
    const req = { params: { id: 9999 }, body: { } };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    await salesController.deleteSales(req, res);
    expect(res.status).to.have.been.calledWith(404);
    expect(res.json).to.have.been.calledWith({ message: 'Sale not found' });
  });
});