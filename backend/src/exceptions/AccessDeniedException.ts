import { Exception } from "./Exception";

export class AccessDeniedException extends Exception {
    constructor(message = "Forbidden", context = null) {
        super(message, 403, context);
    }
}
