import jwt from "jsonwebtoken";
import { ENV } from "../config/env.js";
import { TokenModel } from "../models/Token.model.js";

class TokenService {
    // == Генерация токенов ==
    generateTokens(payload) {
        const accessToken = jwt.sign(payload, ENV.ACCESS_TOKEN_SECRET, {
            expiresIn: "5m"
        });

        const refreshToken = jwt.sign(payload, ENV.REFRESH_TOKEN_SECRET, {
            expiresIn: "15d"
        });

        return { accessToken, refreshToken };
    }

    // == Валидация (Access) токена ==
    validateAccessToken(token) {
        try {
            const data = jwt.verify(token, ENV.ACCESS_TOKEN_SECRET);
            return data;
        } catch (error) {
            return null;
        };
    }

    // == Валидация (Refresh) токена ==
    validateRefreshToken(token) {
        try {
            const data = jwt.verify(token, ENV.REFRESH_TOKEN_SECRET);
            return data;
        } catch (error) {
            return null;
        };
    }

    // == Сохранение токенов ==
    async saveToken(userId, refreshToken) {
        const decoded = jwt.decode(refreshToken);
        const expiresAt = new Date(decoded.exp * 1000);

        const tokenData = await TokenModel.findOne({ user: userId });
        if (tokenData) {
            tokenData.refreshToken = refreshToken;
            tokenData.expiresAt = expiresAt;
            return await tokenData.save();
        };

        const token = await TokenModel.create({
            user: userId,
            refreshToken,
            expiresAt,
        });

        return token;
    }

    // == Удаление токена ==
    async deleteToken(refreshToken) {
        const token = await TokenModel.deleteOne({ refreshToken })
        return token;
    }

    // == Поиск токена ==
    async findToken(refreshToken) {
        const token = await TokenModel.findOne({ refreshToken })
        return token;
    }
};

export const tokenService = new TokenService();