import express from "express";

import routes from "./routes/index.js";
import errorMiddleware from "./middlewares/error.middleware.js";
import authRoutes from "../modules/auth/auth.routes.js";
import userRoutes from "../modules/users/user.routes.js";

const app = express();

app.use(express.json());

app.use("/api/v1", routes);

app.use(errorMiddleware);

router.use("/auth", authRoutes);
router.use("/users", userRoutes);

export default app;