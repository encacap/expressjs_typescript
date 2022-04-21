import { tokenTypes } from "@configs/tokens";
import Token from "@models/token.model";
import User, { UserDocument } from "@models/user.model";
import ApiError from "@utils/apiError";
import httpStatus from "http-status-codes";
import tokenService, { AuthTokens } from "./token.service";
import userService from "./user.service";

/**
 * Login with email and password
 * @param {string} email
 * @param {string} password
 * @returns {Promise<UserDocument>}
 */
const loginWithEmailAndPassword = async (email: string, password: string): Promise<UserDocument> => {
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
        throw new ApiError(httpStatus.NOT_FOUND, "User not found");
    }
    const isPasswordMatch = await user.comparePassword(password);
    if (!isPasswordMatch) {
        throw new ApiError(httpStatus.UNAUTHORIZED, "Password is incorrect");
    }
    return user;
};

/**
 * Logout and remove refresh token
 * @param {string} refreshToken
 * @returns {Promise<void>}
 */
const logout = async (refreshToken: string): Promise<void> => {
    const refreshTokenDoc = await Token.findOne({ token: refreshToken, type: tokenTypes.REFRESH });
    if (!refreshTokenDoc) {
        throw new ApiError(httpStatus.NOT_FOUND, "Refresh token not found");
    }
    refreshTokenDoc.remove();
};

/**
 * Refresh access token
 * @param refreshToken
 * @returns {Promise<AuthTokens>}
 */
const refreshAuthToken = async (refreshToken: string): Promise<AuthTokens> => {
    try {
        const refreshTokenDoc = await Token.findOne({ token: refreshToken, type: tokenTypes.REFRESH });
        if (!refreshTokenDoc) {
            throw new Error();
        }
        const user = await userService.getUserById(refreshTokenDoc.user);
        if (!user) {
            throw new Error();
        }
        await refreshTokenDoc.remove();
        return tokenService.generateAuthToken(user);
    } catch (error) {
        throw new ApiError(httpStatus.UNAUTHORIZED, "Refresh token is invalid");
    }
};

export default { loginWithEmailAndPassword, logout, refreshAuthToken };
