describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    // Create a new user in the backend
    cy.request('POST', 'http://localhost:3003/api/users', {
      username: 'bastiengouila',
      name: 'Bastien Gouila',
      password: 'password'
    });
    cy.visit('http://localhost:3000')
  })

  describe('Login',function() {

    it('Login form is shown', function() {
      cy.contains('login')
    })

    it('succeeds with correct credentials', function() {
      cy.contains('login').click()
      cy.get('#username-input').type('bastiengouila')
      cy.get('#password-input').type('password')
      cy.get('#login-button').click()

      cy.contains('Bastien Gouila logged in')
    })

    it('fails with wrong credentials', function() {
      cy.contains('login').click()
      cy.get('#username-input').type('bastiengouila')
      cy.get('#password-input').type('wrongpassword')
      cy.get('#login-button').click()

      cy.get('.error').should('contain', 'invalid username or password') 
      cy.get('.error').should('have.css', 'color', 'rgb(255, 0, 0)')
      cy.get('.error').should('have.css', 'border-style', 'solid')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'bastiengouila', password: 'password' })
    })

    it('A blog can be created', function() {
      cy.contains('create new blog').click()
      cy.get('#title-input').type('a blog created by cypress')
      cy.get('#author-input').type('cypress author')
      cy.get('#url-input').type('https://www.cypress.io/')
      cy.get('#submit-button').click()

      cy.visit('http://localhost:3000')
      cy.contains('a blog created by cypress')
      cy.contains('cypress author')
    })

  })

})
