import type { NextFunction, Request, RequestHandler, Response } from "express";
import type { ZodTypeAny } from "zod/v3";
import ApiError from "../utils/api-error";
import { ZodError } from "zod";

type ValidationSchema = {
    body?: ZodTypeAny;
    params?: ZodTypeAny;
    query?: ZodTypeAny;
};

const validate = (schemas: ValidationSchema): RequestHandler => {
    return async (req: Request, _: Response, next: NextFunction) => {
        try {
            //    const result = await schema.safeParseAsync(req.body);
            //    if (!result.success) {
            //        // return next(result.error);
            //        return next(
            //            new ApiError(400, "validation failed", result.error.flatten())
            //        );
            //    }
            //    req.body = result.data;
            //    next();
            if (schemas.body) {
                req.body = await schemas.body.parseAsync(req.body);
            }
            if (schemas.params) {
                req.params = await schemas.params.parseAsync(req.params);
            }
            if (schemas.query) {
                req.query = await schemas.query.parseAsync(req.query);
            }
            next();
        } catch (error: unknown) {
            if (error instanceof ZodError) {
                return next(
                    new ApiError(400, "Validation failed.", error.flatten())
                );
            }

            next(error);
        }
    };
};

export default validate;
