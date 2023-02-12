describe("Register User Use Case", () => {
  it("Register User", () => {
    cy.visit("/register")
    cy.get("#email").clear()
    cy.get("#email").type("newUser@pecunia.com")
    cy.get("#password").clear()
    cy.get("#password").type("cypress")
    cy.get("#passwordConfirmation").clear()
    cy.get("#passwordConfirmation").type("cypress")
    cy.get("button").click()
  })
})
