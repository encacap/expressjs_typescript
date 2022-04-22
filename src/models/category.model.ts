import mongoose from "mongoose";

export interface CategoryDocument extends mongoose.Document {
    name: string;
    slug: string;
}

const categorySchema = new mongoose.Schema<CategoryDocument>({
    name: String,
    slug: String,
});

/**
 * @typedef Category
 */
const Category = mongoose.model<CategoryDocument>("Category", categorySchema);

export default Category;
