import { z } from "zod/v3";
// import type {} from "zod/v3";

/**
 * Reusable field validators
 */
const nameSchema = z
    .string()
    .trim()
    .min(2, "Must be at least 2 characters long.")
    .max(50, "Must not exceed 50 characters.");

const emailSchema = z
    .string()
    .trim()
    .toLowerCase()
    .email("Invalid email address.");

const passwordSchema = z
    .string()
    .min(8, "Password must be at least 8 characters long.")
    .max(100, "Password must not exceed 100 characters.");

/**
 * Register User
 */
export const registerSchema = z
    .object({
        firstName: nameSchema,
        lastName: nameSchema,
        email: emailSchema,
        password: passwordSchema,
    })
    .strict();

/**
 * Login User
 */
export const loginSchema = z
    .object({
        email: emailSchema,
        password: passwordSchema,
    })
    .strict();

/**
 * Change Password
 */
export const changePasswordSchema = z
    .object({
        oldPassword: passwordSchema,
        newPassword: passwordSchema,
    })
    .strict()
    .refine((data) => data.oldPassword !== data.newPassword, {
        message: "New password must be different from the old password.",
        path: ["newPassword"],
    });

/**
 * Update Profile
 */
export const updateProfileSchema = z
    .object({
        firstName: nameSchema.optional(),
        lastName: nameSchema.optional(),
        profilePicture: z.string().optional(),
        coverPhoto: z.string().optional(),
    })
    .strict()
    .refine((data) => Object.keys(data).length > 0, {
        message: "At least one field is required.",
    });

/**
 * User Id Param
 */
export const userIdParamSchema = z
    .object({
        userId: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid user id."),
    })
    .strict();
