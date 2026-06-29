import pino, { type LoggerOptions } from "pino";

const loggerOptions: LoggerOptions = {
    level: process.env.LOG_LEVEL ?? "info",

    //   base: {
    //     service: "auth-api",
    //   },

    timestamp: pino.stdTimeFunctions.isoTime,
};

if (process.env.NODE_ENV !== "production") {
    loggerOptions.transport = {
        target: "pino-pretty",
        options: {
            colorize: true,
            translateTime: "SYS:standard",
            ignore: "pid,hostname",
        },
    };
}

export const logger = pino(loggerOptions);
