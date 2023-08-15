const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const { productsService } = require('../../../src/services');
const { allProductsFromServiceSuccessful, allProductsFromModel, productFromServiceSuccessful, productFromModel, productFromServiceNotFound, productFromServiceCreated, newProductFromModel, updatedProductFromModel, productFromServiceUpdated, productFromServiceDeleted } = require('../../mocks/products.mock');
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

  it('Recuperando product por id com sucesso - Status 200', async function () {
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

  it('Não recupera product com id inexistente - status 404', async function () {
    sinon.stub(productsService, 'findById').resolves(productFromServiceNotFound);

    const req = { params: { id: 9999 }, body: { } };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    await productsController.findById(req, res);
    expect(res.status).to.have.been.calledWith(404);
    expect(res.json).to.have.been.calledWith(productFromServiceNotFound.data);
  });

  it('Inserindo product com sucesso - status 201', async function () {
    sinon.stub(productsService, 'createProduct').resolves(productFromServiceCreated);
    const req = { params: { }, body: { name: 'Anel do Lanterna Verde' } };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    await productsController.createProduct(req, res);
    expect(res.status).to.have.been.calledWith(201);
    expect(res.json).to.have.been.calledWith(newProductFromModel);
  });

  it('Alterando product por id com sucesso - Status 200', async function () {
    sinon.stub(productsService, 'updateProduct').resolves(productFromServiceUpdated);
    const req = { params: { id: 1 }, body: { name: 'Martelo do Batman' } };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    await productsController.updateProduct(req, res);
    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(updatedProductFromModel);
  });

  it('Deletando product por id com sucesso - Status 204', async function () {
    sinon.stub(productsService, 'deleteProduct').resolves(productFromServiceDeleted);
    const req = { params: { id: 1 }, body: { } };
    const res = {
      status: sinon.stub().returnsThis(),
      end: sinon.stub(),
    };

    await productsController.deleteProduct(req, res);
    expect(res.status).to.have.been.calledWith(204);
    expect(res.end).to.have.been.calledWith();
  });

  it('Não deleta product com id inexistente - Status 404', async function () {
    sinon.stub(productsService, 'deleteProduct').resolves(productFromServiceNotFound);
    const req = { params: { id: 1 }, body: { } };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    await productsController.deleteProduct(req, res);
    expect(res.status).to.have.been.calledWith(404);
    expect(res.json).to.have.been.calledWith({ message: 'Product not found' });
  });
});