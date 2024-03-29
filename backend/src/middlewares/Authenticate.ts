// middleware/authenticate.ts
import { Request, Response, NextFunction } from "express";
import JWT from "../services/JWT";
import UserModel from "../models/User";

const jwtService = new JWT();
const userModel = new UserModel();

const Authenticate = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.headers.authorization?.split(" ")[1];
        if (!token) {
            return res.status(401).send({ message: "No token provided" });
        }

        const decoded = jwtService.verifyAccessToken(token);
        if (!decoded) {
            return res.status(401).send({ message: "Invalid token" });
        }

        const user = userModel.findById(decoded.userId);
        if (!user) {
            return res.status(404).send({ message: "User not found" });
        }

        req.user = user;
        next();
    } catch (error) {
        return res.status(500).send({ message: "Authentication failed" });
    }
};

export default Authenticate;
