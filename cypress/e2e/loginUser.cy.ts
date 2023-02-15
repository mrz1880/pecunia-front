describe("Login User Use Case", () => {
  it("login user", () => {
    cy.signIn()
    cy.url().should("include", "/")
  })
})
