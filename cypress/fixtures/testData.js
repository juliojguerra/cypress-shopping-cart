import { faker } from "@faker-js/faker";

const cityAndState = faker.location.state();

const productsList = {
  "Jupiter All-Weather Trainer": 56.99,
  "Typhon Performance Fleece-lined Jacket": 60.0,
  "Montana Wind Jacket": 49.0,
  "Proteus Fitness Jackshirt": 45.0,
  "Mars HeatTech™ Pullover": 66.0,
  "Lando Gym Jacket": 99.0,
  "Kenobi Trail Jacket": 47.0,
  "Hyperion Elements Jacket": 51.0,
};

const productNames = Object.keys(productsList);
const randomIndex = Math.floor(Math.random() * productNames.length);
const randomProductName = productNames[randomIndex];

const dashedProductName = randomProductName
  .toLowerCase()
  .replace(/™/g, "-trade")
  .replace(/[^a-z0-9]/gi, "-");

export const data = {
  productName: randomProductName,
  dashedProductName: dashedProductName,
  gender: "Men",
  zone: "Tops",
  category: "Jackets",
  productSize: "M",
  productColor: "Green",
  qty: 2,
  productPrice: productsList[randomProductName],
  customer: {
    email: faker.internet.email(),
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    streetAddress: faker.location.streetAddress(),
    building: faker.location.buildingNumber(),
    apartment: faker.location.secondaryAddress(),
    city: cityAndState,
    state: cityAndState,
    zip: faker.location.zipCode(),
    country: "United States",
    phoneNumber: faker.phone.number("+1 55 ### ## ##"),
  },
};
