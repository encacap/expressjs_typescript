import userService from "@services/user.service";
import catchAsync from "@utils/catchAsync";
import httpStatus from "http-status-codes";

const createUser = catchAsync(async (req, res) => {
    const user = await userService.createUser(req.body);
    res.status(httpStatus.CREATED).send(user);
});

export default { createUser };
