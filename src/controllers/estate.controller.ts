import estateService from "@services/estate.service";
import { Request, Response } from "express";

const createEstate = async (req: Request, res: Response) => {
    const estateData = req.body;
    const savedEstate = await estateService.createEstate(estateData);
    res.send(savedEstate);
};

const getEstateList = async (_req: Request, res: Response) => {
    const estateList = await estateService.getEstateList();
    res.send(estateList);
};

export default { createEstate, getEstateList };
