// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })


Cypress.Commands.add('logRequestResponse', (method, url, requestBody, response) => {
    cy.log(`Request Method: ${method}`);
    cy.log(`Request URL: ${url}`);
    cy.log(`Request Body: ${JSON.stringify(requestBody)}`);
    cy.log(`Response Status: ${response.status}`);
    cy.log(`Response Body: ${JSON.stringify(response.body)}`);
});          

Cypress.Commands.add('getToken', () =>{
    cy.request({
      url: Cypress.env('apiUrl')+ '/auth',
      method: 'POST',
      body: {
          username : 'admin',
          password : 'password123'
      }         
      }).then((response) => {
          expect(response.status).to.eq(200)
          const token = response.body.token
          cy.wrap(token).as('token')
        })
    })

