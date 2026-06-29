import cors from "cors";

const corsOptions: cors.CorsOptions = {
    origin: process.env.CORS_ORIGIN?.split(",") ?? [],
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
};

export default cors(corsOptions);
