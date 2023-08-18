# :department_store: Projeto Store Manager
**API RESTful utilizando a arquitetura em camadas** <br>
Aplicação que consiste em um sistema de gerenciamento de vendas de produtos, no qual é possível visualizar, pesquisar, cadastrar, editar e excluir informações. O projeto desenvolveu uma API de um CRUD (Create, Read, Update e Delete) de produtos e vendas, e construiu endpoints que irão ler e modificar o banco de dados MySQL usado na gestão de dados. Também foram elaborados testes para garantir as funcionalidade das implementações.

## :computer: Visualize este projeto:
1. **Com o Doker:**
  - Instale as dependências: `npm install`
  - Inicie os containers: `docker-compose up -d`
  - Veja os logs da aplicação: `docker logs -n 10 -f store_manager`

2. **Sem Docker:**
  - Instale as dependências: `npm install`
  - Inicie os containers: `docker-compose up -d`
  - Inicie a aplicação: `npm run dev:local`

3. **Rodando os testes:**
  - `npm run test:mocha`: roda os testes do mocha
  - `npm run test:coverage`: mostra a cobertura geral dos testes
  - `npm run test:mutation`: mostra a cobertura de mutações (framework Stryker)

## :bulb: Habilidades:
**Endpoints Criadas:**
1. `GET /products` e `GET /products/:id`
2. `GET /sales` e `GET /sales/:id`
3. `POST /products`
4. `POST /sales`
5. `PUT /products/:id` (endpoint para atualizar o nome de um produto)
6. `DELETE /products/:id`
7. `DELETE /sales/:id`
8. `PUT /sales/:saleId/products/:productId/quantity` (endpoint para atualizar a quantidade de um produto em uma venda)
9. `GET /products/search` (com o parâmetro de consulta q=searchTerm)

Feito a partir dos conhecimentos de Docker, API REST com Express, CRUD, MySQL, Mocha, Chai, Sinon, Chai-http, Arquitetura em Camadas (Camadas Routes, Middlewares, Controller, Service e Model).