import { slugify } from "@utils/helpers";
import mongoose from "mongoose";

export interface CityDocument extends mongoose.Document {
    ghn_ref: string;
    name: string;
    slug: string;
}

const citySchema = new mongoose.Schema<CityDocument>({
    ghn_ref: String,
    name: mongoose.SchemaTypes.String,
    slug: String,
});

citySchema.index({ name: "text" });

citySchema.pre("save", function createSlug(next) {
    if (this.isNew) {
        if (!this.slug) {
            this.slug = slugify(this.name);
        }
    }
    next();
});

/**
 * @typedef City
 */
const City = mongoose.model<CityDocument>("City", citySchema);

export default City;
