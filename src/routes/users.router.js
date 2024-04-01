//user.router.js:
import { Router } from "express";
import userValidator from "../middlewares/userValidator.js";

import UserCntroller from "../controllers/user.controller.js"
const userController = new UserCntroller();

import ProdController from "../controllers/product.controllers.js"
const productController = new ProdController();

import { verifyToken } from "../middlewares/verifyToken.js";

const router = Router();

//-------------------📌 USERS ROUTES
router
  //.get("/", userController.getAll)
  .get('/', userController.getAllUsers)
  .put("/:id", userController.update)
  .delete("/:id", userController.delete)
  .get("/profile", verifyToken, userController.profile)
  .delete("/delete", userController.deleteInactives)
  .get("/info", userController.infoSession)
  .post("/register", userValidator, userController.register)
  .post("/login", userController.login)
  .get('/logout', userController.logout)
  //-------------------📌 ADMIN ROUTE
  .post("/createProd", productController.create)
  

export default router;
