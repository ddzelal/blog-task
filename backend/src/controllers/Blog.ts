import { Request, Response } from "express";
import { AsyncHandler } from "../utils/AsyncHandler";
import BlogModel from "../models/Blog";
import { AccessDeniedException } from "../exceptions/AccessDeniedException";
import { NotFoundException } from "../exceptions/NotFoundException";

const blogModel = new BlogModel();

export const getBlogs = AsyncHandler(async (_request: Request, response: Response) => {
    const blogs = blogModel.find();
    response.send(blogs);
});

export const getBlogById = AsyncHandler(async (request: Request, response: Response) => {
    const { id } = request.params;
    const blog = blogModel.findById(id);
    if (!blog) {
        throw new NotFoundException("Blog not found");
    }
    response.send(blog);
});

export const createBlog = AsyncHandler(async (request: Request, response: Response) => {
    const { body: blogData, user } = request;
    const newBlog = blogModel.create({ authorId: user.id, ...blogData });
    response.status(201).send(newBlog);
});

export const updateBlog = AsyncHandler(async (request: Request, response: Response) => {
    const { id } = request.params;
    const blogData = request.body;

    const existingBlog = blogModel.findById(id);
    if (!existingBlog) {
        throw new NotFoundException("Blog not found");
    }
    if (existingBlog.authorId !== request.user.id) {
        throw new AccessDeniedException("User is not authorized to update this blog");
    }

    const updatedBlog = blogModel.updateOne(id, blogData);
    response.send(updatedBlog);
});

export const deleteBlog = AsyncHandler(async (request: Request, response: Response) => {
    const { id } = request.params;

    const existingBlog = blogModel.findById(id);
    if (!existingBlog) {
        throw new NotFoundException("Blog not found");
    }

    blogModel.deleteOne(id);
    response.status(204).send();
});
