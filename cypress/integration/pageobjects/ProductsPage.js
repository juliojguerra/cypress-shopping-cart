class ProductsPage {
  getTitle(callback) {
    cy.get("h1").invoke("text").then(callback);
  }

  addProduct(productName) {
    cy.get(".product-item").each((productCard, index, list) => {
      if (productCard.text().includes(productName)) {
        cy.wrap(productCard)
          .realHover({ position: "bottomLeft" })
          .within(() => {
            cy.get(".action.tocart.primary")
              .invoke("removeAttr", "style")
              .click({ force: true });
          });
      }
    });
  }

  expectTitleToInclude(category) {
    this.getTitle((title) => {
      expect(title).to.contain(category);
    });
  }
}
export default ProductsPage;
