import { faker } from '@faker-js/faker';

//---------------------------- 📌 @FAKER
export const createRandomProd = () => {
  return {
    title: faker.commerce.product(),
    description: faker.commerce.productDescription(),
    code: faker.commerce.isbn(), // '978-0-692-82459-7',
    price: faker.commerce.price(),
    stock: faker.location.zipCode('####'),
    category: faker.lorem.word(),
    thumbnails: faker.image.url()
  };
};