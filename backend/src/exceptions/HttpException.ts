/**
 * Base HTTP exception class.
 * All API response errors must inherit this class.
 */
export class HttpException extends Error {
    type: string;
    status: number;
    meta: any;

    constructor(message: string | undefined, status: number, meta = {}, ...rest: any) {
        // @ts-ignore
        super(message, ...rest);
        this.type = this.constructor.name;
        this.meta = meta;
        this.status = status;
    }

    /**
     * Serialize the error into plain object.
     * No need to explicitly call this method, Express will call it automatically when sent as a response.
     * @returns {Object}
     */
    toJSON() {
        return {
            error: {
                type: this.type,
                message: this.message,
                meta: this.meta,
            },
        };
    }
}
