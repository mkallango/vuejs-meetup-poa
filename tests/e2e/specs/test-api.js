// https://docs.cypress.io/api/introduction/api.html

describe('Test API', () => {
  const cepValido = {
    "cep": "90820-120",
    "logradouro": "Rua Itapitocaí",
    "complemento": "",
    "bairro": "Cristal",
    "localidade": "Porto Alegre",
    "uf": "RS",
    "unidade": "",
    "ibge": "4314902",
    "gia": ""
  }

  const cepInvalido = {"erro": true}

  const getCEPInfo = (cep) =>
    cy.request('https://viacep.com.br/ws/' + cep + '/json')

  const getCEPBody = (cep) =>
    cy.request('https://viacep.com.br/ws/' + cep + '/json')
    .its('body')

  const getCEPError = (cep) =>
    cy.request({
      method: 'GET',
      url: 'https://viacep.com.br/ws/' + cep + '/json',
      failOnStatusCode: false
    })
    .its('status')

  it('CEP Válido', () => {
    getCEPBody(90820120).should('deep.eq', cepValido)
  })

  it('CEP Inválido', () => {
    getCEPBody(98989898).should('deep.eq', cepInvalido)
  })

  it('CEP incompleto', () => {
    getCEPError(98989).should('deep.eq', 400)
  })

  it('Valida estrutura', () => {
    getCEPInfo(90820120).then((response) => {
      expect(response.body).to.have.property('cep')
      expect(response.body).to.have.property('logradouro')
      expect(response.body).to.have.property('complemento')
      expect(response.body).to.have.property('bairro')
      expect(response.body).to.have.property('localidade')
      expect(response.body).to.have.property('uf')
      expect(response.body).to.have.property('unidade')
      expect(response.body).to.have.property('ibge')
      expect(response.body).to.have.property('gia')
    })
  })

});
