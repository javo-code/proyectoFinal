import { createLogger, format, transports } from "winston";

const { combine, timestamp, colorize, printf } = format;

// -----------------------📌 Formato del log
const logFormat = printf(({ level, message, timestamp }) => {
  return `${timestamp} ${level}: ${message}`;
});

// -----------------------📌 Transporte de consola
const consoleTransport = new transports.Console({
  level: process.argv[2] === "dev" ? "debug" : process.argv[2] === "prod" ? "info" : "silly",
  format: combine(
    colorize(),
    timestamp({
      format: "MM-DD-YYYY HH:mm:ss",
    }),
    logFormat
  ),
});

// -----------------------📌 Transporte de archivo de errores
const fileErrorTransport = new transports.File({
  filename: "../logs/errors.log",
  level: "error",
  format: combine(timestamp(), logFormat),
});


export const logger = createLogger({
  format: combine(timestamp(), logFormat),
  transports: [consoleTransport, fileErrorTransport],
});


export const loggerWinston = () => {
  logger.silly("imprimimos silly");
  logger.debug("imprimimos debug");
  logger.verbose("imprimimos verbose");
  logger.info("imprimimos info");
  logger.http("imprimimos http");
  logger.warn("imprimimos warn");
  logger.error("imprimimos error");
};

loggerWinston();
