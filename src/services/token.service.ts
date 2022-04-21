import configs from "@configs/index";
import { tokenTypes } from "@configs/tokens";
import Token, { TokenDocument } from "@models/token.model";
import { UserDocument } from "@models/user.model";
import dayjs, { Dayjs } from "dayjs";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

/**
 * Generate a token for a user
 * @param {mongoose.Types.ObjectId} userId
 * @param {Dayjs} expires
 * @param {string} type
 * @param {string} secret
 * @returns {string}
 */
const generateToken = (
    userId: mongoose.Types.ObjectId,
    expires: Dayjs,
    type: string,
    secret: string = configs.jwt.secret
): string => {
    const payload = {
        sub: userId,
        iat: dayjs().unix(),
        exp: expires.unix(),
        type,
    };
    return jwt.sign(payload, secret);
};

/**
 * Save token into database
 * @param {string} token
 * @param {mongoose.Types.ObjectId} userId
 * @param {Dayjs} expires
 * @param {string} type
 * @returns {Promise<TokenDocument>}
 */
const saveToken = async (
    token: string,
    userId: mongoose.Types.ObjectId,
    expires: Dayjs,
    type: string
): Promise<TokenDocument> => {
    const tokenDoc = await Token.create({
        token,
        user: userId,
        expires: expires.toDate(),
        type,
    });
    return tokenDoc;
};

/**
 * Verify a token and return token doc (if valid), otherwise throw an error
 * @param {string} token
 * @param {string} type
 * @returns {Promise<TokenDocument>}
 */
const verifyToken = async (token: string, type: string): Promise<TokenDocument> => {
    const payload = jwt.verify(token, configs.jwt.secret);
    const tokenDoc = await Token.findOne({ token, type, user: payload.sub });
    if (!tokenDoc) {
        throw new Error("Token is invalid");
    }
    return tokenDoc;
};

export interface AuthTokens {
    access: {
        token: string;
        expires: Date;
    };
    refresh: {
        token: string;
        expires: Date;
    };
}

/**
 * Generate and save tokens for a user
 * @param {UserDocument} user
 * @returns {Promise<AuthTokens>}
 */
const generateAuthToken = async (user: UserDocument): Promise<AuthTokens> => {
    const accessTokenExpires = dayjs().add(configs.jwt.accessExpirationMinutes, "minutes");
    const accessToken = generateToken(user._id, accessTokenExpires, tokenTypes.ACCESS);

    const refreshTokenExpires = dayjs().add(configs.jwt.refreshExpirationDays, "minutes");
    const refreshToken = generateToken(user._id, refreshTokenExpires, tokenTypes.REFRESH);

    await saveToken(refreshToken, user._id, accessTokenExpires, tokenTypes.REFRESH);

    return {
        access: {
            token: accessToken,
            expires: accessTokenExpires.toDate(),
        },
        refresh: {
            token: refreshToken,
            expires: refreshTokenExpires.toDate(),
        },
    };
};

export default {
    generateToken,
    saveToken,
    verifyToken,
    generateAuthToken,
};
