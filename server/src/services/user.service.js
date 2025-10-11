import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";
import { ENV } from "../config/env.js";
import { ApiError } from "../errors/ApiError.js";
import { UserModel } from "../models/User.model.js";
import { mailService } from "./mail.service.js";
import { tokenService } from "./token.service.js";

class UserService {
    // == Регистрация пользователя ==
    async register({ username, email, password, passwordRepeat }) {
        if (!username) throw ApiError.BadRequestError("Имя пользователя не валидное");
        if (!email) throw ApiError.BadRequestError("Электронная почта не валидная");
        if (!password) throw ApiError.BadRequestError("Пароль не валидный");
        if (!passwordRepeat) throw ApiError.BadRequestError("Пароли не совпадают");
        if (passwordRepeat !== password) throw ApiError.BadRequestError("Пароли не совпадают");

        // проверка нету ли пользователя с такой почтой
        const candidate = await UserModel.findOne({ email });
        if (candidate) throw ApiError.BadRequestError("Пользователя с такой почтой уже существует");

        // Хеширование пароля
        const salt = Number(ENV.SALT_ROUNDS) || 10;
        const hashedPassword = await bcrypt.hash(password, salt);

        // Ссылка подтверждения аккаунта 
        const verificationCode = uuidv4();
        const verificationLink = `${ENV.API_URL}/api/verify/${verificationCode}`;

        // Отправка письма
        await mailService.sendVerificationLink(email, verificationLink);

        const user = await UserModel.create({
            username,
            email,
            password: hashedPassword,
            verificationCode,
        });

        const userObject = user.toObject();

        const tokens = tokenService.generateTokens(userObject);
        await tokenService.saveToken(userObject.id, tokens.refreshToken);

        return { ...tokens, user: userObject };
    }

    // == Подтверждение аккаунта ==
    async verifyAccount(verificationCode) {
        const user = await UserModel.findOne({ verificationCode });
        if (!user) throw ApiError.BadRequestError("аккаунт не был найден");
        user.isVerified = true;
        user.verificationCode = null;
        await user.save();
        return user.toObject();
    }

    // == Авторизация пользователя ==
    async login({ email, password }) {
        const user = await UserModel.findOne({ email });
        if (!user) throw ApiError.BadRequestError("пользователя с такой почтой не существует");

        const isVerified = user.isVerified;
        if (!isVerified) throw ApiError.BadRequestError("пользователь не подтвердил аккаунт");

        const isPasswordMatch = await bcrypt.compare(password, user.password);

        if (!isPasswordMatch) throw ApiError.BadRequestError("не правильная электронная почта или пароль");

        const userObject = user.toObject();
        const tokens = tokenService.generateTokens(userObject);

        await tokenService.saveToken(userObject.id, tokens.refreshToken);
        return { ...tokens, user: userObject };
    }

    // == Обновление (refresh) токена ==
    async refresh(refreshToken) {
        if (!refreshToken) throw ApiError.UnauthorizedError();

        const userData = tokenService.validateRefreshToken(refreshToken);
        const token = await tokenService.findToken(refreshToken);

        if (!userData || !token) throw ApiError.UnauthorizedError();

        const user = await UserModel.findById(userData.id);
        const userObject = user.toObject();
        const tokens = tokenService.generateTokens(userObject);

        await tokenService.saveToken(userObject.id, tokens.refreshToken);
        return { ...tokens, user: userObject };
    }

    // == Выход из аккаунта ==
    async logout(refreshToken) {
        const token = await tokenService.deleteToken(refreshToken);
        return token;
    }

    // == Получение профиля пользователя ==
    async getProfile(id) {
        const user = await UserModel.findById(id);
        return user.toObject();
    }

    // == Получение списка пользователей ==
    async getUsers() {
        const users = await UserModel.find();
        return users || [];
    }

    // == Обновление данных пользователя ==
    async updateUser(userId, updatedFields) {
        if (!userId) throw ApiError.UnauthorizedError();
        if (!updatedFields) throw ApiError.BadRequestError("поля для изменения не были переданы");

        const filteredFields = {};
        const allowedFields = ["username", "bio"];

        for (const key in updatedFields) {
            if (allowedFields.includes(key)) {
                filteredFields[key] = updatedFields[key];
            };
        };

        return await UserModel.findByIdAndUpdate(
            userId,
            { $set: filteredFields },
            { new: true },
        );
    }
};

export const userService = new UserService();