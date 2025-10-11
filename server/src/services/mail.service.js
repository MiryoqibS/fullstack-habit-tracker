import nodemailer from "nodemailer";
import { ENV } from "../config/env.js";

class MailService {
    constructor() {
        this.transporter = nodemailer.createTransport({
            port: ENV.SMTP_PORT,
            host: ENV.SMTP_HOST,
            auth: {
                user: ENV.SMTP_USER,
                pass: ENV.SMTP_PASS,
            },
        });
    }

    // == Отправление письма с ссылкой подтверждения аккаунта ==
    async sendVerificationLink(to, link) {
        await this.transporter.sendMail({
            from: ENV.SMTP_USER,
            to,
            subject: "Подтверждения аккаунта",
            html:
                `
                <div style="font-family: Arial, sans-serif; line-height: 1.5;">
                    <h2>Добро пожаловать в HabitTracker!</h2>
                    <p>Чтобы завершить регистрацию, нажмите на кнопку ниже:</p>
                    <a href="${link}" 
                       style="display: inline-block; padding: 10px 20px; background: #4CAF50; color: #fff; text-decoration: none; border-radius: 5px;">
                       Подтвердить аккаунт
                    </a>
                    <p>Если вы не регистрировались — просто проигнорируйте это письмо.</p>
                </div>
                `
        });
    }
};

export const mailService = new MailService();