import axios from "axios";

export const api = axios.create({
    baseURL: "http://localhost:8080/api",
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
    },
});

const refreshInstance = axios.create({
    baseURL: "http://localhost:8080/api",
    withCredentials: true,
});

// перехватчик для добавления токена
api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    };
    return config;
});

// перехватчик для обновления токена
api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            if (originalRequest.url.includes("/refresh")) {
                return Promise.reject(error);
            };

            try {
                const refreshResponse = await refreshInstance.post("/refresh");
                const newAccessToken = refreshResponse.data.accessToken;
                localStorage.setItem("token", newAccessToken);

                originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
                console.log("токен успешно обновлён");

                return api(originalRequest);
            } catch (error) {
                console.log(`Ошибка при обновлении токена: ${error.message}`);
                localStorage.removeItem("token");
            };
        };

        return Promise.reject(error);
    }
);