import { Request, Response, NextFunction } from "express";
import { ValidationException } from "../exceptions/ValidationException";
import { loginSchema, registrationSchema } from "../validators/userValidator";

export const validateRegistration = (request: Request, _response: Response, next: NextFunction) => {
    const { error } = registrationSchema.validate(request.body);
    if (error) {
        throw new ValidationException({ message: error.details[0].message });
    }
    next();
};

export const validateLogin = (request: Request, _response: Response, next: NextFunction) => {
    const { error } = loginSchema.validate(request.body);
    if (error) {
        throw new ValidationException({ message: error.details[0].message });
    }
    next();
};
