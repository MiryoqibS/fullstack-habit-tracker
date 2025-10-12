import multer from "multer";
import { v4 as uuidv4 } from "uuid";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// == Хранилище для хранения изображений пользователей ==
const storage = multer.diskStorage({
    // Путь файла
    destination(req, file, cb) {
        const filePath = path.join(__dirname, "../uploads/avatars");
        cb(null, filePath);
    },

    // Названые файла
    filename(req, file, cb) {
        const uniqueId = uuidv4();
        cb(null, uniqueId + path.extname(file.originalname));
    },
});

// == Функция для фильтрации файлов ==
const fileFilter = (req, file, cb) => {
    const allowed = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
    if (allowed.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error("Не поддерживаемый тип изображения"), false);
    };
};

// == Мидлварка ==
export const uploadAvatarImageMiddleware = multer({
    storage,
    fileFilter,
    limits: {
        fileSize: 5 * 1024 * 1024 // 5MB
    },
});