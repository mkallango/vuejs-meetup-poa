// https://docs.cypress.io/api/introduction/api.html

describe('Test GUI', () => {
  const username = 'mikaelhadler';

  beforeEach(() => {    
    cy.visit('http://localhost:8080/users/');
    cy.contains('h1', 'Welcome to github playground api :)');
    cy.get('input[placeholder="Your github username"]').type(username);
    cy.get('button').click();
  });

  it('Validate that search field does exists and is visible', () => {
    cy.get('input.input').should('be.visible').should('be.empty');
  });

  it('Validate that User Name is displayed', () => {
    cy.get('div.media-content p.title').should('be.visible').contains('Mikael Hadler');
  });

  it('Validate that User name is displayed below image', () => {
    cy.get('div.card-content p.title').should('be.visible');
  });

  it('Validate that has a link to GitHub user Page', () => {
    cy.get(`a[href="https://github.com/${username}"]`).should('be.visible');
  });

  it('Validate that has a link to Repositories', () => {
    cy.get(`a[href="https://api.github.com/users/${username}/repos"]`).should('be.visible');
  });

  it('Validate that has a link to Followers', () => {
    cy.get(`a[href="https://api.github.com/users/${username}/followers\{/other_user\}"]`).should('be.visible');
  });

  it('Validate that has a link to Following', () => {
    cy.get(`a[href="https://api.github.com/users/${username}/following\{/other_user\}"]`).should('be.visible');
  });
});
