import { object, string } from "yup";

const login = {
    body: object().shape({
        email: string().required(),
        password: string().required(),
    }),
};

const logout = {
    body: object().shape({
        refresh_token: string().required(),
    }),
};

const refreshAuthToken = {
    body: object().shape({
        refresh_token: string().required(),
    }),
};

export default {
    login,
    logout,
    refreshAuthToken,
};
