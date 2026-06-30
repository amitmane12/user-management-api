import express, { json } from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import { APP_CONSTANTS } from "./common/constants/app-constants";
import corsMiddleware from "./common/middlewares/cors.middleware";
import requestLogger from "./common/middlewares/request.logger.middelware";
import router from "./modules/user/user.routes";
import errorHandler from "./common/middlewares/error.middleware";
dotenv.config();

const app = express();

app.use(requestLogger);

app.use(
    json({
        limit: APP_CONSTANTS.JSON_LIMIT,
    })
);

app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(corsMiddleware);
app.use(express.static("public"));
app.use(`${APP_CONSTANTS.API_PREFIX}/users`, router);
app.use(errorHandler);
export default app;
