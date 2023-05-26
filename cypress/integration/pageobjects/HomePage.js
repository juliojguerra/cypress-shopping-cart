class HomePage {
  visitHomePage() {
    cy.visit(Cypress.env("url"));
  }

  selectCategory(gender, zone, category) {
    const GenderIdentifier = {
      Men: 1,
      Women: 0,
    };

    let identifier = GenderIdentifier[gender];

    cy.findByText(gender)
      .should("be.visible")
      .then((element) => {
        cy.wrap(element).realHover();
        cy.findAllByText(zone).eq(identifier).should("be.visible").realHover();
        cy.findAllByText(category).eq(identifier).should("be.visible").click();
      });
  }
}

export default HomePage;
