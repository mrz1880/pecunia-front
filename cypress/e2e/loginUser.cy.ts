describe("Login User Use Case", () => {
  it("login user", () => {
    cy.visit("/login")
    cy.get("#email").clear()
    cy.get("#email").type("cypress@pecunia.com")
    cy.get("#password").clear()
    cy.get("#password").type("cypress")
    cy.get("button").click()
  })
})
