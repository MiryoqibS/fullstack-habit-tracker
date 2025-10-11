# `Habit Tracker` — система привычек

---

## 🎯 Цель проекта

создать полноценное приложение для отслеживания привычек — от бекенда до интерфейса.
Проект учебный, но с планами на развитие (улучшение API, аутентификация, статистика и мобильная версия).

---

## ⚙️ Технологии

### 🔹 Backend:

- Express.js — серверная часть
- Mongoose — работа с MongoDB
- JWT / Middleware — авторизация
- Node.js — среда выполнения

### 🔹 Frontend:

- React — интерфейс
- TailwindCSS — быстрая и адаптивная стилизация
- Axios / Fetch — работа с API
- React Router — маршрутизация между страницами

## 🗂️ Структура проекта

```bash
habit-tracker/
│
├── backend/
│   ├── models/
│   ├── routes/
│   ├── controllers/
│   ├── utils/
│   └── server.js
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── hooks/
│   │   ├── services/
│   │   └── App.jsx
│   └── package.json
│
└── README.md
```

> 📌 Backend и frontend развиваются параллельно, но связаны через REST API.

---

## 🚀 Запуск проекта

### 🔧 1. Клонируй репозиторий

```bash
git clone https://github.com/your-username/habit-tracker.git
cd habit-tracker
```

### 🛠️ 2. Установка зависимостей

```bash
cd backend
npm install

cd ../frontend
npm install
```

### ▶️ 3. Запуск разработки

```bash
# Запуск сервера
cd backend
npm run dev

# Запуск клиента
cd ../frontend
npm run dev
```

---

## 📊 Возможности (на текущий момент)

- REST API для работы с привычками
- Создание и хранение привычек
- Логирование по дням недели
- Получение статистики за неделю
- Удобный UI/UX для использования

---

## ❤️ Автор

👨‍💻 [Miryoqib (MiryoqibS)](https://github.com/MiryoqibS) — backend + frontend разработчик, создающий Habit Tracker с нуля.
Учебный проект, который со временем станет полноценным приложением.
