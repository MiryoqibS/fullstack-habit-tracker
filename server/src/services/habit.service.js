import { HabitModel } from "../models/Habit.model.js";
import { ApiError } from "../errors/ApiError.js";

class HabitService {
    // == Создание привычки ==
    async createHabit(userId, { title, description, daysOfWeek }) {
        if (!userId) throw ApiError.UnauthorizedError();

        const habit = await HabitModel.create({
            user: userId,
            title,
            description,
            daysOfWeek,
        });

        return habit.toObject();
    }
    // == Получение всех привычек ==
    async getHabits(userId) {
        const habits = await HabitModel.find({ user: userId });
        return habits || [];
    }

    async getWeekStats(userId) {
        // получаем текущую дату
        const today = new Date();
        const currentDayOfWeak = today.getDay();

        // Вычисляем понедельник текущей недели
        const monday = new Date(today);
        monday.setDate(today.getDate() - ((currentDayOfWeak + 6) % 7));

        // получаем все привычки пользователя
        const habits = await HabitModel.find({ user: userId, isActive: true });
        // получаем логи последних 7 дней привычек
        const logs = habits.flatMap((habit) => habit.logs || []);

        const weekStats = [];

        for (let i = 0; i < 7; i++) {
            const day = new Date(monday);
            day.setDate(monday.getDate() + i);
            const weekdays = ["Вс", "Пн", "Вт", "Ср", "Чг", "Пт", "Сб"];
            const dayOfWeek = day.getDay();
            const totalHabits = habits.filter(habit => habit.daysOfWeek.includes(dayOfWeek)).length;
            const habitsCompleted = logs.filter(
                log =>
                    new Date(log).toDateString() === day.toDateString()
                    && log.isCompleted
            ).length;

            weekStats.push({
                day: day.getDate(),
                weekday: weekdays[day.getDay()],
                totalHabits,
                habitsCompleted,
            });
        }

        return weekStats;
    }

    // == Получение сегодняшних привычек ==
    async getTodayHabits(userId) {
        if (!userId) throw ApiError.UnauthorizedError();
        const today = new Date().getDay();
        console.log(today);

        const habits = await HabitModel.find({
            user: userId,
            daysOfWeek: { $in: [today] },
            isActive: true,
        })

        return habits;
    }

    // == Получение привычки по идентификатору ==
    async getHabitById(id) {
        const habit = await HabitModel.findById(id);
        if (!habit) throw ApiError.BadRequestError("привычка по такому идентификатору не был найден");
        return habit;
    }

    // == Удаление привычки по идентификатору ==
    async deleteHabit(id) {
        if (!id) throw ApiError.BadRequestError("не валидный идентификатор привычки");
        const deletedHabit = await HabitModel.findByIdAndDelete(id);
        return deletedHabit;
    }
};

export const habitService = new HabitService();
