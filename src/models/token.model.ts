import { tokenTypes } from "@configs/tokens";
import mongoose from "mongoose";

export interface TokenDocument extends mongoose.Document {
    token: string;
    user: mongoose.Types.ObjectId;
    type: string;
    expires: Date;
}

const tokenSchema = new mongoose.Schema<TokenDocument>(
    {
        token: {
            type: String,
            required: true,
            unique: true,
            index: true,
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        type: {
            type: String,
            required: true,
            enum: [tokenTypes.ACCESS, tokenTypes.REFRESH],
        },
        expires: {
            type: Date,
            required: true,
        },
    },
    {
        timestamps: {
            createdAt: "created_at",
            updatedAt: "updated_at",
        },
    }
);

/**
 * @typedef Token
 */
const Token = mongoose.model<TokenDocument>("Token", tokenSchema);

export default Token;
