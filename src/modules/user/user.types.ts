import type { UserType } from "./user.model";

export type userRegisterType = {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    profilePicture?: string;
    refreshToken?: string;
};

export type registerUserReturnType = {
    user: UserType;
    tokens: generateTokensType;
};
export type loginUserReturnType = {
    user: UserType;
    tokens: generateTokensType;
};
export type userLoginType = {
    email: string;
    password: string;
    accessToken?: string;
    refreshToken?: string;
};

export type generateTokensType = {
    accessToken: string;
    refreshToken: string;
};
