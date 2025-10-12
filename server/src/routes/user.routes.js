import { Router } from "express";
import { userController } from "../controllers/user.controller.js";
import { body } from "express-validator";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { uploadAvatarImageMiddleware } from "../middlewares/uploadAvatarImage.middleware.js";

// == Роутер для запросов пользователей (система аккаунтов) ==
export const userRouter = Router();

/*
POST /register (регистрация)
POST /login (авторизация)
GET /profile (получение профиля)
POST /refresh (обновление токена)
POST /logout (выход из аккаунта)
GET /verify/:code (подтверждения аккаунта)
PUT /profile/avatar (изменение фото профиля) -
PUT /update (изменение данных пользователя)
GET /users (получение списка пользователей)
POST /profile/avatar (обновление фото профиля)
*/

userRouter.post("/register",
    body("email")
        .isEmail()
        .withMessage("некорректный email"),
    body("password")
        .isLength({ min: 4, max: 32 })
        .withMessage("пароль должен быть от 4 до 32 символов"),
    body("username")
        .isLength({ min: 6, max: 16 })
        .withMessage("имя пользователя должно быть от 6 до 16 символов"),
    userController.register
);

userRouter.post("/login", userController.login);
userRouter.get("/profile", authMiddleware, userController.getProfile);
userRouter.post("/refresh", userController.refresh);
userRouter.post("/logout", userController.logout);
userRouter.get("/verify/:code", userController.verify);
userRouter.get("/users", authMiddleware, userController.getUsers);
userRouter.put("/update", authMiddleware, userController.updateUser);
userRouter.post("/profile/avatar",
    authMiddleware,
    uploadAvatarImageMiddleware.single("avatar"),
    userController.updateAvatar
);