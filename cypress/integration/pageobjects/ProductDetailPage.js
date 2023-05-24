class ProductDetailPage {
  getProductTitle(callback) {
    this.productTitle().invoke("text").then(callback);
  }

  expectPathToInclude(str, timeout) {
    cy.location({ timeout: timeout }).should((location) => {
      expect(location.pathname).to.include(str);
    });
  }

  expectProductDetailsToBeVisible() {
    this.productSize().should("be.visible");
    this.productColors().should("be.visible");
    this.productFieldset().should("be.visible");
    this.cartButton().should("be.visible");
  }

  selectSize(size) {
    return this.productSize().contains(size).click();
  }

  selectColor(color) {
    return cy.get(`[aria-label='${color}']`).click();
  }

  enterQuantity(qty) {
    cy.findByTitle("Qty").clear().type(qty);
  }

  addProductToCart() {
    this.cartButton().click();
  }

  goToCart() {
    cy.get(".showcart").click();
  }

  productTitle() {
    return cy.get(".base");
  }

  productSize() {
    return cy.get(".size");
  }

  productColors() {
    return cy.get(".swatch-attribute.color > .swatch-attribute-options");
  }

  productFieldset() {
    return cy.get(".box-tocart > .fieldset > .field");
  }

  cartButton() {
    return cy.get("#product-addtocart-button");
  }
}

export default ProductDetailPage;
