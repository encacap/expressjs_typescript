import { NextFunction, Request, Response } from "express";

// eslint-disable-next-line no-unused-vars
type CatchAsyncFn = (req: Request, res: Response, next: NextFunction) => Promise<any>;

const catchAsync = (fn: CatchAsyncFn) => (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
};

export default catchAsync;
