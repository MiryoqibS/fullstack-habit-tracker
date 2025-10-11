export class ApiError extends Error {
    constructor(statusCode, message, errors = []) {
        super(message);
        this.statusCode = statusCode;
        this.errors = errors;
    }

    // == Ошибка не правильного запроса ==
    static BadRequestError(message, errors = []) {
        return new ApiError(400, message, errors);
    }

    // == Ошибка авторизации ==
    static UnauthorizedError() {
        return new ApiError(401, "пользователь не авторизован");
    }
}