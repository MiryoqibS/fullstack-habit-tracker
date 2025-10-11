import { ApiError } from "../errors/ApiError.js";
import { tokenService } from "../services/token.service.js";

export const authMiddleware = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader) throw ApiError.UnauthorizedError();

        const token = authHeader.split(" ")[1];
        if (!token) throw ApiError.UnauthorizedError();

        const userData = tokenService.validateAccessToken(token);
        if (!userData) throw ApiError.UnauthorizedError();

        req.user = userData;
        next();
    } catch (error) {
        next(error);
    }
};