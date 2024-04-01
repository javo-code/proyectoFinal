import { Router } from "express";
import ProductController from "../controllers/product.controllers.js";
import productValidator from "../middlewares/productValidator.js";
import { verifyToken } from "../middlewares/verifyToken.js";
import { authorizeAdmin } from "../middlewares/authRol.js";
import addOwner from "../middlewares/addOwner.js";

const router = Router();
const controller = new ProductController();

router
    .get("/", controller.getAll)
    .get("/:id", controller.getById)
    .post("/createProd", verifyToken, authorizeAdmin, addOwner, productValidator, (req, res, next) => {
        req.body.owner = req.user.role; // Asignar el valor de req.user.role a la propiedad owner del producto
        controller.create(req, res, next);
    })
    .put("/:id", controller.update)
    .delete("/:id", controller.delete)

export default router;
