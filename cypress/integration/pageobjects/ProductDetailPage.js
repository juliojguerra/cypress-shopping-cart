class ProductDetailPage {
  getProductTitle(callback) {
    this.productTitle().invoke("text").then(callback);
  }

  checkout() {
    cy.get("#top-cart-btn-checkout").click();
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

  expectSuccessAlert(productName) {
    cy.get(".message-success").should("contain", `You added ${productName}`);
  }

  expectProductDetailsToInclude(productName) {
    cy.get(".product-item-details").should("contain", productName);
  }

  selectSize(size) {
    return this.productSize().contains(size).click();
  }

  selectColor() {
    return this.firstColor().click();
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

  firstColor() {
    return cy.get(".swatch-option.color:nth-child(1)");
  }

  productFieldset() {
    return cy.get(".box-tocart > .fieldset > .field");
  }

  cartButton() {
    return cy.get("#product-addtocart-button");
  }
}

export default ProductDetailPage;
