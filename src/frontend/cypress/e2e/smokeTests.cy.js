describe('template spec', () => {
  it('passes', () => {
    cy.visit('http://localhost:3000/')

    // Make sure we see "Sign In" text
    cy.contains('Sign In')
  })
})
