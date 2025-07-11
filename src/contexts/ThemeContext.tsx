import React, { createContext, useContext, useState, ReactNode } from 'react';

const lightTheme = {
    colors: {
        background: '#ffffff',
        text: '#000000',
        primary: '#6200ee',
    },
};

const darkTheme = {
    colors: {
        background: '#000000',
        text: '#ffffff',
        primary: '#bb86fc',
    },
};

type ThemeContextType = {
    theme: typeof lightTheme;
    toggleTheme: () => void;
    isDark: boolean;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
    const [isDark, setIsDark] = useState(false);
    const toggleTheme = () => setIsDark(!isDark);

    return (
        <ThemeContext.Provider
            value={{ theme: isDark ? darkTheme : lightTheme, toggleTheme, isDark }}
        >
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) throw new Error('useTheme must be used within a ThemeProvider');
    return context;
};
