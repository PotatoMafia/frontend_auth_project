import "react";
import { useNavigate } from "react-router-dom";

const LoginChoicePage = () => {
    const navigate = useNavigate(); // Используем хук useNavigate

    const handleLoginClick = () => {
        navigate("/login");  // Переход к странице с простым логином
    };

    const handleMfaLoginClick = () => {
        navigate("/mfa");  // Переход к странице с MFA
    };

    return (
        <div>
            <h2>Выберите способ входа</h2>
            <button onClick={handleLoginClick}>Войти с логином и паролем</button>
            <button onClick={handleMfaLoginClick}>Войти с двухфакторной аутентификацией</button>
        </div>
    );
};

export default LoginChoicePage;
