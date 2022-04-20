import mongoose from "mongoose";
import { array, boolean, number, object, string } from "yup";

const imageShape = object().shape({
    origin: string().required(),
    resource_type: string().oneOf(["image", "video"]).required(),
    cloud_name: string().required(),
    action: string().required(),
    version: number().required(),
    file_name: string().required(),
    public_id: string().required(),
    extension: string().required(),
});

const createEstate = {
    body: object().shape({
        custom_id: string(),
        priority: number(),
        is_published: boolean(),
        title: string().required(),
        description: string(),
        price: string().required(),
        square: string().required(),
        category: string().is([mongoose.Types.ObjectId]),
        properties: array().of(
            object().shape({
                name: string().required(),
                slug: string().required(),
            })
        ),
        location: object().shape({
            street: string(),
            ward: string().is([mongoose.Types.ObjectId]).required(),
            district: string().is([mongoose.Types.ObjectId]).required(),
            city: string().is([mongoose.Types.ObjectId]).required(),
        }),
        contact: object().shape({
            name: string().required(),
            phone: string().required(),
        }),
        avatar: imageShape,
        images: array().of(imageShape),
        videos: array().of(string()),
    }),
};

export default { createEstate };
