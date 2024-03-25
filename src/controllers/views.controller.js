import Controllers from "./class.controller.js";

export default class viewsController extends Controllers {
    constructor(prodDao) {
        super();
        this.prodDao = prodDao; // Asignar prodDao al objeto del controlador
    }

    home = async (req, res) => {
        try {
            const response = await this.prodDao.getAll();
            const products = response.payload.products;
            res.render("home", { products });
        } catch (error) {
            console.error("Error getting products at views.router ::", error.message);
            res.status(500).send("Internal server error");
        }
    };

    // Resto de métodos del controlador...
}
