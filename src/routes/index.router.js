//index.router.js:
import { Router } from "express";

import cartRouter from "./cart.router.js";
import productRouter from "./product.router.js";
import ticketRouter from "./ticket.router.js";
import userRouter from "./users.router.js";
import emailRouter from "./email.router.js";



export default class ApiRouter {
  constructor() {
    this.router = Router();
    this.initRoutes();
  }

  initRoutes() {
    this.router.use("/products", productRouter);
    this.router.use("/users", userRouter);
    this.router.use("/carts", cartRouter);
    this.router.use('/mail', emailRouter);      
    this.router.use("/ticket", ticketRouter);
  }

  getRouter() {
    return this.router;
  }

}
