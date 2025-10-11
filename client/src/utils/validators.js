export const validateEmail = (email) => {
    let errorMessage = "";
    let isValid = true;

    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (String(email).trim().length === 0) {
        isValid = false;
        errorMessage = "введите электронную почту"
    } else if (!regex.test(email)) {
        isValid = false;
        errorMessage = "не валидная электронная почта"
    };

    return {
        isValid,
        errorMessage,
    };
};

export const validatePassword = (password) => {
    const value = String(password).trim();

    if (value.length === 0) {
        return {
            isValid: false,
            errorMessage: "введите пароль",
        };
    }

    if (value.length < 8) {
        return {
            isValid: false,
            errorMessage: "пароль должен содержать минимум 8 символов",
        };
    }

    if (!/[a-z]/.test(value)) {
        return {
            isValid: false,
            errorMessage: "пароль должен содержать хотя бы одну строчную букву",
        };
    }

    if (!/[A-Z]/.test(value)) {
        return {
            isValid: false,
            errorMessage: "пароль должен содержать хотя бы одну заглавную букву",
        };
    }

    if (!/\d/.test(value)) {
        return {
            isValid: false,
            errorMessage: "пароль должен содержать хотя бы одну цифру",
        };
    }

    if (!/[!@#$%^&*()_\-+=<>?{}[\]~]/.test(value)) {
        return {
            isValid: false,
            errorMessage: "пароль должен содержать хотя бы один спецсимвол",
        };
    }

    return {
        isValid: true,
        errorMessage: "",
    };
};
