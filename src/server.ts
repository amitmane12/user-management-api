import type { Response } from "express";
import app from "./app";
import { env } from "./config/env.config";
import connectDatabase from "./infrastructure/database/connect-database";
const PORT = env.PORT;

const startServer = async (): Promise<void> => {
    await connectDatabase();

    app.get("/health", (_, res: Response) => {
        res.status(200).json({
            message: "success",
        });
    });
    app.listen(PORT, () => {
        console.log(`app is listing on PORT: ${PORT}`);
    });
};

startServer();
