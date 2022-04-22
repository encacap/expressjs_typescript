import { NextFunction, Request, Response, Send } from "express";

interface ResponseData {
    success: boolean;
    data?: object | object[];
    error?: object;
}

/**
 * Standardize the data to be returned to the client.
 * @param {any} rawData - The data to be returned.
 * @returns {ResponseData} - The standardized data.
 */
const standardizeData = (rawData: any): ResponseData => {
    const data = {} as ResponseData;
    if (rawData.code && rawData.message) {
        data.success = false;
        data.error = rawData;
        return data;
    }
    data.success = true;
    data.data = rawData;
    return data;
};

/**
 * Override the default Express response object to return standardized data.
 * @param {Request} _req - The Express request object.
 * @param {Response} res - The Express response object.
 * @param {NextFunction} next - The Express next function.
 */
const overrideJsonMethod = (_req: Request, res: Response, next: NextFunction) => {
    const originalJson = res.json;

    res.json = ((data) => {
        res.json = originalJson;
        res.json(standardizeData(data));
    }) as Send;
    next();
};

export default overrideJsonMethod;
