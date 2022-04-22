import { roleRights } from "@configs/roles";
import { UserDocument } from "@models/user.model";
import ApiError from "@utils/apiError";
import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status-codes";
import passport from "passport";

const verifyCallback =
    (req: Request, resolve: Function, reject: Function, requiredRights: string[]) =>
    async (error: Error, user: UserDocument, info: any) => {
        if (error || info || !user) {
            return reject(new ApiError(httpStatus.UNAUTHORIZED, "Unauthorized"));
        }

        req.user = user;

        if (requiredRights.length) {
            const userRights = roleRights.get(user.role);
            const hasRequiredRights = requiredRights.every((requiredRight) => userRights.includes(requiredRight));
            if (!hasRequiredRights && req.params.user_id !== user._id) {
                return reject(new ApiError(httpStatus.FORBIDDEN, "Forbidden"));
            }
        }

        return resolve(user);
    };

const auth =
    (...requiredRights: string[]) =>
    async (req: Request, res: Response, next: NextFunction) => {
        return new Promise((resolve, reject) => {
            passport.authenticate(
                "jwt",
                {
                    session: false,
                },
                verifyCallback(req, resolve, reject, requiredRights)
            )(req, res, next);
        })
            .then(() => next())
            .catch((error) => next(error));
    };

export default auth;
