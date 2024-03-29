import { HttpException } from "./HttpException";

export class ConflictException extends HttpException {
    constructor(meta: {} | undefined) {
        super("Conflict in data", 409, meta);
    }
}
