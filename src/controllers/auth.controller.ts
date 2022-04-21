import authService from "@services/auth.service";
import tokenService from "@services/token.service";
import catchAsync from "@utils/catchAsync";
import httpStatus from "http-status-codes";

const login = catchAsync(async (req, res) => {
    const { email, password } = req.body;
    const user = await authService.loginWithEmailAndPassword(email, password);
    const tokens = await tokenService.generateAuthToken(user);
    res.send({
        user,
        tokens,
    });
});

const logout = catchAsync(async (req, res) => {
    const { refresh_token: refreshToken } = req.body;
    await authService.logout(refreshToken);
    res.status(httpStatus.NO_CONTENT).send();
});

const refreshAuthToken = catchAsync(async (req, res) => {
    const { refresh_token: refreshToken } = req.body;
    const tokens = await authService.refreshAuthToken(refreshToken);
    res.send({ ...tokens });
});

export default {
    login,
    logout,
    refreshAuthToken,
};
