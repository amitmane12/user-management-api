import { type NextFunction, type Request, type Response } from "express";
import ApiError from "../utils/api-error";

const errorHandler = (
    err: unknown,
    _: Request,
    res: Response,
    next: NextFunction
) => {
    if (err instanceof ApiError) {
        return res.status(err.statusCode).json({
            success: false,
            message: err.message,
            errors: err.errors ?? null,
        });
    }

    console.error(err);

    return res.status(500).json({
        success: false,
        message: "Internal Server Error",
    });
};

export default errorHandler;
