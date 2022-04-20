import ApiError from "@utils/apiError";
import pick from "@utils/pick";
import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status-codes";
import { object, ValidationError } from "yup";
import { ObjectShape } from "yup/lib/object";

const validate = (schema: ObjectShape) => (req: Request, _res: Response, next: NextFunction) => {
    const validSchema = pick(schema, ["body", "params", "query"]) as ObjectShape;
    const requestObject = pick(req, Object.keys(validSchema));
    const validationResult = object().shape(validSchema).validate(requestObject, { abortEarly: false });

    validationResult
        .then(() => {
            next();
        })
        .catch((error: ValidationError) => {
            const errorMessage = error.inner.map((err: Error) => err.message).join(", ");
            next(new ApiError(httpStatus.BAD_REQUEST, errorMessage));
        });
};

export default validate;
