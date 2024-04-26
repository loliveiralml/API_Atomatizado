//const { expect } = require("chai");
import parametros from '../Elementos/parametros'


const parm = new parametros;
describe('Retorna uma lista de objetos', () => {
  it('Deve retornar status 200 ao fazer uma solicitação GET', () => {
    cy.request('GET', parm.objetos)
      .then((response) => {
        expect(response.status).to.eq(200);
      });
  });
});

describe('Retorna uma lista especifia de objetos', () => {
  it('Deve retornar status 200 ao fazer uma solicitação GET', () => {
    cy.request('GET', parm.listobjetos)
      .then((response) => {
        expect(response.status).to.eq(200);
      });
  });
});

describe('Retorna um  objeto apenas', () => {
  it('Deve retornar status 200 ao fazer uma solicitação GET', () => {
    cy.request('GET', parm.especobjeto)
      .then((response) => {
        expect(response.status).to.eq(200);
      });
  });
});

describe('Teste da API POST', () => {
  it('Deve enviar dados para a API e retornar status 200', () => {
    const requestBody = {
      "name": "Apple MacBook Pro 16",
      "data": {
        "year": 2019,
        "price": 1849.99,
        "CPU model": "Intel Core i9",
        "Hard disk size": "1 TB"
      }
    }

    cy.request({
      method: 'POST',
      url: 'https://api.restful-api.dev/objects',
      body: requestBody,
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.data.price).equal(1849.99)

    });
  });
});


// Na automatização abaixo é utilizado um arquivo json para realizar a inserção de dados , originados no diretorio FIXTURE
describe('Inserção do produto com dados de JSON', () => {
  it('Deve adicionar um novo produto via API usando dados do arquivo JSON', () => {
    cy.fixture('inserirProduto.json').then((prod) => {
      // 'data' agora contém o conteúdo do arquivo JSON
      const novoProduto = prod;

      // Fazendo uma solicitação POST à API para adicionar um novo usuário
      cy.request({
        method: 'POST',
        url: parm.objetos,
        body: prod,
        headers: {
          'Content-Type': 'application/json'
        }
      }).then((response) => {
        // Verificando se a solicitação foi bem-sucedida
        cy.log(response)
        expect(response.status).to.eq(200); // 200 Created
        expect(response.body).to.have.property('name'); // Verifica se a resposta contém um name de produto
        expect(response.body).to.have.property('data'); // Verifica se a resposta contém uma estrutura data de produto

        expect(response.body.name).to.eq(novoProduto.name); // Verifica se a descrção do produto na resposta corresponde ao produto enviado
        expect(response.body.price).to.eq(novoProduto.price); // Verifica se o preço do produto  na resposta corresponde ao preço enviado
      });
    });
  });
});


// Na automatização abaixo é utilizado um arquivo json para realizar a atualização de dados , originados no diretorio FIXTURE
describe('Atualização de precos do produto com dados de JSON', () => {
  it('Deve atualizar os dados de precificação produto via API usando dados do arquivo JSON', () => {
    cy.fixture('updateProduto.json').then((updtprod) => {
      // 'data' agora contém o conteúdo do arquivo JSON
      const novoProduto = updtprod;

      // Fazendo uma solicitação POST à API para adicionar um novo usuário
      cy.request({
        method: 'PUT',
        url: parm.especobjeto,
        body: updtprod,
        headers: {
          'Content-Type': 'application/json'
        }
      }).then((response) => {
        // Verificando se a solicitação foi bem-sucedida
        cy.log(response.body)
        expect(response.status).to.eq(200); // 200 Created
        expect(response.body).to.have.property('name'); // Verifica se a resposta contém um name de produto
        expect(response.body).to.have.property('data'); // Verifica se a resposta contém uma estrutura data de produto

        expect(response.body.name).to.eq(novoProduto.name); // Verifica se a descrção do produto na resposta corresponde ao produto enviado
        expect(response.body.data.price).to.eq(novoProduto.data.price); // Verifica se o preço do produto  na resposta corresponde ao preço enviado

      });
    });
  });
});