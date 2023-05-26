class SuccessPage {
  expectSuccessMessage() {
    cy.get(".base").should("contain", "Thank you for your purchase!");
  }
}

export default SuccessPage;
