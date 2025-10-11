export const requestsLoggerMiddleware = (req, res, next) => {
    res.on("finish", () => {
        console.group("запрос");
        console.log("================================================");
        console.log(`Время: ${new Date().toISOString()}`);
        console.log(`URL: ${req.originalUrl}`);
        console.log(`Метод: ${req.method}`);
        console.log(`Статус: ${res.statusCode}`);
        console.log("================================================");
        console.groupEnd("запрос");
    });

    next();
};