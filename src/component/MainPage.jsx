import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const MainPage = () => {
    const { token, user } = useAuth(); // Check if the user is logged in using token or user info
    const navigate = useNavigate();

    useEffect(() => {
        if (!token || !user) {
            // Redirect to login choice page if the user is not logged in
            navigate("/login-choice");
        }
    }, [token, user, navigate]);

    return (
        <div>
            <h1>Welcome to the main page!</h1>
            <p>Youre successfully logged in.</p>
        </div>
    );
};

export default MainPage;
