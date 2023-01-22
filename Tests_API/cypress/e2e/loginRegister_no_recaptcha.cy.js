describe('Login test when recaptcha is not clicked.', () => {
  beforeEach(() => {
    cy.visit('https://localhost:44419/inloggen')
  })

  it('fills out login form and clicks reCAPTCHA', () => {
    cy.get('#email-input').type('testcypress')
    cy.get('#password-input').type('Cypress123!')

    cy.get('#login-button').click()
    cy.on('window:alert', (str) => {
      expect(str).to.eq("Druk alstublieft op 'Ik ben geen robot'. Mocht u de reCAPTCHA niet kunnen zien, herlaad dan de pagina.")
    });
  })
})

describe('Register test when recaptcha is not clicked.', () => {
  beforeEach(() => {
    cy.visit('https://localhost:44419/registreren')
  })

  it('fills out login form and clicks reCAPTCHA', () => {
    cy.get('#email-input').type('testcypress')
    cy.get('#password-input').type('Cypress123!')
    cy.get('.name').type('Cypress Naam')
    cy.get('.lastname').type('Cypress Achternaam')

    cy.get('#login-button').click()
    cy.on('window:alert', (str) => {
      expect(str).to.eq("Druk alstublieft op 'Ik ben geen robot'. Mocht u de reCAPTCHA niet kunnen zien, herlaad dan de pagina.")
    });
  })
})