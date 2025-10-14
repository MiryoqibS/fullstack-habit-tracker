import { Router } from "express";
import { habitController } from "../controllers/habit.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

// == Роутер для запросов к привычкам == 
export const habitRouter = Router();

/*
GET /habits/:userId (возвращает массив привычек)
GET /habits/:userId/:id (возвращает конкретную привычку)
POST /habits/:userId (добавляет новую привычку)
DELETE /habits/:userId/:id (удаляет привычку)
POST /habits/:id/star (сделать привычку избранной)
PUT /habits/:id (обновление данных привычек)
*/

habitRouter.post("/habits", authMiddleware, habitController.createHabit);
habitRouter.get("/habits", authMiddleware, habitController.getHabits);
habitRouter.get("/habits/today", authMiddleware, habitController.getTodayHabits);
habitRouter.get("/habits/stats", authMiddleware, habitController.getWeekStats);
habitRouter.get("/habits/:id", habitController.getHabitById);
habitRouter.delete("/habits/:id", habitController.deleteHabit);
habitRouter.post("/habits/:id/star", habitController.toggleStarHabit);
habitRouter.put("/habits/:id", habitController.updateHabit);