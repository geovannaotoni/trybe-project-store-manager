const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');
const app = require('../../src/app');
const { allProductsFromModel, allProductsFromDB, productFromModel, productFromDB, productIdFromDB, newProductFromModel, productFromServiceCreated } = require('../mocks/products.mock');
const { productsModel } = require('../../src/models');
const { productsService } = require('../../src/services');

chai.use(chaiHttp);
const { expect } = chai;

describe('Testes para a rota /products', function () {
  afterEach(function () {
    sinon.restore();
  });

  it('Usando o método GET em /products - Retorna a lista completa de produtos!', async function () {
    sinon.stub(productsModel, 'findAll').resolves(allProductsFromDB);

    const response = await chai
      .request(app)
      .get('/products');
    expect(response.status).to.be.equal(200);
    expect(response.body).to.deep.equal(allProductsFromModel);
    expect(response.body).to.have.lengthOf(3);
  });

  it('Usando o método GET em /products/:id para buscar o ID 1', async function () {
    sinon.stub(productsModel, 'findById').resolves(productFromDB);
    const response = await chai
      .request(app)
      .get('/products/1');

    expect(response.status).to.be.equal(200);
    expect(response.body).to.deep.equal(productFromModel);
  });

  it('Usando o método POST em /products para cadastrar um produto', async function () {
    sinon.stub(productsModel, 'insert').resolves(productIdFromDB);
    sinon.stub(productsService, 'createProduct').resolves(productFromServiceCreated);
    const response = await chai
      .request(app)
      .post('/products/')
      .send({ name: 'Anel do Lanterna Verde' });

    expect(response.status).to.be.equal(201);
    expect(response.body).to.deep.equal(newProductFromModel);
  });

  it('Usando o método POST em /products para cadastrar um produto sem a propriedade name', async function () {
    const response = await chai
      .request(app)
      .post('/products/')
      .send({ });

    expect(response.status).to.be.equal(400);
    expect(response.body).to.deep.equal({ message: '"name" is required' });
  });
});