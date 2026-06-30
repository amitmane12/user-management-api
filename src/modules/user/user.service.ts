import { MODEL_CONSTANTS } from "../../common/constants/model.constants";
import ApiError from "../../common/utils/api-error";
import { User, type UserDocument } from "./user.model";
import type {
    loginUserReturnType,
    registerUserReturnType,
    userLoginType,
    userRegisterType,
} from "./user.types";
import bcrypt from "bcrypt";

class UserService {
    private async generateAndStoreTokens(user: UserDocument) {
        try {
            const accessToken = user.generateAccessToken();
            const refreshToken = user.generateRefreshToken();
            user.refreshToken = await bcrypt.hash(
                refreshToken,
                MODEL_CONSTANTS.HASH_ROUNDS
            );
            await user.save({
                validateBeforeSave: false,
            });
            return { accessToken, refreshToken };
        } catch (error) {
            throw new ApiError(500, "Error while generating tokens.", error);
        }
    }
    async registerUser(
        inputData: userRegisterType
    ): Promise<registerUserReturnType> {
        console.log(inputData);
        // 1. Check email already exists
        // 2. Create user
        // 3. Generate Tokens
        // 4. Save Refresh Token
        // 5. Remove password if needed
        const { email } = inputData;
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            throw new ApiError(409, "User already exist");
        }
        //create new user
        const user = await User.create(inputData);
        //create tokens now
        const { accessToken, refreshToken } =
            await this.generateAndStoreTokens(user);

        const createdUser = await User.findById(user._id);

        if (!createdUser) {
            throw new ApiError(500, "User creation failed");
        }
        return {
            user: createdUser,
            tokens: {
                accessToken,
                refreshToken,
            },
        };
    }
    async loginUser(inputData: userLoginType): Promise<loginUserReturnType> {
        const { email, password } = inputData;
        const user = await User.findOne({ email }).select("+password");
        if (!user) {
            throw new ApiError(409, "Invalid email or password.");
        }
        const isPasswordValidate = await user.isPasswordCorrect(password);
        if (!isPasswordValidate) {
            throw new ApiError(401, "Invalid email or password.");
        }
        const { accessToken, refreshToken } =
            await this.generateAndStoreTokens(user);
        const loggedInUser = await User.findById(user._id);

        if (!loggedInUser) {
            throw new ApiError(500, "Failed to fetch user.");
        }
        return {
            user: loggedInUser,
            tokens: {
                accessToken,
                refreshToken,
            },
        };
    }
    // async logoutUser() {}
    async logout(user: UserDocument) {
        // user.refreshToken = null;

        // await user.save({
        //     validateBeforeSave: false,
        // });
        await User.findByIdAndUpdate(user._id, {
            $unset: {
                refreshToken: 1,
            },
        });
    }
}

export default new UserService();
