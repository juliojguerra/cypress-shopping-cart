/// <reference types="Cypress" />
import HomePage from "../pageobjects/HomePage";
import ProductsPage from "../pageobjects/ProductsPage";
import ProductDetailPage from "../pageobjects/ProductDetailPage";
import ShippingPage from "../pageobjects/ShippingPage";
import SuccessPage from "../pageobjects/SuccessPage";
import { data } from "../../fixtures/testData";
import {
  contentEndPoint,
  getCartEndPoint,
  shippingPriceEndPoint,
  billingAddressEndPoint,
} from "../../fixtures/endpoints";

describe("Shopping Cart E2E", function () {
  it("Search and Shop an item", function () {
    // Cypress.config("defaultCommandTimeout", 8000);

    const homePage = new HomePage();

    cy.intercept("GET", contentEndPoint).as("getContent");

    homePage.visitHomePage();

    cy.wait("@getContent").its("response.statusCode").should("eq", 200);

    homePage.selectCategory(data.gender, data.zone, data.category);

    const productsPage = new ProductsPage();

    productsPage.expectTitleToInclude(data.category);

    const productDetailPage = new ProductDetailPage();

    const pathTimeout = 5000;

    cy.wait("@getContent").then(() => {
      productsPage.addProduct(data.productName);
      productDetailPage.expectPathToInclude(
        data.dashedProductName,
        pathTimeout
      );
    });

    productDetailPage.getProductTitle((productTitle) => {
      expect(productTitle).to.contain(data.productName);
    });

    productDetailPage.expectProductDetailsToBeVisible();

    productDetailPage.selectSize(data.productSize);
    productDetailPage.selectColor();
    productDetailPage.enterQuantity(data.qty);

    cy.intercept("GET", getCartEndPoint).as("getCart");

    productDetailPage.addProductToCart();

    cy.wait("@getCart", { timeout: 10000 }).then(({ response }) => {
      expect(response.statusCode).to.eq(200);

      productDetailPage.expectSuccessAlert(data.productName);
      productDetailPage.goToCart();
      productDetailPage.expectProductDetailsToInclude(data.productName);
      productDetailPage.checkout();
    });

    const shippingPage = new ShippingPage();

    cy.intercept("GET", shippingPriceEndPoint).as("getShippingMethodPrice");

    cy.wait("@getShippingMethodPrice", { timeout: 10000 }).then(() => {
      shippingPage.fillShippingForm(data.customer);

      shippingPage.clickNextButton();
    });

    cy.intercept(billingAddressEndPoint).as("billingAddressActions");

    cy.wait("@billingAddressActions", { timeout: 10000 }).then(() => {
      shippingPage.expectBillingAddressToBeVisible();
      shippingPage.selectShippingAddress();

      shippingPage.expectProductPriceToBeVisible(data.productPrice, data.qty);

      shippingPage.viewItems();

      shippingPage.expectItemsToInclude(data.productName, data.qty);

      shippingPage.viewDetails();

      shippingPage.expectViewDetailsToInclude(data.productSize);

      shippingPage.placeOrder();
    });

    const successPage = new SuccessPage();

    successPage.expectSuccessMessage();
  });
});
