import { useState } from "react"

export const useForm = (initialValues = {}) => {
    const [fields, setFields] = useState(initialValues);

    // == Изменения поля ==
    const onFieldChange = (fieldName, value) => {
        setFields((prev) => ({
            ...prev,
            [fieldName]: value
        }));
    };

    // == Очищаем поля ==
    const clearFields = () => {
        const keys = Object.keys(fields);
        const clearedFields = {};
        for (const key of keys) {
            clearedFields[key] = "";
        };
        setFields(clearedFields);
    }

    return { fields, onFieldChange, clearFields };
};