import express from "express";
import cors from "cors";
import helmet from "helmet";
import hpp from "hpp";
import rateLimiter from "express-rate-limit";
import slowDown from "express-slow-down";
import cookieParser from "cookie-parser";
import compression from "compression";
import { ENV } from "./env.js";
import { fileURLToPath } from "url";
import { habitRouter } from "../routes/habit.routes.js";
import { userRouter } from "../routes/user.routes.js";
import path from "path";
import { requestsLoggerMiddleware } from "../middlewares/requestsLogger.middleware.js";
import { errorsHandlerMiddleware } from "../middlewares/errorsHandler.middleware.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const app = express();

// == Безопасность сервера ==
app.use(helmet());
app.disable("x-powered-by");
app.use(hpp());

// == Оптимизация сервера ==
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({
    extended: true,
    limit: "10kb",
}));
app.use(compression());

// == URL по которым можно делать запросы на сервер ==
app.use(cors({
    origin(origin, callback) {
        const allowed = [ENV.FRONTEND_ORIGIN];
        callback(null, allowed.includes(origin));
    },
    credentials: true,
}));

// == Ограничители запросов ==
const speedLimit = slowDown({
    windowMs: 1000 * 60 * 15,
    delayAfter: 50,
    delayMs: () => 500,
});
app.use(speedLimit);

const rateLimit = rateLimiter({
    windowMs: 1000 * 60 * 15,
    max: 100,
    standardHeaders: true,
    legacyHeaders: false,
});
app.use(rateLimit);

// == Куки ==
app.use(cookieParser({}));

// == Кастомные Middlewares ==
app.use(requestsLoggerMiddleware);

// == Роуты ==
app.use("/api", habitRouter);
app.use("/api", userRouter);

// == Роуты загрузок ==
app.use(
    "/api/uploads",
    (req, res, next) => {
        res.setHeader("Cross-Origin-Resource-Policy", "cross-origin");
        next();
    },
    express.static(path.join(__dirname, "../uploads/avatars"))
);

// == Обработчик ошибок ==
app.use(errorsHandlerMiddleware);