import { ENV } from "../config/env.js";
import { ApiError } from "../errors/ApiError.js";
import { userService } from "../services/user.service.js";
import { validationResult } from "express-validator";

class UserController {
    // == Регистрация пользователя ==
    async register(req, res, next) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) throw ApiError.BadRequestError("не валидные данные", errors.array());

            const { user, accessToken, refreshToken } = await userService.register(req.body);

            res.cookie("refreshToken", refreshToken, {
                httpOnly: true,
                secure: true,
                sameSite: "strict",
                maxAge: 1000 * 60 * 60 * 24 * 15
            });

            return res.status(201).json({
                success: true,
                message: "аккаунт успешно был создан",
                user,
                accessToken,
            });
        } catch (error) {
            next(error);
        }
    }

    // == Авторизация пользователя ==
    async login(req, res, next) {
        try {
            const { user, accessToken, refreshToken } = await userService.login(req.body);

            res.cookie("refreshToken", refreshToken, {
                httpOnly: true,
                secure: true,
                sameSite: "strict",
                maxAge: 1000 * 60 * 60 * 24 * 15
            });

            return res.status(200).json({
                success: true,
                message: "вы успешно вошли в аккаунт",
                user,
                accessToken,
            })
        } catch (error) {
            next(error);
        }
    }

    // == Получение профиля ==
    async getProfile(req, res, next) {
        try {
            console.log(req.user);

            const user = await userService.getProfile(req.user.id);

            return res.status(200).json({
                success: true,
                user,
            });
        } catch (error) {
            next(error);
        }
    }

    // == Обновление токена ==
    async refresh(req, res, next) {
        try {
            const refreshToken = req.cookies.refreshToken;
            if (!refreshToken) throw ApiError.UnauthorizedError();

            const { user, accessToken, refreshToken: newRefreshToken } = await userService.refresh(refreshToken);

            res.cookie("refreshToken", newRefreshToken, {
                httpOnly: true,
                secure: true,
                sameSite: "strict",
                maxAge: 1000 * 60 * 60 * 24 * 15
            });

            return res.status(200).json({
                success: true,
                message: "токен успешно обновлён",
                user,
                accessToken,
            });
        } catch (error) {
            next(error);
        }
    }

    // == Выход из аккаунта ==
    async logout(req, res, next) {
        try {
            const refreshToken = req.cookies.refreshToken;
            await userService.logout(refreshToken);

            res.clearCookie("refreshToken", {
                httpOnly: true,
                secure: true,
                sameSite: "strict",
                maxAge: 1000 * 60 * 60 * 24 * 15
            });

            return res.status(200).json({
                success: true,
                message: "вы успешно вышли из аккаунта"
            });
        } catch (error) {
            next(error);
        }
    }

    // == Подтверждения аккаунта ==
    async verify(req, res, next) {
        try {
            const code = req.params.code;
            if (!code) throw ApiError.BadRequestError("не валидный код подтверждения");
            await userService.verifyAccount(code);
            return res.status(300).redirect(`${ENV.FRONTEND_ORIGIN}`);
        } catch (error) {
            next(error);
        }
    }

    // == Получение списка пользователей ==
    async getUsers(req, res, next) {
        try {
            const user = req.user;
            if (!user) throw ApiError.UnauthorizedError();

            const users = await userService.getUsers();

            return res.status(200).json({
                success: true,
                users,
            });
        } catch (error) {
            next(error);
        }
    }

    // == Обновление данных пользователя ==
    async updateUser(req, res, next) {
        try {
            const userId = req.user.id;
            const updatedFields = req.body;
            const updatedUser = await userService.updateUser(userId, updatedFields);

            return res.status(200).json({
                success: true,
                message: "данные были успешно обновлены",
                user: updatedUser.toObject(),
            });
        } catch (error) {
            next(error);
        };
    }

    // == Обновление фото профиля ==
    async updateAvatar(req, res, next) {
        try {
            const userId = req.user.id;
            const file = req.file;
            const { avatarUrl, user } = await userService.updateAvatar(userId, file);
            return res.status(200).json({
                success: true,
                message: "фото профиля было успешно обновлено",
                avatarUrl,
                user,
            });
        } catch (error) {
            next(error);
        };
    }
}

export const userController = new UserController();