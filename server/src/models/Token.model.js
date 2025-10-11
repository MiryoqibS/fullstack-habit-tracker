import mongoose from "mongoose";

const tokenSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        unique: true,
    },
    refreshToken: {
        type: String,
        required: true,
        index: true,
    },
    expiresAt: {
        type: Date,
        required: true,
        index: { expires: 0 }
    },
}, { timestamps: true });

export const TokenModel = mongoose.model("Token", tokenSchema);