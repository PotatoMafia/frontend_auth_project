import 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Импорты для страниц
import LoginChoicePage from './component/LoginChoicePage';
import LoginForm from './component/LoginForm';
import LoginOtp from './component/LoginOtp';
import Login2fa from './component/Login2fa';

function App() {
    return (
        <Router>
            <div className="App">
                <h1>Authentication App</h1>
                <Routes>
                    <Route path="/" element={<LoginChoicePage />} /> {/* Страница выбора способа логина */}
                    <Route path="/login" element={<LoginForm />} />  {/* Страница для логина с email и паролем */}
                    <Route path="/login-otp" element={<LoginOtp />} /> {/* Страница для логина через OTP */}
                    <Route path="/login-2fa" element={<Login2fa />} /> {/* Страница для логина через 2FA */}
                </Routes>
            </div>
        </Router>
    );
}

export default App;
