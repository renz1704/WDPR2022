describe('User can navigate through pages', () => {
    it('passes', () => {
        cy.viewport(1920, 1080)
      cy.visit('https://localhost:44419')
            cy.get('#voorstellingen').click()
      cy.url().should('include', '/voorstellingen')
            cy.get('#toegankelijkheid').click()
      cy.url().should('include', '/toegankelijkheid')
            cy.get('#contactgegevens').click()
      cy.url().should('include', '/contactgegevens')
            cy.get('#inloggen').click()
      cy.url().should('include', '/inloggen')
            cy.get('#registreren').click()
      cy.url().should('include', '/registreren')
            cy.visit('https://localhost:44419')
      cy.get('#facebook').click()
      
    })
  })