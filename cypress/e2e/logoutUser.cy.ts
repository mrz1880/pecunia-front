describe("Logout User Use Case", () => {
  it("logout user", () => {
    cy.visit("/")
    cy.signIn()
    cy.contains("Logout").click()
  })
})
