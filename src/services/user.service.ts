import User, { UserDocument } from "@models/user.model";
import mongoose from "mongoose";

/**
 * Create a new user
 * @param userBody - The user's body
 * @returns {Promise<UserDocument>} - Returns the created user
 */
const createUser = async (userBody: UserDocument): Promise<UserDocument> => {
    const isEmailTaken = await User.isEmailTaken(userBody.email);
    if (isEmailTaken) {
        throw new Error("Email is already taken");
    }
    return User.create(userBody);
};

/**
 * Find a user by user's id, throw an error if not found
 * @param userId
 * @returns {Promise<UserDocument>}
 */
const getUserById = async (userId: mongoose.Types.ObjectId): Promise<UserDocument> => {
    const user = await User.findById(userId);
    if (!user) {
        throw new Error("User not found");
    }
    return user;
};

export default { createUser, getUserById };
