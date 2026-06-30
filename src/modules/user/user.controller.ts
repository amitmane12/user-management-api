import type { Request, Response } from "express";
import asyncHandler from "../../common/utils/async-handler";
import userService from "./user.service";
import {
    clearAuthCookies,
    setAuthCookies,
} from "../../common/utils/cookie-utils";
import ApiResponse from "../../common/utils/api-response";

class UserController {
    registerUser = asyncHandler(async (req: Request, res: Response) => {
        console.log("middelewarw,working", req.user);
        const { user, tokens } = await userService.registerUser(req.body);
        setAuthCookies(res, tokens.accessToken, tokens.refreshToken);
        return res
            .status(201)
            .json(new ApiResponse(201, user, "user created successfully"));
    });
    loginUser = asyncHandler(async (req: Request, res: Response) => {
        const result = await userService.loginUser(req.body);

        setAuthCookies(
            res,
            result.tokens.accessToken,
            result.tokens.refreshToken
        );

        return res
            .status(200)
            .json(new ApiResponse(200, result.user, "Login successful."));
    });

    logout = asyncHandler(async (req: Request, res: Response) => {
        try{
        await userService.logout(req.user!); //delete refreshToken from db

        clearAuthCookies(res);

        return res
            .status(200)
            .json(new ApiResponse(200, null, "Logout successful."));
        }catch(error){
            console.log('error',error)
        }
    });
}
export default new UserController();
