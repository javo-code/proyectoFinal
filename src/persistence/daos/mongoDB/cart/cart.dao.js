import MongoDao from "../mongo.dao.js";
import { CartModel } from "./cart.model.js";

export default class CartMongoDao extends MongoDao {
  constructor() {
    super(CartModel);
  }
  async addProdToCart(cartId, prodId) {    try {
      const cart = await this.model.findById(cartId);
      console.log(cart);
      if (!cart) return false;
      cart.products.push({ product: prodId });
      cart.save();
      return cart;
    } catch (error) {
        throw new Error(error.message);
    }
  }

  async removeProdToCart(cart, prod) {
    try {
      cart.products = cart.products.filter(
        (p) => p.product._id.toString() !== prod.product._id.toString()
      );
      cart.save();
      return cart;
    } catch (error) {
        throw new Error(error.message);
    }
  }

  
  async updateProdQuantityToCart(cart, prod, quantity) {
    try {
      prod.quantity = quantity;
      cart.save();
      return prod;
    } catch (error) {
        throw new Error(error.message);
    }
  }

  async clearCart(cart) {
    try {
      cart.products = [];
      cart.save();
      return cart;
    } catch (error) {
        throw new Error(error.message);
    }
  }
}
