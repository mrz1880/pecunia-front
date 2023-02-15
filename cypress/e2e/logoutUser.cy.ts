describe("Logout User Use Case", () => {
  it("logout user", () => {
    cy.signIn()
    cy.get("[data-test='navbar-logout-link']").click()
  })
})
