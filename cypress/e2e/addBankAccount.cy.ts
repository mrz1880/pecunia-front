describe("Add Bank Account Use Case", () => {
  it("add bank account", () => {
    cy.signIn()
    cy.get("[data-test='navbar-bankAccount-link']").click()
    const nomDuCompteBancaire = "nom du compte bancaire"
    cy.get("[data-test='bankAccount-name-input']")
      .clear()
      .type(nomDuCompteBancaire)
    cy.get("[data-test='bankAccount-submit-button']").click()
    cy.get("[data-test='bankAccount-list-ul']")
      .first()
      .contains(nomDuCompteBancaire)
      .should("exist")
  })
})
