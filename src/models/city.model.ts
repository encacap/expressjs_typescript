import mongoose from "mongoose";

export interface CityDocument extends mongoose.Document {
    ghn_ref: string;
    name: string;
    slug: string;
}

const citySchema = new mongoose.Schema<CityDocument>({
    ghn_ref: String,
    name: String,
    slug: String,
});

/**
 * @typedef City
 */
const City = mongoose.model<CityDocument>("City", citySchema);

export default City;
