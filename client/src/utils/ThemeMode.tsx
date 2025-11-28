import React, {ReactNode, useContext, useEffect, useMemo, useState} from 'react';

interface ThemeContextType {
    themeMode: string | null;
    setThemeMode: (themeMode: string) => void;
}

const ThemeModeContext = React.createContext<ThemeContextType>({
    themeMode: "light",
    setThemeMode: () => {}
});

interface Props{
    children: ReactNode;
}

export const ThemeModeProvider = ({children}: Props) => {
    const darkQuery = window.matchMedia("(prefers-color-scheme: dark)");

    const [themeMode, setThemeMode] = useState(
        localStorage.getItem("themeMode")
            ? localStorage.getItem("themeMode")
            : darkQuery.matches ? "dark" : "light"
    );

    useEffect(() => {
        switch(themeMode){
            case "dark":
                document.documentElement.classList.add("dark");
                localStorage.setItem("themeMode", "dark");
                break;
            case "light":
                document.documentElement.classList.remove("dark");
                localStorage.setItem("themeMode", "light");
                break;
        }
    }, [themeMode]);

    const themeObject = useMemo(() => ({themeMode, setThemeMode}), [themeMode]);

    return <ThemeModeContext.Provider value={themeObject}>
        {children}
    </ThemeModeContext.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export const useThemeMode = () => useContext(ThemeModeContext);