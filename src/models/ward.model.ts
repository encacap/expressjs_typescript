import mongoose from "mongoose";

export interface WardDocument extends mongoose.Document {
    name: string;
    slug: string;
    district: mongoose.Schema.Types.ObjectId;
}

interface WardModel extends mongoose.Model<WardDocument> {
    isExisted: (slug: string, district: mongoose.Schema.Types.ObjectId) => Promise<boolean>;
}

const wardSchema = new mongoose.Schema<WardDocument, WardModel>({
    name: String,
    slug: String,
    district: {
        type: mongoose.Types.ObjectId,
        ref: "District",
    },
});

/**
 * Check if ward existed
 * @param {string} slug - Slug of ward
 * @param {mongoose.Schema.Types.ObjectId} district - City of district
 * @returns {Promise<boolean>}
 */
wardSchema.statics.isExisted = async function isExisted(
    slug: string,
    district: mongoose.Schema.Types.ObjectId
): Promise<boolean> {
    const ward = await this.findOne({
        slug,
        district,
    });
    return !!ward;
};

/**
 * @typedef Ward
 */
const Ward = mongoose.model<WardDocument, WardModel>("Ward", wardSchema);

export default Ward;
