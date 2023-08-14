const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const { productsService } = require('../../../src/services');
const { allProductsFromServiceSuccessful, allProductsFromModel, productFromServiceSuccessful, productFromModel } = require('../../mocks/products.mock');
const { productsController } = require('../../../src/controllers');

const { expect } = chai;
chai.use(sinonChai);

describe('Testes para a PRODUCTS CONTROLLER:', function () {
  afterEach(function () {
    sinon.restore();
  });

  it('Recuperando todos os products com sucesso - Status 200', async function () {
    sinon.stub(productsService, 'findAll').resolves(allProductsFromServiceSuccessful);

    const req = { params: { }, body: { } };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    await productsController.findAll(req, res);
    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(allProductsFromModel);
  });

  it('Recuperando product por id com sucesso', async function () {
    sinon.stub(productsService, 'findById').resolves(productFromServiceSuccessful);

    const req = { params: { id: 1 }, body: { } };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    await productsController.findById(req, res);
    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(productFromModel);
  });
});