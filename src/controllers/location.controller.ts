import locationService from "@services/location.service";
import catchAsync from "@utils/catchAsync";
import httpStatusCode from "http-status-codes";

const createCity = catchAsync(async (req, res) => {
    const { body: cityBody } = req;
    const city = await locationService.createCity(cityBody);
    res.status(httpStatusCode.CREATED).send(city);
});

const getCityList = catchAsync(async (req, res) => {
    const { query: filter } = req;
    if (filter.name || filter.slug) {
        filter.$text = { $search: filter.name as string };
    }
    const cities = await locationService.getCityList(filter);
    res.json(cities);
});

const getCity = catchAsync(async (req, res) => {
    const {
        params: { city_id: cityId },
    } = req;
    const city = await locationService.getCityById(cityId);
    res.json(city);
});

const updateCity = catchAsync(async (req, res) => {
    const {
        params: { city_id: cityId },
        body: cityBody,
    } = req;
    const city = await locationService.updateCityById(cityId, cityBody);
    res.json(city);
});

const deleteCity = catchAsync(async (req, res) => {
    const {
        params: { city_id: cityId },
    } = req;
    const city = await locationService.deleteCityById(cityId);
    res.status(httpStatusCode.NO_CONTENT).json(city);
});

export default {
    createCity,
    getCityList,
    getCity,
    updateCity,
    deleteCity,
};
