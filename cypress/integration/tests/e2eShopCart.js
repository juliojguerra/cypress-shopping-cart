/// <reference types="Cypress" />
import HomePage from "../pageobjects/HomePage";
import ProductsPage from "../pageobjects/ProductsPage";

describe("Shopping Cart E2E", function () {
  it("Search and Shop an item", function () {
    Cypress.config("defaultCommandTimeout", 7000);
    const data = {
      productName: "Typhon Performance Fleece-lined Jacket",
      gender: "Men",
      zone: "Tops",
      category: "Jackets",
    };

    const homePage = new HomePage();

    homePage.visitHomePage();
    homePage.selectCategory(data.gender, data.zone, data.category);

    const productsPage = new ProductsPage();

    productsPage.getTitle((title) => {
      expect(title).to.contain(data.category);
    });

    cy.get(".product-item").should("be.visible");

    cy.wait("@getContent").then(() => {
      const productName = "Typhon Performance Fleece-lined Jacket";

      cy.get(".product-item").each((productCard, index, list) => {
        if (productCard.text().includes(productName)) {
          cy.log(productCard);
          cy.wrap(productCard)
            .realHover({ position: "bottomLeft" })
            .within(() => {
              cy.get(".action.tocart.primary")
                .invoke("removeAttr", "style")
                .click({ force: true });
            });
        }
      });

      cy.get(".base").contains(productName).should("be.visible");
    });

    cy.pause();
  });
});
