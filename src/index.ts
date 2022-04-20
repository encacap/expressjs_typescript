import createServer from "@configs/express";
import configs from "@configs/index";
import logger from "@utils/logger";
import { readFileSync } from "fs";
import https from "https";
import moduleAlias from "module-alias";
import mongoose from "mongoose";
import { AddressInfo } from "net";

const sourcePath = "./src";

moduleAlias.addAliases({
    "@configs": `${sourcePath}/configs`,
    "@services": `${sourcePath}/services`,
    "@utils": `${sourcePath}/utils`,
    "@controllers": `${sourcePath}/controllers`,
    "@models": `${sourcePath}/models`,
    "@routes": `${sourcePath}/routes`,
    "@middlewares": `${sourcePath}/middlewares`,
    "@validations": `${sourcePath}/validations`,
});

const SSL_PRIVATE_KEY = readFileSync(configs.ssl.privateKey);
const SSL_CERTIFICATE = readFileSync(configs.ssl.certificate);

const startServer = async () => {
    const app = createServer();
    const server = https
        .createServer(
            {
                key: SSL_PRIVATE_KEY,
                cert: SSL_CERTIFICATE,
            },
            app
        )
        .listen(
            {
                host: configs.server.hostname,
                port: configs.server.port,
            },
            () => {
                const addressInfo = server.address() as AddressInfo;
                logger.info(`Server is running on https://${configs.server.hostname}:${addressInfo.port}`);
                mongoose.connect(configs.mongodb.url, configs.mongodb.options).then((data) => {
                    logger.info(`MongoDB is running on ${data.connection.host}:${data.connection.port}`);
                });
            }
        );

    const signalTraps: NodeJS.Signals[] = ["SIGINT", "SIGTERM"];
    signalTraps.forEach((signal: NodeJS.Signals) => {
        process.once(signal, async () => {
            logger.info(`Received ${signal} signal.`);

            server.close(() => {
                logger.info("Server is closed.");
            });
        });
    });
};

startServer();
