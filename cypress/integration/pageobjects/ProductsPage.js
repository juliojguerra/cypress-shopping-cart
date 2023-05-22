class ProductsPage {
  getTitle(callback) {
    cy.get("h1").invoke("text").then(callback);
  }
}
export default ProductsPage;
