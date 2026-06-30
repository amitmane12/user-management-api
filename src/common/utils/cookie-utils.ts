import type { Response } from "express";
import { cookieOptions } from "../constants/cookie-options";

export const setAuthCookies = (
    res: Response,
    accessToken: string,
    refreshToken: string
): Response => {
    return res
        .cookie("accessToken", accessToken, {
            ...cookieOptions,
            maxAge: 15 * 60 * 1000,
        })
        .cookie("refreshToken", refreshToken, {
            ...cookieOptions,
            maxAge: 10 * 24 * 60 * 60 * 1000,
        });
};

export const clearAuthCookies = (res: Response) => {
    res.clearCookie("accessToken", cookieOptions);
    res.clearCookie("refreshToken", cookieOptions);
};
