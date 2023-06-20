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

    it('Login form is shown but not blog list', function() {
      cy.contains('login')
      cy.get('.blog').should('not.exist')
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

    describe('and a blog exists', function () {
      beforeEach(function () {
        cy.createBlog({ title: 'a blog created by cypress', author: 'cypress author', url: 'https://www.cypress.io/' })
      })

      it('A blog can be liked', function () {
        cy.contains('view').click()
        cy.contains('like').click()
        cy.contains('likes 1')
      })

      it('A blog can be deleted by the user who created the blog', function () {
        cy.contains('view').click()
        cy.contains('remove').click()
        cy.get('.blog').should('not.exist')
      })

      it('A blog cannot be deleted by another user', function () {
        cy.contains('logout').click()
        cy.request('POST', 'http://localhost:3003/api/users', {
          username: 'anotheruser',
          name: 'Another User',
          password: 'password'
        });
        cy.login({ username: 'anotheruser', password: 'password' })
        cy.contains('view').click()
        cy.contains('remove').should('not.exist')
      })

    })

    it('Blogs are ordered according to likes with wait between clicks', function () {

      cy.createBlog({ title: 'a blog created by cypress 1', author: 'cypress author 1', url: 'https://www.cypress.io/blog1'})
      cy.createBlog({ title: 'a blog created by cypress 2', author: 'cypress author 1', url: 'https://www.cypress.io/blog2'})
      cy.createBlog({ title: 'a blog created by cypress 3', author: 'cypress author 2', url: 'https://www.cypress.io/blog3'})

      cy.get('.blog').then(blogs => {
        cy.wrap(blogs[0]).contains('view').click()
        cy.wrap(blogs[1]).contains('view').click()
        cy.wrap(blogs[2]).contains('view').click()

        // the wait is not necessary but it makes sure the likes are updated
        cy.wrap(blogs[0]).contains('like').click()
        cy.wait(200)
        cy.wrap(blogs[0]).contains('like').click()
        cy.wait(200)
        cy.wrap(blogs[1]).contains('like').click()
        cy.wait(200)
        cy.wrap(blogs[1]).contains('like').click()
        cy.wait(200)
        cy.wrap(blogs[1]).contains('like').click()
        cy.wait(200)
        cy.wrap(blogs[1]).contains('like').click()
        cy.wait(200)
        cy.wrap(blogs[1]).contains('like').click()
        cy.wait(200)
        cy.wrap(blogs[2]).contains('like').click()
        cy.wait(200)
        cy.wrap(blogs[2]).contains('like').click()
        cy.wait(200)
        cy.wrap(blogs[2]).contains('like').click()
        cy.wait(200)
      })
      cy.get('.blog').then(blogs => {
        cy.wrap(blogs[0]).contains('a blog created by cypress 2')
        cy.wrap(blogs[0]).contains('likes 5')
        cy.wrap(blogs[1]).contains('a blog created by cypress 3')
        cy.wrap(blogs[1]).contains('likes 3')
        cy.wrap(blogs[2]).contains('a blog created by cypress 1')
        cy.wrap(blogs[2]).contains('likes 2')
      })
    })

    it('Blogs are ordered according to likes no wait between clicks', function () {

      cy.createBlog({ title: 'a blog created by cypress 1', author: 'cypress author 1', url: 'https://www.cypress.io/blog1'})
      cy.createBlog({ title: 'a blog created by cypress 2', author: 'cypress author 1', url: 'https://www.cypress.io/blog2'})
      cy.createBlog({ title: 'a blog created by cypress 3', author: 'cypress author 2', url: 'https://www.cypress.io/blog3'})

      cy.get('.blog').then(blogs => {
        cy.wrap(blogs[0]).contains('view').click()
        cy.wrap(blogs[1]).contains('view').click()
        cy.wrap(blogs[2]).contains('view').click()

        cy.wrap(blogs[0]).contains('like').click()
        cy.wrap(blogs[0]).contains('like').click()
        cy.wrap(blogs[1]).contains('like').click()
        cy.wrap(blogs[1]).contains('like').click()
        cy.wrap(blogs[1]).contains('like').click()
        cy.wrap(blogs[1]).contains('like').click()
        cy.wrap(blogs[1]).contains('like').click()
        cy.wrap(blogs[2]).contains('like').click()
        cy.wrap(blogs[2]).contains('like').click()
        cy.wrap(blogs[2]).contains('like').click()
      })
      cy.get('.blog').then(blogs => {
        cy.wrap(blogs[0]).contains('a blog created by cypress 2')
        cy.wrap(blogs[0]).contains('likes 5')
        cy.wrap(blogs[1]).contains('a blog created by cypress 3')
        cy.wrap(blogs[1]).contains('likes 3')
        cy.wrap(blogs[2]).contains('a blog created by cypress 1')
        cy.wrap(blogs[2]).contains('likes 2')
      })
    })
  })

  describe('When logged out', function() {
    beforeEach(function() {
      cy.login({ username: 'bastiengouila', password: 'password' })
    })

    it('check if created blogs are not visible after user logged out', function() {
      cy.createBlog({ title: 'a blog created by cypress', author: 'cypress author', url: 'https://www.cypress.io/' })
      cy.contains('a blog created by cypress')
      cy.contains('cypress author')
      cy.contains('logout').click()

      cy.visit('http://localhost:3000')
      cy.get('.blog').should('not.exist')
      cy.contains('a blog created by cypress').should('not.exist')
      cy.contains('cypress author').should('not.exist')
    })

  })

})
