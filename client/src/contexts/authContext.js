import { createContext } from "react";

export const authContext = createContext({
    user: null,
    setUser: () => { },
    isLoading: true,
});