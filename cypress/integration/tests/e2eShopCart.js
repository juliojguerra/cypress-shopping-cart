/// <reference types="Cypress" />

describe("Shopping Cart E2E", function () {
  it("Search and Shop an item", function () {
    cy.intercept(
      "GET",
      "**/pub/static/version*/frontend/Magento/luma/en_US/Magento_Checkout/template/minicart/content.html"
    ).as("getContent");

    cy.visit(Cypress.env("url"));

    cy.wait("@getContent").its("response.statusCode").should("eq", 200);

    // Wait until the 'Men' item is visible and interactive
    cy.findByText("Men")
      .should("be.visible")
      .then(($men) => {
        cy.wrap($men).trigger("mouseover");
        // Now the "Men" dropdown should be displayed. You can interact with the items here
        //cy.contains("Tops").should("be.visible").click();
        //cy.contains("Tops").trigger("mouseover", { force: true });
        //cy.contains("Tops").realHover();
        cy.get("#ui-id-17").realHover();
        cy.get("#ui-id-19").click({ force: true });
      });
  });
});
