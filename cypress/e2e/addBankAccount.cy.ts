describe("Add Bank Account Use Case", () => {
  it("add bank account", () => {
    cy.signIn()
    cy.get('[aria-current="false"] > a').click()
    cy.get("#name").clear()
    cy.get("#name").type("nom du compte bancaire")
    cy.get("button").click()
    cy.get(":nth-child(2) > ul > li").click()
  })
})
