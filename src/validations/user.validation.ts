import { roles } from "@configs/roles";
import { object, string } from "yup";

const createUser = {
    body: object().shape({
        name: string().required(),
        email: string().email().required(),
        password: string().required(),
        role: string().required().oneOf(roles),
    }),
};

export default { createUser };
