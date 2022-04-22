import mongoose from "mongoose";

export interface DistrictDocument extends mongoose.Document {
    name: string;
    slug: string;
    city: mongoose.Schema.Types.ObjectId;
}

interface DistrictModel extends mongoose.Model<DistrictDocument> {
    isExisted: (slug: string, city: mongoose.Schema.Types.ObjectId) => Promise<boolean>;
}

const districtSchema = new mongoose.Schema<DistrictDocument, DistrictModel>({
    name: String,
    slug: String,
    city: {
        type: mongoose.Types.ObjectId,
        ref: "City",
    },
});

/**
 * Check if district existed
 * @param slug - Slug of district
 * @param city - City of district
 * @returns {Promise<boolean>}
 */
districtSchema.statics.isExisted = async function isExisted(
    slug: string,
    city: mongoose.Schema.Types.ObjectId
): Promise<boolean> {
    const district = await this.findOne({
        slug,
        city,
    });
    return !!district;
};

/**
 * @typedef District
 */
const District = mongoose.model<DistrictDocument, DistrictModel>("District", districtSchema);

export default District;
