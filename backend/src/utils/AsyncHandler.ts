import { type Request, type Response, type NextFunction } from "express";

export const AsyncHandler = (handler: (request: Request, response: Response, next: NextFunction) => any) => {
    return (request: Request, response: Response, next: NextFunction) => {
        // Make sure to .catch() any errors and pass them along to the next()
        // middleware in the chain, in this case the error handler.
        Promise.resolve(handler(request, response, next)).catch(next);
    };
};
