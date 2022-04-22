import authRouter from "@routes/auth.route";
import estateRouter from "@routes/estate.route";
import fileRouter from "@routes/file.route";
import locationRouter from "@routes/location.route";
import userRouter from "@routes/user.route";
import express from "express";

const expressRouter = express.Router();

const defaultRoutes = [
    {
        path: "/auth",
        router: authRouter,
    },
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
    {
        path: "/locations",
        router: locationRouter,
    },
];

defaultRoutes.forEach(({ path, router }) => {
    expressRouter.use(path, router);
});

export default expressRouter;
