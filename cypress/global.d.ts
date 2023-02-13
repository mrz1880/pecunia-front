/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable {
    signIn(): void
  }
}
