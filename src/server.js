//server.js:
import config from "./config/config.js";
import express from 'express';
import cookieParser from "cookie-parser";

import { errorHandler } from './middlewares/errorHandler.js';
import { Command } from "commander";
import { logger } from "./utils/logger.winston.js";
import { info } from './docs/info.js';
import swaggerUI from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';

import MainRouter from "./routes/index.router.js";
import session from "express-session";
import { mongoStoreOptions } from "./config/mongoStoreOptions.js";
const mainRouter = new MainRouter();

const app = express();
const specs = swaggerJSDoc(info);
const commander = new Command();

commander.option("-m <mode>", "mode server", "dev");
commander.parse();

console.log("options", commander.opts());

app.use("/docs", swaggerUI.serve, swaggerUI.setup(specs));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(config.SECRET_COOKIES));
app.use(session(mongoStoreOptions));

app.use('/api', mainRouter.getRouter());

app.use(errorHandler);

const PORT = config.PORT;
const mode = commander.opts().m

app.listen(PORT, () => {
    logger.info(`🚀 SERVER UP ON PORT ${PORT} IN ${mode} MODE` );
});

export default app;
