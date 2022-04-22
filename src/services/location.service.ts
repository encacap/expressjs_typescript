import City, { CityDocument } from "@models/city.model";
import District, { DistrictDocument } from "@models/district.model";
import Ward, { WardDocument } from "@models/ward.model";
import ApiError from "@utils/apiError";
import httpStatus from "http-status-codes";
import { FilterQuery } from "mongoose";

/**
 * Create a new city
 * @param {CityDocument} cityBody
 * @returns {Promise<CityDocument>}
 */
const createCity = async (cityBody: CityDocument): Promise<CityDocument> => {
    const existedCity = await City.findOne({
        name: cityBody.name,
        ghn_ref: cityBody.ghn_ref,
    });
    if (existedCity) {
        return existedCity;
    }
    const city = new City(cityBody);
    return city.save();
};

/**
 * Get all cities by query
 * @param {FilterQuery<CityDocument>} filter - Query filter
 * @returns {Promise<CityDocument[]>}
 */
const getCityList = async (filter: FilterQuery<CityDocument>): Promise<CityDocument[]> => {
    return City.find(filter);
};

/**
 * Get a city by id, throw error if not found
 * @param {string} id - City's id
 * @returns {Promise<CityDocument>}
 */
const getCityById = async (id: string): Promise<CityDocument> => {
    const city = await City.findById(id);
    if (!city) {
        throw new ApiError(httpStatus.NOT_FOUND, "City not found");
    }
    return city;
};

/**
 * Update a city by id
 * @param {string} id - City's id
 * @param {CityDocument} cityBody
 * @returns {Promise<CityDocument>}
 */
const updateCityById = async (id: string, cityBody: CityDocument): Promise<CityDocument> => {
    const city = await getCityById(id);
    Object.assign(city, cityBody);
    return city.save();
};

/**
 * Delete a city by id
 * @param {string} id - City's id
 * @returns {Promise<CityDocument>}
 */
const deleteCityById = async (id: string): Promise<CityDocument> => {
    const city = await getCityById(id);
    return city.remove();
};

/**
 * Create a new district
 * @param {DistrictDocument} districtBody
 * @returns {Promise<DistrictDocument>}
 */
const createDistrict = async (districtBody: DistrictDocument): Promise<DistrictDocument> => {
    const existedDistrict = await District.findOne({
        slug: districtBody.slug,
        city: districtBody.city,
    });
    if (existedDistrict) {
        return existedDistrict;
    }
    const district = new District(districtBody);
    return district.save();
};

/**
 * Get all districts by query
 * @param {FilterQuery<DistrictDocument>} filter - Query filter
 * @returns {Promise<DistrictDocument[]>}
 */
const getDistrictList = async (filter: FilterQuery<DistrictDocument>): Promise<DistrictDocument[]> => {
    return District.find(filter);
};

/**
 * Get a district by id, throw error if not found
 * @param {string} id - District's id
 * @returns {Promise<DistrictDocument>}
 */
const getDistrictById = async (id: string): Promise<DistrictDocument> => {
    const district = await District.findById(id);
    if (!district) {
        throw new ApiError(httpStatus.NOT_FOUND, "District not found");
    }
    return district;
};

/**
 * Create a new ward
 * @param {WardDocument} wardBody
 * @returns {Promise<WardDocument>}
 */
const createWard = async (wardBody: WardDocument): Promise<WardDocument> => {
    const existedWard = await Ward.findOne({
        slug: wardBody.slug,
        district: wardBody.district,
    });
    if (existedWard) {
        return existedWard;
    }
    const ward = new Ward(wardBody);
    return ward.save();
};

/**
 * Get all wards by query
 * @param filter - Query filter
 * @returns {Promise<WardDocument[]>}
 */
const getWardList = async (filter: FilterQuery<WardDocument>): Promise<WardDocument[]> => {
    return Ward.find(filter);
};

/**
 * Get a ward by id, throw error if not found
 * @param id - Ward's id
 * @returns {Promise<WardDocument>}
 */
const getWardById = async (id: string): Promise<WardDocument> => {
    const ward = await Ward.findById(id);
    if (!ward) {
        throw new ApiError(httpStatus.NOT_FOUND, "Ward not found");
    }
    return ward;
};

export default {
    createCity,
    getCityList,
    getCityById,
    updateCityById,
    deleteCityById,
    createDistrict,
    getDistrictList,
    getDistrictById,
    createWard,
    getWardById,
    getWardList,
};
