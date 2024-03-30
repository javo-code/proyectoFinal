import Services from "./class.services.js";
import factory from "../persistence/daos/factory.js";
const { prodDao } = factory;

export default class ProductService extends Services {
  constructor() {
    super(prodDao);
  }
}
