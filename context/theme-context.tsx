import React, {
    createContext,
    useContext,
    useState,
} from "react";

export type Theme = "light" | "dark";

type ThemeContextType = {
    theme: Theme;
    setTheme: (theme: Theme) => void;
    toggleTheme: () => void;
};

const ThemeContext =
    createContext<ThemeContextType>(
        {} as ThemeContextType
    );

export function ThemeProvider({
                                  children,
                              }: {
    children: React.ReactNode;
}) {
    const [theme, setTheme] =
        useState<Theme>("dark");

    const toggleTheme = () =>
        setTheme(t =>
            t === "dark"
                ? "light"
                : "dark"
        );

    return (
        <ThemeContext.Provider
            value={{
                theme,
                setTheme,
                toggleTheme,
            }}
        >
            {children}
        </ThemeContext.Provider>
    );
}

export function useTheme() {
    return useContext(ThemeContext);
}