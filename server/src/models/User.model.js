import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    avatarUrl: {
        type: String,
        default: "http://localhost:8080/api/uploads/default.webp",
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
    verificationCode: {
        type: String,
        required: false,
        default: null,
    },
    bio: {
        type: String,
        default: "",
    },
}, {
    timestamps: true,
    toObject: {
        transform(doc, ret) {
            ret.id = ret._id;
            delete ret._id;
            delete ret.__v;
            delete ret.password;
            return ret;
        }
    },
    toJSON: {
        transform(doc, ret) {
            ret.id = ret._id;
            delete ret._id;
            delete ret.__v;
            delete ret.password;
            return ret;
        }
    }
});

export const UserModel = mongoose.model("User", userSchema);