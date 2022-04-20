import configs from "@configs/index";
import ApiError from "@utils/apiError";
import { generateUploadSignature } from "@utils/cloudinary";
import httpStatus from "http-status-codes";
import _ from "lodash";

export type PostType = "estate" | "news";

const getImageUploadSignature = (postType: PostType) => {
    try {
        const availableClouds = configs.cloudinary[postType];
        const selectedCloud = _.sample(availableClouds);
        return generateUploadSignature(selectedCloud);
    } catch (error: any) {
        throw new ApiError(
            httpStatus.INTERNAL_SERVER_ERROR,
            error?.message || "Error while generating upload signature"
        );
    }
};

export default { getImageUploadSignature };
