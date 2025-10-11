export const errorsHandlerMiddleware = (error, req, res, next) => {
    console.group("ошибка");
    console.log(`Произошла ошибка: ${error.message}`);
    console.log(`URL: ${req.originalUrl}`);
    console.log(`Метод: ${req.method}`);
    console.groupEnd("ошибка");

    const errors = Array.isArray(error.errors) ?
        error.errors.map((e) => e.msg || e)
        : [];

    return res.status(error.statusCode || 500).json({
        success: false,
        message: error.message || "внутрення ошибка сервера",
        errors,
    });
}