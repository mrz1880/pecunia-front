describe("Add Bank Account Use Case", () => {
  it("add bank account", () => {
    cy.signIn()
    cy.get("[data-test='navbar-bankAccount-link']").click()
    cy.get("[data-test='bankAccount-name-input']")
      .clear()
      .type("nom du compte bancaire")
    cy.get("[data-test='bankAccount-submit-button']").click()
    cy.get("[data-test='bankAccount-list-ul']")
      .first()
      .contains("nom du compte bancaire")
      .should("exist")
  })
})
