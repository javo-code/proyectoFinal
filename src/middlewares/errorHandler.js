import { logger } from "../utils/logger.winston.js";
import { HttpResponse } from "../utils/http.response.js";
const httpResponse = new HttpResponse(); 

export const errorHandler = (error, req, res, next) => {
    logger.error(error);
    return httpResponse.NotFound(res, error.message)
}