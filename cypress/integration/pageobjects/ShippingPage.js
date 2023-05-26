class ShippingPage {
  fillShippingForm(customerData) {
    cy.get("[id='customer-email']").first().type(customerData.email);
    cy.findByLabelText("First Name").type(customerData.firstName);
    cy.findByLabelText("Last Name").type(customerData.lastName);

    cy.get("input[name='street[0]']").type(customerData.streetAddress);
    cy.get("input[name='street[1]']").type(customerData.building);
    cy.get("input[name='street[2]']").type(customerData.apartment);

    cy.findByLabelText("City").first().clear().type(customerData.city);
    cy.get("select.select[name='region_id']")
      .first()
      .select(customerData.state);
    cy.findByLabelText("Zip/Postal Code").first().type(customerData.zip);
    cy.get("select.select[name='country_id']")
      .first()
      .select(customerData.country);
    cy.findByLabelText("Phone Number")
      .first()
      .clear()
      .type(customerData.phoneNumber);
    cy.get("#checkout-shipping-method-load input[type='radio']")
      .first()
      .check();
  }

  clickNextButton() {
    cy.get(".button").click();
  }

  selectShippingAddress() {
    cy.get("#billing-address-same-as-shipping-checkmo").click();
  }

  viewItems() {
    cy.get(".block > .title").click();
  }

  viewDetails() {
    cy.findByText("View Details").click();
  }

  placeOrder() {
    cy.contains("Place Order").click();
  }

  expectBillingAddressToBeVisible() {
    cy.get("#billing-address-same-as-shipping-checkmo").should("be.visible");
  }

  expectProductPriceToBeVisible(productPrice, qty) {
    const totalPrice = productPrice * qty;
    cy.get("strong > .price").should("contain", totalPrice);
  }

  expectItemsToInclude(productName, qty) {
    cy.get(".product-item-name").should("contain", productName);
    cy.get(".details-qty .value").should("contain", qty);
  }

  expectViewDetailsToInclude(productSize) {
    cy.get(".item-options dd.values")
      .invoke("text")
      .then((values) => {
        expect(values).to.include(productSize);
      });
  }
}

export default ShippingPage;
