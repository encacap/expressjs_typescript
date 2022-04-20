import configs from "@configs/index";
import dayjs from "dayjs";
import path from "path";
import winston from "winston";

const isDevelopmentEnvironment = configs.env === "development";

const enumerateErrorFormat = winston.format((info) => {
    if (info instanceof Error) {
        Object.assign(info, {
            message: info.stack,
        });
        return info;
    }
    return info;
});

const timestampFormat = winston.format((info) => {
    Object.assign(info, {
        timestamp: dayjs().format("YYYY-MM-DD HH:mm:ss"),
    });
    return info;
});

const printLogFormat = winston.format.printf((info) => {
    if (isDevelopmentEnvironment) {
        return `${info.level}: ${info.message}`;
    }
    return `[${info.timestamp}] [${info.level}] ${info.message}`;
});

const logger = winston.createLogger({
    level: isDevelopmentEnvironment ? "debug" : "info",
    format: winston.format.combine(
        enumerateErrorFormat(),
        isDevelopmentEnvironment ? winston.format.colorize() : winston.format.uncolorize(),
        isDevelopmentEnvironment && timestampFormat(),
        printLogFormat
    ),
    transports: [
        new winston.transports.Console({
            stderrLevels: ["error"],
        }),
        new winston.transports.File({
            filename: path.join(__dirname, "..", "..", "logs", "information.log"),
            level: "info",
        }),
        new winston.transports.File({
            filename: path.join(__dirname, "..", "..", "logs", "errors.log"),
            level: "error",
        }),
    ],
});

export default logger;
