import { Router } from "express";
import { verifyToken } from "../middlewares/verifyToken.js";
import { authorizeUser, authorizeAdmin } from "../middlewares/authRol.js"
import userValidator from "../middlewares/userValidator.js";

import UserCntroller from "../controllers/user.controller.js"
const userController = new UserCntroller();

import ProdController from "../controllers/product.controllers.js"
const productController = new ProdController();

import { logger } from "../utils/logger.winston.js";

const router = Router();

//-------------------📌 USERS MAIN ROUTES
router
  //.get("/", userController.getAll)
  //.get("/:id", userController.getById)
  .post("/", userController.create)
  .put("/:id", userController.update)
  .delete("/:id", userController.delete)

  //-------------------📌 ADMIN ROUTE
  .post("/createProd", authorizeAdmin, productController.create)
  .delete("/deleteProd/:id", authorizeAdmin, productController.delete)
  .put("/updateProd/:id", authorizeAdmin, productController.update)
  //-------------------📌 USERS ROUTES
  .post("/register", userValidator, userController.register)
  .post("/login", userController.login)
  .get("/private", verifyToken, (req, res) => {
    const { first_name, last_name, email, role } = req.user;
    res.json({
      status: "success",
      userData: {
        first_name,
        last_name,
        email,
        role,
      },
    });
  })

  .get('/logout', (req, res) => {
    try {
      req.session.destroy((err) => {
        if (err) {
          logger.error("Error closing session:", err);
          throw new Error("The session couldn't be destroyed la sesión");
        }
        logger.info('Sesión de usuario destruida con éxito.');
        res.redirect('/login');
      });
    } catch (error) {
      logger.error('Error al destruir la sesión:', error);
      return res.status(500).send('Error al cerrar sesión');
    }
  })
    
  //-------------------📌 DTO USER ROUTE
  //.get('/dto/:id', userController.getUserById)
  .get('/', userController.getAllUsers)

export default router;
