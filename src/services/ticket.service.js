import TicketMongoDao from "../persistence/daos/mongoDB/ticket/ticket.dao.js";
const ticketDao = new TicketMongoDao();
import UserMongoDao from "../persistence/daos/mongoDB/users/user.dao.js";
const userDao = new UserMongoDao();
import CartMongoDao from "../persistence/daos/mongoDB/cart/cart.dao.js";
const cartDao = new CartMongoDao();
import ProductMongoDao from "../persistence/daos/mongoDB/products/product.dao.js";
const prodDao = new ProductMongoDao();

import { v4 as uuidv4 } from 'uuid';

export const generateTicket = async (userId, cartId) => {
  try {
    
    const user = await userDao.getById(userId);
    if(!user) return false;
        
    const cart = await cartDao.getById(cartId);
    if(!cart) return false;
    
    let amountAcc = 0;
    for (const p of cart.products) {
      const idProd = p.product._id.toString();
      const prodFromDB = await prodDao.getById(idProd);
      
      //verifico si la cantidad que tengo en el carrito supera al stock del producto en db
      if(p.quantity <= prodFromDB.stock){
        const amount = p.quantity * prodFromDB.price;
        amountAcc += amount;
      }
    }
    
    //crear el ticket
    const ticket = await ticketDao.create({
      code: uuidv4(),
      purchase_datetime: new Date().toLocaleString(),
      amount: amountAcc,
      purchaser: user.email
    });

    //vaciar el cart
    cart.products = [];
    cart.save();

    //retornar el ticket
    return ticket;
  } catch (error) {
    throw new Error(error);
  }
};
