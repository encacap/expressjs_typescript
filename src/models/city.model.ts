import mongoose from "mongoose";

export interface CityDocument extends mongoose.Document {
    name: string;
    slug: string;
}

const citySchema = new mongoose.Schema<CityDocument>({
    name: String,
    slug: String,
});

/**
 * @typedef City
 */
const City = mongoose.model<CityDocument>("City", citySchema);

export default City;
