import fileController from "@controllers/file.controller";
import validate from "@middlewares/validate";
import fileValidation from "@validations/file.validation";
import express from "express";

const router = express.Router();

router
    .route("/images/signature")
    .get(validate(fileValidation.getUploadImageSignature), fileController.getImageUploadSignature);

export default router;
