import express, { json } from "express";
import dotenv from "dotenv";
import { APP_CONSTANTS } from "./common/constants/app-constants";
import corsMiddleware from "./common/middlewares/cors.middleware";
import requestLogger from "./common/middlewares/request.logger.middelware";

dotenv.config();

const app = express();

app.use(requestLogger);

app.use(
    json({
        limit: APP_CONSTANTS.JSON_LIMIT,
    })
);

app.use(express.urlencoded({ extended: true }));
app.use(corsMiddleware);
app.use(express.static("public"));

export default app;
