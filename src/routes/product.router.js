import { Router } from "express";
import ProductController from "../controllers/product.controllers.js";
import productValidator from "../middlewares/productValidator.js";
import { verifyToken } from "../middlewares/verifyToken.js";
import { authorizeAdmin, authorizePremium } from "../middlewares/authRol.js";
import addOwner from "../middlewares/addOwner.js";

const router = Router();
const controller = new ProductController();

router
    .get("/", controller.getAll)
    .get("/:id", controller.getById)
    .post("/", verifyToken, authorizeAdmin, authorizePremium, productValidator, addOwner, controller.create) // Añade verifyToken antes de authorizeAdmin y authorizePremium
    //.post("/", productValidator, controller.create)
    .put("/:id", controller.update)
    .delete("/:id", controller.delete)

export default router;
