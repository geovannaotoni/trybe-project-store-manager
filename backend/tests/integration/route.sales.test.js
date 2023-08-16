const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');
const app = require('../../src/app');
const { salesModel } = require('../../src/models');
const { allSalesFromDB, allSalesFromModel, saleFromDB, saleFromModel, newSalesFromServiceCreated, newSalesFromModel, saleIdFromDB } = require('../mocks/sales.mock');
const { salesService } = require('../../src/services');

chai.use(chaiHttp);
const { expect } = chai;

describe('Testes para a rota /products', function () {
  afterEach(function () {
    sinon.restore();
  });

  it('Usando o método GET em /sales - Retorna a lista completa de vendas!', async function () {
    sinon.stub(salesModel, 'findAll').resolves(allSalesFromDB);

    const response = await chai
      .request(app)
      .get('/sales');
    expect(response.status).to.be.equal(200);
    expect(response.body).to.deep.equal(allSalesFromModel);
    expect(response.body).to.have.lengthOf(3);
  });

  it('Usando o método GET em /sales/:id para buscar o ID 1', async function () {
    sinon.stub(salesModel, 'findById').resolves(saleFromDB);
    const response = await chai
      .request(app)
      .get('/sales/1');

    expect(response.status).to.be.equal(200);
    expect(response.body).to.deep.equal(saleFromModel);
  });

  it('Usando o método POST em /products para cadastrar um produto', async function () {
    sinon.stub(salesModel, 'insert').resolves(saleIdFromDB);
    sinon.stub(salesService, 'createSales').resolves(newSalesFromServiceCreated);
    const response = await chai
      .request(app)
      .post('/sales/')
      .send(newSalesFromModel);

    expect(response.status).to.be.equal(201);
    expect(response.body).to.deep.equal(newSalesFromServiceCreated.data);
  });

  it('Usando o método POST em /sales para cadastrar um produto sem a propriedade quantity', async function () {
    const response = await chai
      .request(app)
      .post('/sales/')
      .send([{ productId: 1 }]);

    expect(response.status).to.be.equal(400);
    expect(response.body).to.deep.equal({ message: '"quantity" is required' });
  });
});