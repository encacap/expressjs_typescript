import authController from "@controllers/auth.controller";
import validate from "@middlewares/validate";
import authValidation from "@validations/auth.validation";
import express from "express";

const router = express.Router();

router.route("/login").post(validate(authValidation.login), authController.login);

export default router;
