import "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import LoginPage from "./component/LoginPage.jsx";
import MainPage from "./component/MainPage.jsx";
import MfaPage from "./component/MFAPage.jsx";
import LoginChoicePage from "./component/LoginChoicePage.jsx";
import { AuthProvider, useAuth } from "./context/AuthContext";

// eslint-disable-next-line react/prop-types
const PrivateRoute = ({ children }) => {
    const { token } = useAuth();

    // Если пользователь не зарегистрирован или не авторизован, перенаправляем на страницу выбора способа входа
    if (!token) {
        return <Navigate to="/login-choice" />;
    }

    return children; // Если пользователь авторизован, показываем защищенную страницу
};


function App() {
    return (
        <AuthProvider>
            <Router>
                <Routes>
                    <Route path="/" element={<LoginChoicePage />} /> {/* Страница выбора способа входа */}
                    <Route path="/login" element={<LoginPage />} /> {/* Страница логина с паролем */}
                    <Route path="/mfa" element={<MfaPage />} /> {/* Страница двухфакторной аутентификации */}
                    <Route path="/login-choice" element={<LoginChoicePage />} /> {/* Страница выбора входа */}
                    <Route
                        path="/main"
                        element={
                            <PrivateRoute>
                                <MainPage />
                            </PrivateRoute>
                        }
                    />
                    <Route path="*" element={<Navigate to="/login-choice" />} /> {/* Страница по умолчанию */}
                </Routes>
            </Router>
        </AuthProvider>
    );
}

export default App;
