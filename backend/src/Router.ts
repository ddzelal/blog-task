import express from "express";
import { statusController } from "./controllers/Status.js";
import { getBlogs, getBlogById, createBlog, updateBlog, deleteBlog } from "./controllers/Blog.js";
import { login, register } from "./controllers/Users.js";
import Authenticate from "./middlewares/Authenticate.js";

export const Router = express.Router();

// Status route
Router.get("/status", statusController);

// Blog routes
Router.get("/blogs", getBlogs);
Router.get("/blogs/:id", getBlogById);
Router.post("/blogs", Authenticate, createBlog);
Router.put("/blogs/:id", Authenticate, updateBlog);
Router.delete("/blogs/:id", Authenticate, deleteBlog);

// Authentication routes
Router.post("/login", login);
Router.post("/register", register);
