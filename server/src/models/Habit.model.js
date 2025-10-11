import mongoose from "mongoose";

const HabitSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        default: "",
    },
    daysOfWeek: {
        type: [Number],
        default: [],
        validate: {
            validator: (arr) => arr.every(day => day >= 0 && day <= 6),
            message: "Дни недели должны быть от 0 до 6"
        }
    },
    isActive: {
        type: Boolean,
        default: true,
    },
    logs: [{
        date: { type: Date, required: true },
        isCompleted: { type: Boolean, default: true }
    }]
}, {
    timestamps: true,
    toObject: {
        transform(doc, ret) {
            ret.id = ret._id;
            delete ret._id;
            delete ret.__v;
            return ret;
        }
    },
    toJSON: {
        transform(doc, ret) {
            ret.id = ret._id;
            delete ret._id;
            delete ret.__v;
            return ret;
        }
    },
});

export const HabitModel = mongoose.model("Habit", HabitSchema);