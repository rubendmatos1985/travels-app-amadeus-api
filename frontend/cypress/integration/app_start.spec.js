describe('app start', () => {
  it('home as app start point', () => {
    cy.visit('localhost:8080')
    cy.url().should('include', 'home')
  })

  it('redirects to home if no registered endpoint is entered', () => {
    cy.visit('localhost:8080/yukjhgfdfghjklkjhgf')
    cy.url().should('include', 'home')
  })
})
