import BlogModel from "../models/Blog";
import { Request, Response } from "express";
import { AsyncHandler } from "../utils/AsyncHandler";
import { AccessDeniedException } from "../exceptions/AccessDeniedException";
import { NotFoundException } from "../exceptions/NotFoundException";

const blogModel = new BlogModel();

export const getBlogs = AsyncHandler(async (_request: Request, response: Response) => {
    const blogs = await blogModel.find();

    response.send(blogs);
});

export const getBlogById = AsyncHandler(async (request: Request, response: Response) => {
    const { id } = request.params;
    const blog = await blogModel.findById(id);
    if (!blog) {
        throw new NotFoundException({});
    }

    response.send(blog);
});

export const createBlog = AsyncHandler(async (request: Request, response: Response) => {
    const { body: blogData, user } = request;
    const newBlog = await blogModel.create({ authorId: user.id, ...blogData });

    response.status(201).send(newBlog);
});

export const updateBlog = AsyncHandler(async (request: Request, response: Response) => {
    const { id } = request.params;
    const blogData = request.body;

    const existingBlog = await blogModel.findById(id);
    if (!existingBlog) {
        throw new NotFoundException({});
    }

    if (existingBlog.authorId !== request.user.id) {
        throw new AccessDeniedException("User is not authorized to update this blog");
    }

    const updatedBlog = await blogModel.updateOne(id, blogData);
    response.send(updatedBlog);
});

export const deleteBlog = AsyncHandler(async (request: Request, response: Response) => {
    const { id } = request.params;

    const existingBlog = await blogModel.findById(id);
    if (!existingBlog) {
        throw new NotFoundException("Blog not found");
    }

    await blogModel.deleteOne(id);
    response.status(204).send();
});
