import { roles } from "@configs/roles";
import bcrypt from "bcryptjs";
import mongoose, { Model } from "mongoose";
import validator from "validator";

export interface UserDocument extends mongoose.Document {
    name: string;
    email: string;
    password: string;
    role: string;
    comparePassword: (password: String) => Promise<boolean>;
}

interface UserModal extends Model<UserDocument> {
    isEmailTaken: (email: string, excludeUserId?: mongoose.Types.ObjectId) => Promise<boolean>;
}

const userSchema = new mongoose.Schema<UserDocument, UserModal>(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            lowercase: true,
            validate: (value: String) => {
                if (!validator.isEmail(value)) {
                    throw new Error("Email is invalid");
                }
            },
        },
        password: {
            type: String,
            required: true,
            trim: true,
            select: false,
        },
        role: {
            type: String,
            required: true,
            enum: roles,
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
 * Check if the user's email is taken
 * @param email - The email of the user
 * @param excludeUserId - The user id to exclude from the search
 * @returns {Promise<Boolean>} - Returns true if the email is taken, false otherwise
 */
userSchema.statics.isEmailTaken = async function checkEmailExists(
    email: string,
    excludeUserId?: mongoose.Types.ObjectId
): Promise<boolean> {
    const user = await this.findOne({ email, _id: { $ne: excludeUserId } });
    return !!user;
};

/**
 * Check if the password matches the user's password
 * @param password - The password to compare
 * @returns {Promise<boolean>} - Return true if the password is match, false otherwise
 */
userSchema.methods.comparePassword = async function comparePassword(password: String): Promise<boolean> {
    const user = this;
    const isMatch = await bcrypt.compare(password, user.password);
    return isMatch;
};

userSchema.pre<UserDocument>("save", async function hashPassword(next) {
    const user = this;
    if (user.isModified("password")) {
        user.password = await bcrypt.hash(user.password, 8);
    }
    return next();
});

/**
 * @typedef User
 */
const User = mongoose.model<UserDocument, UserModal>("User", userSchema);

export default User;
