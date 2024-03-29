import { HttpException } from "./HttpException.js";

export class ValidationException extends HttpException {
    constructor(meta: {} | undefined) {
        super("Validation failed", 400, meta);
    }
}
