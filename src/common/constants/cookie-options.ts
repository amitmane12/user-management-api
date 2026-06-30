import { type CookieOptions } from "express";
import { env } from "../../config/env.config";

export const cookieOptions: CookieOptions = {
    httpOnly: true,
    secure: env.NODE_ENV === "production",
    sameSite: "strict",
};
