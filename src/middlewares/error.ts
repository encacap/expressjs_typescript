import configs from "@configs/index";
import ApiError from "@utils/apiError";
import logger from "@utils/logger";
import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status-codes";

const errorConverter = (err: Error | ApiError, _req: Request, _res: Response, next: NextFunction) => {
    let error = err;
    if (!(error instanceof ApiError)) {
        const statusCode = httpStatus.INTERNAL_SERVER_ERROR;
        // eslint-disable-next-line security/detect-object-injection
        const message = error.message || httpStatus[statusCode];
        error = new ApiError(statusCode, message, false, err.stack);
    }
    next(error);
};

// eslint-disable-next-line no-unused-vars
const errorHandler = (err: ApiError, _req: Request, res: Response, _next: NextFunction) => {
    let { statusCode, message } = err;

    if (configs.env === "production" && !err.isOperational) {
        statusCode = httpStatus.INTERNAL_SERVER_ERROR;
        message = httpStatus[httpStatus.INTERNAL_SERVER_ERROR];
    }

    res.locals.errorMessage = err.message;

    const response = {
        code: statusCode,
        message,
        ...(configs.env === "development" && { stack: err.stack }),
    };

    if (configs.env === "development") {
        logger.error(err);
    }

    res.status(statusCode).send(response);
};

export { errorConverter, errorHandler };
