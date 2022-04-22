import { object, string } from "yup";
import { isValidObjectId } from "./custom.validation";

const createCity = {
    body: object().shape({
        name: string().required(),
        slug: string(),
        ghn_ref: string().required(),
    }),
};

const getCityList = {
    query: object()
        .shape({
            name: string(),
            slug: string(),
        })
        .unknown(true),
};

const getCity = {
    params: object().shape({
        city_id: string().test(isValidObjectId).required(),
    }),
};

const updateCity = {
    params: object().shape({
        city_id: string().test(isValidObjectId).required(),
    }),
    body: object().shape({
        name: string(),
        slug: string(),
        ghn_ref: string(),
    }),
};

const deleteCity = {
    params: object().shape({
        city_id: string().test(isValidObjectId).required(),
    }),
};

export default {
    createCity,
    getCityList,
    getCity,
    updateCity,
    deleteCity,
};
