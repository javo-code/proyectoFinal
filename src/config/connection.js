import { connect } from "mongoose";
import { logger } from "../utils/logger.winston.js";
import 'dotenv/config'

const connectionString = process.env.MONGO_URL_LOCAL;

export const initMongoDB = async () => {
  try {
    await connect(connectionString);
    logger.info("Conectado a la base de datos de MongoDB");
  } catch (error) {
    logger.error(error);
  }
};