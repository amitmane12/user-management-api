import pinoHttp from "pino-http";
import { logger } from "../../config/logger";
const requestLogger = pinoHttp({
    logger,

    customLogLevel(_, res, err) {
        if (res.statusCode >= 500 || err) return "error";

        if (res.statusCode >= 400) return "warn";

        return "info";
    },

    customSuccessMessage(req, _) {
        return `${req.method} ${req.url}`;
    },

    customErrorMessage(req, _) {
        return `${req.method} ${req.url}`;
    },

    serializers: {
        req(req) {
            return {
                method: req.method,
                url: req.url,
                ip: req.ip,
            };
        },
    },
});

export default requestLogger;
