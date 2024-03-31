import { Request, Response, NextFunction } from "express";
import { createBlogSchema, getBlogsQuerySchema, updateBlogSchema } from "../validators/blogValidator";
import { ValidationException } from "../exceptions/ValidationException";

export const validateGetBlogsQuery = (request: Request, _response: Response, next: NextFunction) => {
    const { error } = getBlogsQuerySchema.validate(request.query);
    if (error) {
        throw new ValidationException({ message: error.details[0].message });
    }
    next();
};

export const validateCreateBlog = (request: Request, _response: Response, next: NextFunction) => {
    const { error } = createBlogSchema.validate(request.body);
    if (error) {
        throw new ValidationException({ message: error.details[0].message });
    }
    next();
};

export const validateUpdateBlog = (request: Request, _response: Response, next: NextFunction) => {
    const { error } = updateBlogSchema.validate(request.body);
    if (error) {
        throw new ValidationException({ message: error.details[0].message });
    }
    next();
};
