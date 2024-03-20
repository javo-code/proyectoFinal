import { Router } from "express";
import ProductController from "../controllers/product.controllers.js";
import productValidator from "../middlewares/productValidator.js";

const router = Router();
const controller = new ProductController();

router
//-------------------📌 PRODUCT MAIN ROUTES
    .get("/", controller.getAll)
    .get("/:id", controller.getById)
    .post("/", productValidator, controller.create)
    .put("/:id", controller.update)
    .delete("/:id", controller.delete)
    
//-------------------📌 PRODUCT ROUTES
    .get("/dto/:id", controller.getProdById)
    .post("/mockingproducts", controller.createRandomProducts)


export default router;
