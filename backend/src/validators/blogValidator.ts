import Joi from "joi";

export const createBlogSchema = Joi.object({
    title: Joi.string().required(),
    content: Joi.string().required(),
});

export const updateBlogSchema = Joi.object({
    title: Joi.string().optional(),
    content: Joi.string().optional(),
}).unknown(true);

export const getBlogsQuerySchema = Joi.object({
    page: Joi.number().integer().min(1).optional().default(1),
    itemsPerPage: Joi.number().integer().min(1).max(100).optional().default(10),
    sortBy: Joi.string().trim().optional().default("createdAt"),
    sortOrder: Joi.string().trim().optional().default("desc"),
    title: Joi.string().trim().optional(),
    authorId: Joi.string().trim().optional(),
});
