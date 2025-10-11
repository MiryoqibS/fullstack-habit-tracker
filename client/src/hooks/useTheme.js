import { useEffect, useState } from "react";

export const useTheme = () => {
    const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

    useEffect(() => {
        document.documentElement.setAttribute("data-theme", theme);
        localStorage.setItem("theme", theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme((prev) => prev === "light" ? "dark" : "light");
        localStorage.setItem("theme", theme);
    }

    return { theme, toggleTheme };
};