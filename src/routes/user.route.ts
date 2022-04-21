import userController from "@controllers/user.controller";
import auth from "@middlewares/auth";
import validate from "@middlewares/validate";
import userValidation from "@validations/user.validation";
import express from "express";

const router = express.Router();

router.route("/").post(auth("createUser"), validate(userValidation.createUser), userController.createUser);

export default router;
