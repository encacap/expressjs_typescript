import estateRouter from "@routes/estate.route";
import fileRouter from "@routes/file.route";
import userRouter from "@routes/user.route";
import express from "express";

const expressRouter = express.Router();

const defaultRoutes = [
    {
        path: "/users",
        router: userRouter,
    },
    {
        path: "/estates",
        router: estateRouter,
    },
    {
        path: "/files",
        router: fileRouter,
    },
];

defaultRoutes.forEach(({ path, router }) => {
    expressRouter.use(path, router);
});

export default expressRouter;
