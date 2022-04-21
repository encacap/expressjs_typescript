import _ from "lodash";

interface UserRoles {
    user: string[];
    admin: string[];
}

const allRoles: UserRoles = {
    user: [],
    admin: ["getUsers", "manageUsers"],
};

const roles = _.keys(allRoles);
const roleRights = new Map(_.entries(allRoles));

export { roles, roleRights };