import { User } from './interfaces/user.interface';
import express from 'express';

export interface IUserRequest extends express.Request {
    user: User;
}

declare module 'express-serve-static-core' {
    interface Request {
        user: User;
    }
}