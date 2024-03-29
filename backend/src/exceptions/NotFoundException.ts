import { HttpException } from "./HttpException.js";

export class NotFoundException extends HttpException {
    constructor(meta: {}) {
        super("Not found", 404, meta);
    }
}
