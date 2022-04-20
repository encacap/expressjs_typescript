import { extractConfigsFromEnvs } from "@utils/cloudinary";
import dotenv from "dotenv";
import path from "path";
import { number, object, string } from "yup";

dotenv.config({
    path: path.join(__dirname, "..", "..", `.env.${process.env.NODE_ENV}`),
});

const envConfigsSchema = object({
    NODE_ENV: string().required(),
    HOSTNAME: string().required(),
    PORT: number().required(),
    MONGODB_URL: string().required(),
    SSL_PRIVATE_KEY: string().required(),
    SSL_CERTIFICATE: string().required(),
    CLOUDINARY_ESTATE_ONE: string().required(),
    CLOUDINARY_NEWS_ONE: string().required(),
    JWT_SECRET: string().required(),
    JWT_ACCESS_EXPIRATION_MINUTES: number().required(),
    JWT_REFRESH_EXPIRATION_DAYS: number().required(),
});

const validEnvConfigs = envConfigsSchema.validateSync(process.env);

const configs = {
    env: validEnvConfigs.NODE_ENV,
    server: {
        hostname: validEnvConfigs.HOSTNAME,
        port: validEnvConfigs.PORT,
    },
    mongodb: {
        url: validEnvConfigs.MONGODB_URL,
        options: {},
    },
    ssl: {
        privateKey: path.join(__dirname, "..", "..", validEnvConfigs.SSL_PRIVATE_KEY),
        certificate: path.join(__dirname, "..", "..", validEnvConfigs.SSL_CERTIFICATE),
    },
    cloudinary: extractConfigsFromEnvs(validEnvConfigs),
    jwt: {
        secret: validEnvConfigs.JWT_SECRET,
        accessExpirationMinutes: validEnvConfigs.JWT_ACCESS_EXPIRATION_MINUTES,
        refreshExpirationDays: validEnvConfigs.JWT_REFRESH_EXPIRATION_DAYS,
    },
};

export default configs;
