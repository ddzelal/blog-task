// AuthController.ts
import { Request, Response } from "express";
import UserModel from "../models/User";
import JWT from "../services/JWT";
import bcrypt from "bcryptjs";
import { ConflictException } from "../exceptions/ConflictException";
import { AsyncHandler } from "../utils/AsyncHandler";

const userModel = new UserModel();
const jwt = new JWT();

export const register = AsyncHandler((request: Request, response: Response) => {
    const { email, password, fullName } = request.body;
    const existingUser = userModel.findByEmail(email);
    if (existingUser) {
        throw new ConflictException({ message: "User already exists" });
    }

    const hashedPassword = bcrypt.hashSync(password, 10);
    const newUser = userModel.create({ email, fullName, password: hashedPassword });
    response.status(201).json({ user: newUser });
});

export const login = AsyncHandler((request: Request, response: Response) => {
    const { email, password } = request.body;
    const user = userModel.findByEmail(email);
    if (!user) {
        throw new ConflictException({ message: "Invalid email or password" });
    }

    const isPasswordValid = bcrypt.compareSync(password, user.password);
    if (!isPasswordValid) {
        throw new ConflictException({ message: "Invalid email or password" });
    }

    const accessToken = jwt.generateAccessToken({ userId: user.id, email: user.email });
    response.status(200).json({ accessToken });
});
