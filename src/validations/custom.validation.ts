import mongoose from "mongoose";

function isValidObjectId(id: string): boolean {
    const { path, createError } = this;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return createError({
            path,
            message: `${path} is not a valid MongoDB ObjectId`,
        });
    }
    return true;
}

export { isValidObjectId };
