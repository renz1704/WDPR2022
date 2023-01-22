describe('different size screens', () => {
    it('passes', () => {
        cy.visit('https://localhost:44419')

        // Small phone
        cy.viewport(320, 480)
        cy.get('header').should('be.visible')
        cy.scrollTo('bottom')
        cy.wait(1000)
        cy.get('#facebook').should('be.visible')
        cy.get('.main-footer').should('be.visible')
        
        // Ipad
        cy.viewport(768, 1024)
        cy.get('header').should('be.visible')
        cy.scrollTo('bottom')
        cy.wait(1000)
        cy.get('#facebook').should('be.visible')
        cy.get('.main-footer').should('be.visible')

        //PC screen
        cy.viewport(1920, 1080)
        cy.get('header').should('be.visible')
        cy.scrollTo('bottom')
        cy.wait(1000)
        cy.get('#facebook').should('be.visible')
        cy.get('.main-footer').should('be.visible')

    })
})