//user.router.js:
import { Router } from "express";
import userValidator from "../middlewares/userValidator.js";

import UserCntroller from "../controllers/user.controller.js"
const userController = new UserCntroller();

import ProdController from "../controllers/product.controllers.js"
const productController = new ProdController();

import addOwner from "../middlewares/addOwner.js";
import { verifyToken } from "../middlewares/verifyToken.js"

const router = Router();

//-------------------📌 USERS MAIN ROUTES
router
  //.get("/", userController.getAll)
  .get("/:id", userController.getById)
  .post("/", userController.create)
  .put("/:id", userController.update)
  .delete("/:id", userController.delete)

  //-------------------📌 ADMIN ROUTE
  //.get("/profile", verifyToken, userController.profile)
  .post("/createProd", addOwner, productController.create)
  .delete("/deleteProd/:id", productController.delete)
  .put("/updateProd/:id", productController.update)
  //-------------------📌 USERS ROUTES
  .post("/register", userValidator, userController.register)
  .post("/login", userController.login)
  
    
  //-------------------📌 DTO USER ROUTE
  //.get('/dto/:id', userController.getUserById)
  .get('/', userController.getAllUsers)

export default router;
