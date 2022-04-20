import estateController from "@controllers/estate.controller";
import express from "express";

const router = express.Router();

router.route("/").get(estateController.getEstateList);

export default router;
