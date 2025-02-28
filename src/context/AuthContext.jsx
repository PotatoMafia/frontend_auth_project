import { createContext, useState, useContext } from "react";

const AuthContext = createContext();


// eslint-disable-next-line react/prop-types
export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem("token"));
    const [loginChoice, setLoginChoice] = useState(null); // Stores the chosen login method (regular or MFA)
    const [user, setUser] = useState(null);

    // Login function
    const login = (userData) => {
        setToken(userData.token);
        setUser(userData);
        localStorage.setItem("token", userData.token); // Сохраняем токен в localStorage для устойчивости после перезагрузки
    };

    // Register function
    const register = async (data) => {
        try {
            const response = await fetch("http://localhost:5000/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                const errorData = await response.json();
                alert(errorData.message); // Display error message from backend
                return false;
            }

            const result = await response.json();
            alert(result.message); // Successful registration message
            return true;
        } catch (error) {
            alert("Registration failed: " + error.message);
            return false;
        }
    };

    const logout = () => {
        setToken(null);
        localStorage.removeItem("token");
        setLoginChoice(null); // Reset login choice
    };

    return (
        <AuthContext.Provider value={{ token,user, login, register, logout, loginChoice, setLoginChoice }}>
            {children}
        </AuthContext.Provider>
    );

};

export const useAuth = () => {
    return useContext(AuthContext);
};