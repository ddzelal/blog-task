import supertest from "supertest";
import config from "config";
import { Application } from "../../../src/Application";
import { UserFactory } from "../../factory/UserFactory";
import UserModel from "../../../src/models/User";
import bcrypt from "bcryptjs";

const request = supertest(Application);

describe("AuthController Tests", () => {
    let testUser;

    beforeAll(async () => {
        testUser = await UserFactory.createUser();
        const hashSaltRounds = config.get("encryption.hashSaltRounds") as number;

        const hashedPassword = await bcrypt.hash(testUser.password, hashSaltRounds);

        await new UserModel().updateOne(testUser.id, { password: hashedPassword });
    });

    describe("POST /register", () => {
        test("should successfully register a new user", async () => {
            const newUserDetails = { email: "testuser@gmail.com", password: "password", fullName: "Test User" };
            const response = await request.post("/register").send(newUserDetails);

            expect(response.status).toBe(201);
            expect(response.body).toHaveProperty("user");
            expect(response.body.user.email).toBe(newUserDetails.email);
        });

        test("should return conflict error for existing user email", async () => {
            const response = await request.post("/register").send({
                email: testUser.email,
                fullName: testUser.fullName,
                password: testUser.password,
            });

            expect(response.status).toBe(409);
        });
    });

    describe("POST /login", () => {
        test("should successfully log in an existing user", async () => {
            const loginDetails = { email: testUser.email, password: testUser.password };
            const response = await request.post("/login").send(loginDetails);

            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty("accessToken");
        });

        test("should return error for invalid login credentials", async () => {
            const wrongLoginDetails = { email: testUser.email, password: "wrongpassword" };
            const response = await request.post("/login").send(wrongLoginDetails);

            expect(response.status).toBe(409);
        });
    });
});
