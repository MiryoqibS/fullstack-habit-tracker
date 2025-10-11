import { connectDatabase } from "./config/database.js";
import { app } from "./config/server.js";
import { ENV } from "./config/env.js";

// == Запуск сервера ==
const PORT = ENV.PORT;

const start = async () => {
    try {
        await connectDatabase();
        const server = app.listen(PORT, () => {
            console.log(`сервер запущен на порту: ${PORT}`);
        });
        return server;
    } catch (error) {
        console.log(`Не удалось запустить сервер: ${error.message}`);
    }
};

start();