import express from "express";
import { statusController } from "./controllers/Status.js";
import { getBlogs, getBlogById, createBlog, updateBlog, deleteBlog } from "./controllers/Blog.js";
import { login, register } from "./controllers/Users.js";
import Authenticate from "./middlewares/Authenticate.js";
import { validateCreateBlog, validateGetBlogsQuery, validateUpdateBlog } from "./middlewares/BlogValidators.js";
import { validateLogin, validateRegistration } from "./middlewares/UserValidators.js";

export const Router = express.Router();

// Status route
Router.get("/status", statusController);

// Blog routes
Router.get("/blogs", validateGetBlogsQuery, getBlogs);
Router.get("/blogs/:id", getBlogById);
Router.post("/blogs", Authenticate, validateCreateBlog, createBlog);
Router.put("/blogs/:id", Authenticate, validateUpdateBlog, updateBlog);
Router.delete("/blogs/:id", Authenticate, deleteBlog);

// Authentication routes
Router.post("/login", validateLogin, login);
Router.post("/register", validateRegistration, register);
