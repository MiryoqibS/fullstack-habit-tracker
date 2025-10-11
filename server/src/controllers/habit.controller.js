import { ApiError } from "../errors/ApiError.js";
import { habitService } from "../services/habit.service.js";

class HabitController {
    // == Добавление задачи ==
    async createHabit(req, res, next) {
        try {
            const userId = req.user.id;
            if (!req.body) throw ApiError.BadRequestError("данные не были переданы");
            const habit = await habitService.createHabit(userId, req.body);

            return res.status(201).json({
                success: true,
                habit,
            });
        } catch (error) {
            next(error);
        }
    }

    // == Получение всех привычек ==
    async getHabits(req, res, next) {
        try {
            const userId = req.user.id;
            const habits = await habitService.getHabits(userId);

            return res.status(200).json({
                success: true,
                habits,
            });
        } catch (error) {
            next(error);
        }
    }

    // == Получение недельных привычек ==
    async getWeekStats(req, res, next) {
        try {
            const userId = req.user.id;
            const stats = await habitService.getWeekStats(userId);

            return res.status(200).json({
                success: true,
                stats,
            });
        } catch (error) {
            next(error);
        }
    }

    // == Получение сегодняшних привычек ==
    async getTodayHabits(req, res, next) {
        try {
            const userId = req.user.id;
            const habits = await habitService.getTodayHabits(userId);

            return res.status(200).json({
                success: true,
                habits,
            });
        } catch (error) {
            next(error);
        }
    }

    // == Получение конкретной привычки ==
    async getHabitById(req, res, next) {
        try {
            const { id } = req.params;
            if (!id) throw ApiError.BadRequestError("идентификатор привычки не был передан");
            const habit = await habitService.getHabitById(id);

            return res.status(200).json({
                success: true,
                habit,
            });
        } catch (error) {
            next(error);
        }
    }
}

export const habitController = new HabitController();