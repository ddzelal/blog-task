import { Request, Response } from "express";
import config from "config";
import UserModel from "../models/User";
import JWT from "../services/JWT";
import bcrypt from "bcryptjs";
import { ConflictException } from "../exceptions/ConflictException";
import { AsyncHandler } from "../utils/AsyncHandler";
import { NotFoundException } from "../exceptions/NotFoundException";

const userModel = new UserModel();
const jwt = new JWT();
const salt = config.get("encryption.hashSaltRounds") as number;

export const register = AsyncHandler(async (request: Request, response: Response) => {
    const { email, password, fullName } = request.body;
    const existingUser = await userModel.findByEmail(email);
    if (existingUser) {
        throw new ConflictException({ message: "User already exists" });
    }

    const hashedPassword = bcrypt.hashSync(password, salt);
    await userModel.create({ email, fullName, password: hashedPassword });
    response.status(201).json();
});

export const login = AsyncHandler(async (request: Request, response: Response) => {
    const { email, password } = request.body;

    const user = await userModel.findByEmail(email);
    if (!user) {
        throw new NotFoundException({ message: "User not found" });
    }

    const isPasswordValid = bcrypt.compareSync(password, user.password);
    if (!isPasswordValid) {
        throw new ConflictException({ message: "Invalid email or password" });
    }

    const accessToken = jwt.generateAccessToken({ userId: user.id, email: user.email });
    response.status(200).json({ accessToken });
});

export const getMe = AsyncHandler(async (request: Request, response: Response) => {
    const { password, ...userInfo } = request.user;

    response.status(200).json(userInfo);
});
