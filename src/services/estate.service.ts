import Estate, { EstateDocument } from "@models/estate.model";
import mongoose from "mongoose";

interface EstateFilter extends mongoose.FilterQuery<EstateDocument> {
    title?: string;
}

interface EstateOptions {
    limit?: number;
    page?: number;
}

const createEstate = async (data: EstateDocument): Promise<EstateDocument> => {
    const estate = new Estate(data);
    return estate.save();
};

const getEstateList = async (
    filter?: EstateFilter,
    options?: EstateOptions
): Promise<mongoose.PaginateResult<EstateDocument>> => {
    return Estate.paginate(filter, options);
};

export default { createEstate, getEstateList };
