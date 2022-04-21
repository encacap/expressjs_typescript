import User, { UserDocument } from "@models/user.model";

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

export default { createUser };
