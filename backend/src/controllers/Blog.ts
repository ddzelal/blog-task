import BlogModel, { Blog } from "../models/Blog";
import { Request, Response } from "express";
import { AsyncHandler } from "../utils/AsyncHandler";
import { AccessDeniedException } from "../exceptions/AccessDeniedException";
import { NotFoundException } from "../exceptions/NotFoundException";
import { Pagination } from "../types/Pagination";

const blogModel = new BlogModel();

export const getBlogs = AsyncHandler(async (request: Request, response: Response) => {
    const { page, itemsPerPage, sortBy, sortOrder, ...queryFilters } = request.query as {
        pagination: Pagination;
        [k: string]: any;
    };

    const pagination = {
        page: parseInt(page, 10) || 1,
        itemsPerPage: parseInt(itemsPerPage, 10) || 9,
    };

    const sort = {
        sortBy: sortBy || "createdAt",
        sortOrder: sortOrder || "desc",
    };

    const blogs = await blogModel.findWithFilters(queryFilters as Partial<Blog>, pagination, sort);

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
