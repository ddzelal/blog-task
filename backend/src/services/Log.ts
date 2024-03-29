import config from "config";
import { extend } from "lodash-es";
import winston from "winston";
import { isDevelopmentEnvironment } from "../helpers/environment.js";

const { format } = winston;
const transports: any = [];
if (config.has("log.console")) {
    const timestamp = isDevelopmentEnvironment() ? format.splat() : format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" });
    const consoleFormat = format.combine(format.colorize({ all: true }), timestamp, format.simple(), format.ms());
    transports.push(new winston.transports.Console(extend({ format: consoleFormat }, config.get("log.console"))));
}

export const Log = winston.createLogger({
    level: "debug",
    format: winston.format.json(), // Default format if not specified
    transports,
});
