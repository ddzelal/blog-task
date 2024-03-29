import { Exception } from "./Exception.js";

export class UnauthorizedException extends Exception {
    constructor(message: string, context = null) {
        super(message, 401, context);
    }
}
