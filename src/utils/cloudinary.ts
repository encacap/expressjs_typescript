import crypto from "crypto";
import _ from "lodash";

interface CloudinaryConfig {
    cloud_name: string;
    api_key: string;
    api_secret: string;
}

interface CloudinaryConfigs {
    estate: [CloudinaryConfig];
    news: [CloudinaryConfig];
}

/**
 * Extract cloudinary configs from environment variables
 * @param envConfigs All the configs for the current environment
 * @returns {CloudinaryConfigs}
 */
const extractConfigsFromEnvs = (envConfigs: Object): CloudinaryConfigs => {
    return _.keys(envConfigs).reduce((cloudinaryConfigs: CloudinaryConfigs, envConfigKey) => {
        if (_.startsWith(envConfigKey, "CLOUDINARY_")) {
            const configType = _.lowerCase(_.split(envConfigKey, "_")[1]);
            const envConfig = envConfigs[String(envConfigKey)];
            const [cloudName, apiKey, apiSecret] = envConfig.split("/");
            const config = { cloud_name: cloudName, api_key: apiKey, api_secret: apiSecret };
            if (!cloudinaryConfigs[String(configType)]) {
                // eslint-disable-next-line no-param-reassign
                cloudinaryConfigs[String(configType)] = [config];
            } else {
                cloudinaryConfigs[String(configType)].push({
                    cloud_name: cloudName,
                    api_key: apiKey,
                    api_secret: apiSecret,
                });
            }
        }
        return cloudinaryConfigs;
    }, {} as CloudinaryConfigs);
};

type ImageSizes = "thumbnail" | "small" | "large";

const availableTransformations = {
    thumbnail: "c_thumb,g_center,w_300",
    small: "c_thumb,g_center,w_80",
    large: "c_thumb,g_center,w_400",
};

/**
 * Get the transformation string for the given image size
 * @param size Image size type
 * @returns {string} Transformation string for cloudinary
 */
const getTransformationString = (size?: ImageSizes): string => {
    if (size) {
        return availableTransformations[size];
    }
    return _.values(availableTransformations).join("|");
};

interface UploadSignature {
    signature: string;
    timestamp: number;
    api_key: string;
    eager: string;
}

const generateUploadSignature = (cloudinary: CloudinaryConfig): UploadSignature => {
    const timestamp = _.now();
    const eager = getTransformationString();
    const signature = crypto
        .createHmac("sha1", cloudinary.api_secret)
        .update(`eager=${eager}&timestamp=${timestamp}${cloudinary.api_secret}`)
        .digest("hex");
    return { signature, timestamp, api_key: cloudinary.api_key, eager };
};

export { extractConfigsFromEnvs, getTransformationString, generateUploadSignature };
