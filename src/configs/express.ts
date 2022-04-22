import * as morgan from "@configs/morgan";
import jwtStrategy from "@configs/passport";
import { errorConverter, errorHandler } from "@middlewares/error";
import overrideJsonMethod from "@middlewares/standardizeData";
import commonRoutes from "@routes/common";
import ApiError from "@utils/apiError";
import compression from "compression";
import cors from "cors";
import express, { NextFunction, Request, Response } from "express";
import helmet from "helmet";
import httpStatus from "http-status-codes";
import passport from "passport";
import xssClean from "xss-clean";

const createServer = (): express.Application => {
    const app = express();

    app.use(cors());
    app.use(helmet());
    app.use(xssClean());
    app.use(compression());

    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    app.use(morgan.successHandler);
    app.use(morgan.errorHandler);

    app.use(passport.initialize());
    passport.use("jwt", jwtStrategy);

    app.use(overrideJsonMethod);

    // Routes
    app.use("/", commonRoutes);

    // Catch 404 error
    app.use((_req: Request, _res: Response, next: NextFunction) => {
        next(new ApiError(httpStatus.NOT_FOUND, "Not Found"));
    });
    app.use(errorConverter);
    app.use(errorHandler);

    return app;
};

export default createServer;
