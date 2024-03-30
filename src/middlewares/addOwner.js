import { logger } from "../utils/logger.winston.js";

export const addOwner = (req, res, next) => {
    const { role } = req.user;

    try {
        // Verificar si el cuerpo de la solicitud contiene un objeto de producto
        if (req.body) {
            console.log("REQ.BODY => ", req.body)
            // Agregar la propiedad "owner" al objeto del producto según el rol del usuario
            if (role === "admin") {
                req.body.owner = "admin";
            } else if (role === "premium") {
                req.body.owner = "premium";
            }
        }
    } catch (error) {
        logger.info('Error atrapado en el "addOwner.js" => ', error);
    }
    
    next();
};

export default addOwner;