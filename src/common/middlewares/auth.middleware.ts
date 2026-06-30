import type { NextFunction, Request, Response } from "express";
import ApiError from "../utils/api-error";
import jwt, { type JwtPayload } from "jsonwebtoken";
import { env } from "../../config/env.config";
import { User } from "../../modules/user/user.model";
const authMiddleware = async (
    req: Request,
    _: Response,
    next: NextFunction
) => {
    try {
        let token: string | undefined;
        const authHeader = req.headers.authorization;

        if (authHeader?.startsWith("Bearer ")) {
            token = authHeader.split(" ")[1];
        }

        if (!token) {
            token = req.cookies?.accessToken;
        }
        if (!token) {
            throw new ApiError(401, "Unauthorized");
        }
        const decoded = jwt.verify(
            token,
            env.ACCESS_TOKEN_SECRET
        ) as JwtPayload;
        const user = await User.findById(decoded.id);

        if (!user) {
            throw new ApiError(401, "User not found");
        }

        req.user = user;
        next();
    } catch (error) {
        next(error);
    }
};

export default authMiddleware;
