import mongoose from "mongoose";

export interface ImageDocument extends mongoose.Document {
    origin: string;
    resource_type: "image" | "video";
    cloud_name: string;
    action: string;
    version: number;
    file_name: string;
    public_id: string;
    extension: string;
}

const imageSchema = new mongoose.Schema<ImageDocument>({
    origin: String,
    resource_type: {
        type: String,
        enum: ["image", "video"],
    },
    cloud_name: String,
    action: String,
    version: Number,
    file_name: String,
    public_id: String,
    extension: String,
});

/**
 * @typedef Image
 */
const Image = mongoose.model<ImageDocument>("Image", imageSchema);

export default Image;
