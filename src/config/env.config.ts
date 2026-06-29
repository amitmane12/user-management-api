import "dotenv/config";
const handleMissingValue = (value: any) => {
    throw new Error(`${value} is not provided !`);
};

export const env = {
    PORT: process.env.PORT ?? 5000,
    MONGODB_URI: process.env.MONGODB_URI ?? handleMissingValue("MONGODB_URI"),

    DB_NAME: process.env.DB_NAME ?? handleMissingValue("DB_NAME"),
    NODE_ENV: process.env.NODE_ENV,
    ACCESS_TOKEN_SECRET:
        process.env.ACCESS_TOKEN_SECRET ??
        handleMissingValue("ACCESS_TOKEN_SECRET"),
    ACCESS_TOKEN_EXPIRY:
        process.env.ACCESS_TOKEN_SECRETE_EXPIRY ??
        handleMissingValue("ACCESS_TOKEN_SECRETE_EXPIRY"),
    REFRESH_TOKEN_SECRET:
        process.env.REFRESH_TOKEN_SECRET ??
        handleMissingValue("REFRESH_TOKEN_SECRET"),
    REFRESH_TOKEN_EXPIRY:
        process.env.REFRESH_TOKEN_SECRETE_EXPIRY ??
        handleMissingValue("REFRESH_TOKEN_SECRETE_EXPIRY"),
};
