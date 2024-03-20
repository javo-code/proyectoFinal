import { Router } from "express";
import { logger } from "../utils/logger.winston.js";

const router = Router();

router.get("/", (req, res) => {
  logger.error("error en el endpoint de prueba");
  res.send("probando logger");
});

export default router;