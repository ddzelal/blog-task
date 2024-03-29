import cors from "cors";
import express from "express";
import { ErrorHandler } from "./middlewares/ErrorHandler";
import { Router } from "./Router";

export const Application = express();

Application.use(cors());
Application.use(express.json());
Application.use(express.urlencoded({ extended: true }));

Application.use(Router);
Application.use(ErrorHandler);
