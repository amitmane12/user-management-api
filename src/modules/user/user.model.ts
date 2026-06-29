import {
    model,
    Schema,
    type HydratedDocument,
    type InferSchemaType,
} from "mongoose";
import ApiError from "../../common/utils/api-error";
import bcrypt from "bcrypt";
import { MODEL_CONSTANTS } from "../../common/constants/model.constants";
import { env } from "../../config/env.config";
import jwt from "jsonwebtoken";
import type { StringValue } from "ms";

interface UserMethods {
    isPasswordCorrect(password: string): Promise<boolean>;
    generateAccessToken(): string;
    generateRefreshToken(): string;
}

const userSchema = new Schema(
    {
        firstName: {
            type: String,
            required: [true, "First name is required"],
            lowercase: true,
            trim: true,
        },
        lastName: {
            type: String,
            required: [true, "Last name is required"],
            lowercase: true,
            trim: true,
        },
        email: {
            type: String,
            required: [true, "Email is required"],
            unique: true,
            lowercase: true,
            trim: true,
            index: true,
        },
        password: {
            type: String,
            required: [true, "Password is required"],
            minlength: [8, "Password must be at least 8 characters long"],
            select: false,
        },
        role: {
            type: String,
            enum: ["user", "admin"],
            default: "user",
        },
        profilePicture: {
            type: String,

            //   default: 'default-profile-picture.png',
        },
        coverPhoto: {
            type: String,
        },
        refreshToken: {
            type: String,
        },
    },
    { timestamps: true }
);

userSchema.pre("save", async function (this) {
    if (!this.isModified("password")) return;
    try {
        this.password = await bcrypt.hash(
            this.password,
            MODEL_CONSTANTS.HASH_ROUNDS
        );
    } catch (error) {
        throw new ApiError(
            500,
            "something went wrong while encrypting password"
        );
    }
});

userSchema.methods.isPasswordCorrect = async function (
    this: UserDocument,
    password: string
): Promise<boolean> {
    return await bcrypt.compare(password, this.password);
};
userSchema.methods.generateAccessToken = function (this: UserDocument): string {
    const secret = env.ACCESS_TOKEN_SECRET;
    const secretExpiry: StringValue = env.ACCESS_TOKEN_EXPIRY as StringValue;
    return jwt.sign(
        {
            id: this._id,
            email: this.email,
            role: this.role,
        },
        secret,
        { expiresIn: secretExpiry }
    );
};
userSchema.methods.generateRefreshToken = function (
    this: UserDocument
): string {
    const secret = env.REFRESH_TOKEN_SECRET;
    const secretExpiry: StringValue = env.REFRESH_TOKEN_EXPIRY as StringValue;
    return jwt.sign(
        {
            id: this._id,
        },
        secret,
        { expiresIn: secretExpiry }
    );
};

export type UserType = InferSchemaType<typeof userSchema>;
export type UserDocument = HydratedDocument<UserType, UserMethods>;
export const User = model<UserType>("User", userSchema);
