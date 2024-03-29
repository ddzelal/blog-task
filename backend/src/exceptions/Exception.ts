export class Exception extends Error {
    code: number;
    context: any;

    constructor(message: string, code = 500, context = null) {
        message = JSON.stringify(message);
        super(message);

        this.code = code;
        this.context = context;
    }
}
