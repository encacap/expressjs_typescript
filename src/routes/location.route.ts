import locationController from "@controllers/location.controller";
import auth from "@middlewares/auth";
import validate from "@middlewares/validate";
import locationValidation from "@validations/location.validation";
import express from "express";

const router = express.Router();

router
    .route("/cities")
    .get(validate(locationValidation.getCityList), locationController.getCityList)
    .post(auth("createCity"), validate(locationValidation.createCity), locationController.createCity);

router.route("/cities/:city_id").get(validate(locationValidation.getCityById), locationController.getCityById);

export default router;
