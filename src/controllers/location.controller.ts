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
    const cities = await locationService.getCityList({
        $text: { $search: filter.name as string },
    });
    res.send(cities);
});

const getCityById = catchAsync(async (req, res) => {
    const {
        params: { city_id: cityId },
    } = req;
    const city = await locationService.getCityById(cityId);
    res.send(city);
});

export default {
    createCity,
    getCityList,
    getCityById,
};
