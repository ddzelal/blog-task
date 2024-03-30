import supertest from "supertest";
import config from "config";
import { Application } from "../../../src/Application";
import { UserFactory } from "../../factory/UserFactory";
import { BlogFactory } from "../../factory/BlogFactory";
import BlogModel from "../../../src/models/Blog";
import UserModel from "../../../src/models/User";
import JWT from "../../../src/services/JWT";
import { clearJSONFile } from "../../utils/cleanDatabase";

const request = supertest(Application);

describe("BlogController Tests", () => {
    let testUser;
    let testBlog;
    let accessToken;

    beforeAll(async () => {
        testUser = await UserFactory.createUser();
        testBlog = await BlogFactory.createBlog({ authorId: testUser.id });

        accessToken = new JWT().generateAccessToken({ userId: testUser.id, email: testUser.email });
    });

    describe("GET /blogs", () => {
        it("should return all blogs", async () => {
            const response = await request.get("/blogs");
            expect(response.status).toBe(200);
            expect(response.body.length).toBeGreaterThanOrEqual(1);
            expect(response.body[0]).toHaveProperty("title", testBlog.title);
        });
    });

    describe("GET /blogs/:id", () => {
        it("should return a specific blog by ID", async () => {
            const response = await request.get(`/blogs/${testBlog.id}`);
            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty("id", testBlog.id);
        });

        it("should return 404 for a blog that does not exist", async () => {
            const response = await request.get("/blogs/gaga").set("Authorization", `Bearer ${accessToken}`);
            expect(response.status).toBe(404);
        });
    });

    describe("POST /blogs", () => {
        it("should create a new blog", async () => {
            const newBlogData = { title: "New Blog", content: "New blog content" };
            const response = await request
                .post("/blogs")
                .set("Authorization", `Bearer ${accessToken}`)
                .send(newBlogData);

            expect(response.status).toBe(201);
            expect(response.body).toHaveProperty("title", newBlogData.title);
        });
    });

    describe("PUT /blogs/:id", () => {
        it("should update a blog", async () => {
            const updateData = {
                title: "Updated Blog Title",
                content: "Updated content.",
            };
            const response = await request
                .put(`/blogs/${testBlog.id}`)
                .send(updateData)
                .set("Authorization", `Bearer ${accessToken}`);
            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty("title", updateData.title);
        });
    });

    describe("DELETE /blogs/:id", () => {
        it("should delete a blog", async () => {
            const response = await request
                .delete(`/blogs/${testBlog.id}`)
                .set("Authorization", `Bearer ${accessToken}`);
            expect(response.status).toBe(204);
        });
    });
});
