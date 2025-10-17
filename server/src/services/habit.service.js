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
            const dayOfWeek = day.getDay();
            const totalHabits = habits.filter(habit => habit.daysOfWeek.includes(dayOfWeek)).length;
            const habitsCompleted = logs.filter(
                log =>
                    new Date(log).toDateString() === day.toDateString()
            ).length;

            weekStats.push({
                day: day.getDate(),
                weekday: day.getDay(),
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

    // == Отметить привычку как избранную ==
    async toggleStarHabit(id) {
        if (!id) throw ApiError.BadRequestError("не валидный идентификатор привычки");
        const habit = await HabitModel.findById(id);
        if (!habit) throw ApiError.BadRequestError("привычка не была найдена");
        habit.isStarred = !habit.isStarred;
        await habit.save();
        return habit;
    }

    // == Обновление данных привычки ==
    async updateHabit(id, updatedFields) {
        if (!id) throw ApiError.BadRequestError("не валидный идентификатор привычки");
        if (!updatedFields) throw ApiError.BadRequestError("не валидные поля привычки");

        const allowedFields = ["title", "description", "daysOfWeek"];
        const filteredFields = {};

        for (const key in updatedFields) {
            const value = updatedFields[key];
            if (allowedFields.includes(key)) {
                filteredFields[key] = value;
            };
        }

        const habit = await HabitModel.findByIdAndUpdate(id, filteredFields, {
            new: true
        });

        return habit.toObject();
    }

    // == Получение привычек по дню недели ==
    async getHabitsByWeekday(userId, weekday) {
        if (!userId) throw ApiError.UnauthorizedError();
        if (weekday < 0 || weekday > 6) throw ApiError.BadRequestError("не валидный день недели");

        const habits = await HabitModel.find({
            user: userId,
            daysOfWeek: { $in: [weekday] },
        });

        return habits.map(habit => habit.toObject());
    };

    // == Отметить привычку как выполненную ==
    async completeHabit(userId, habitId) {
        if (!userId) throw ApiError.UnauthorizedError();
        if (!habitId) throw ApiError.BadRequestError("не валидный идентификатор привычки");

        const habit = await HabitModel.findOne({
            _id: habitId,
            user: userId,
        });

        if (!habit) throw ApiError.BadRequestError("привычка не была найдена");
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        if (!habit.daysOfWeek.includes(today.getDay())) throw ApiError.BadRequestError("привычку нельзя ответить так как она не добавлена в этот день недели");

        const alreadyLogged = habit.logs.some(log => {
            const loggedDate = new Date(log);
            loggedDate.setHours(0, 0, 0, 0);
            return loggedDate.getTime() === today.getTime();
        });

        if (alreadyLogged) throw ApiError.BadRequestError("привычка уже выполнена сегодня");
        habit.logs.push(new Date());

        await habit.save();

        return habit.toObject();
    }
};

export const habitService = new HabitService();
