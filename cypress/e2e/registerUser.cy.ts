describe("Register User Use Case", () => {
  it("Register User", () => {
    cy.visit("/register")
    const userEmail = "newUser@pecunia.com"
    cy.get("[data-test='register-email-input']").clear().type(userEmail)
    const userPassword = "cypress"
    cy.get("[data-test='register-password-input']").clear().type(userPassword)
    cy.get("[data-test='register-passwordConfirmation-input']")
      .clear()
      .type(userPassword)
    cy.get("[data-test='register-submit-button']").click()
  })
})
