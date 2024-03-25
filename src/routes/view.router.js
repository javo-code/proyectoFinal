import { Router } from "express";
import viewsController from "../controllers/views.controller.js";
import ProductMongoDao from "../persistence/daos/mongoDB/products/product.dao.js";

const router = Router();
const prodDao = new ProductMongoDao();
const controller = new viewsController(prodDao); // Pasar prodDao al constructor del controlador

router.get("/", controller.home);
router.get("/register", controller.register);
router.get("/errorRegister", controller.errorRegister);
router.get("/login", controller.login);
router.get("/errorLogin", controller.errorLogin);
router.get("/profile", controller.profile);

export default router;
