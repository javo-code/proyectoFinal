import { logger } from "../utils/logger.winston.js";

export const addOwner = (req, res, next) => {
    // Verificar si el usuario está autenticado y tiene un rol definido
    if (req.user && req.user.role) {
        try {
            // Definir "owner" como "admin" por defecto
            req.body.owner = "admin";
            // Si el rol del usuario es "premium", actualizar "owner" a "premium"
            if (req.user.role === "premium") {
                req.body.owner = "premium";
            }
        } catch (error) {
            logger.error('Error atrapado en el "addOwner.js" => ', error);
        }
    }
    next();
};

export default addOwner;
