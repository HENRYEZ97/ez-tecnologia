import { createContext, useContext, useEffect, useState } from "react";

interface AuthContextProps {
    usuarioLogado: boolean;
    login: () => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export function
AuthProvider({ children }:
{ children: React.ReactNode }) {
    const [usuarioLogado, setUsuarioLogado] = useState(false);

    useEffect(() => {
        const usuario = localStorage.getItem("usuarioLogado");
        setUsuarioLogado(usuario === "true");
    }, []);

    const login = () => {
        localStorage.setItem("usuarioLogado", "true");
        setUsuarioLogado(true);
    };

    const logout = () => {
        localStorage.removeItem("usuarioLogado");
        localStorage.removeItem("dadosUsuarioLogado");
        setUsuarioLogado(false);
    };

    return (
        <AuthContext.Provider value={{ usuarioLogado, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}
export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth precisa estar dentro do AuthProvider");
    }
    return context;
}