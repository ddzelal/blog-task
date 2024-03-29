import { type NextFunction, type Request, type Response } from "express";
import { Log } from "../services/Log.js";
import { isDevelopmentEnvironment } from "../helpers/environment.js";

/* eslint-disable-next-line @typescript-eslint/no-unused-vars */
export const ErrorHandler = (error: any, request: Request, response: Response, _next: NextFunction) => {
    const status = error.status ?? 500;
    const defaultMessage = { error: { code: "internal_error", stack: "", message: "" } };
    if (isDevelopmentEnvironment()) {
        // In dev environment give more info
        defaultMessage.error.stack = error.stack ?? "N/A";
        defaultMessage.error.message = error.message ?? "N/A";
    }

    const message = error.meta ?? defaultMessage;

    Log.error(message, { error, status, request: { method: request.method, url: request.url } });

    response.set("Content-Type", "application/json");
    response.status(status).send(message);
};
