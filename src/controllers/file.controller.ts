import fileService, { PostType } from "@services/file.service";
import { Request, Response } from "express";

const getImageUploadSignature = async (req: Request, res: Response) => {
    const { post_type: postType } = req.query;
    const signature = fileService.getImageUploadSignature(postType as PostType);
    res.send(signature);
};

export default { getImageUploadSignature };
