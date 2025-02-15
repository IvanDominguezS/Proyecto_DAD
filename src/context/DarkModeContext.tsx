import { createContext, ReactNode, useContext, useState } from 'react';

const DarkMode = createContext<{ isDarkMode: boolean, setIsDarkMode: any } | null>(null);
export const DarkModeProvider = ({ children } : { children: ReactNode }) => {
    const [isDarkMode, setIsDarkMode] = useState(false);

    return (
        <DarkMode.Provider value={{ isDarkMode, setIsDarkMode }}>
            {children}
        </DarkMode.Provider>
    );
};

export const useDarkMode = () => { //Hook personalizado para usar el contexto.
    const context = useContext(DarkMode);

    if(!context) throw new Error("Debe usarse dentro de un DarkModeContext."); //Solo dará error cuando no hemos llamado al Provider.
    else return context;
}
