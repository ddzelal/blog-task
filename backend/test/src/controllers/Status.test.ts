import request from "supertest";
import { Application } from "../../../src/Application";

describe("statusController", () => {
    test("should return OK", async () => {
        const response = await request(Application).get("/status");

        expect(response.statusCode).toBe(200);
        expect(response.text).toBe('{"status":"OK"}');
    });
});
