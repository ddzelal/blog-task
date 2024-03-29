import { Request, Response } from "express";
import { AsyncHandler } from "../utils/AsyncHandler";

export const statusController = AsyncHandler((_request: Request, response: Response) => {
    response.send({ status: "OK" });
});
