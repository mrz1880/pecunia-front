describe("Logout User Use Case", () => {
  it("logout user", () => {
    cy.signIn()
    cy.contains("Logout").click()
  })
})
