import type { NextFunction, Request, RequestHandler, Response } from "express";

type AsyncRequestHandler = (
    req: Request,
    res: Response,
    next: NextFunction
) => Promise<unknown>;

const asyncHandler = (handler: AsyncRequestHandler): RequestHandler => {
    return async (req, res, next) => {
        try {
            await handler(req, res, next);
        } catch (error) {
            next(error);
        }
    };
};

export default asyncHandler;

// promise-resolved style (more simply)
/**
    const AsyncHandler = (fn)=>{
    return (req,res,next)=>{
        promise
        .resolve(fn(req,res,next))
        .catch(error=>next(error))
    }
    }
 */
