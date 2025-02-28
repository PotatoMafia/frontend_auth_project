import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const MFAPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [mfaCode, setMfaCode] = useState("");
    const [isMfaRequired, setIsMfaRequired] = useState(false); // Track if MFA is needed
    const [accessToken, setAccessToken] = useState(""); // Store JWT token for validation
    const { login } = useAuth();
    const navigate = useNavigate();

    // Handle the initial login (email/password)
    const handleLogin = async (e) => {
        e.preventDefault();
        setErrorMessage("");

        const body = { email, password };

        try {
            const response = await fetch("http://127.0.0.1:5000/authenticate_user", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body),
                credentials: "include",  // To include cookies with the session
            });

            const data = await response.json();
            if (!response.ok) throw new Error(data.message || "Invalid credentials");

            // If MFA is required, prompt for the MFA code
            if (data.message === "2FA code sent to email. Please verify it.") {
                setIsMfaRequired(true);
                setAccessToken(data.access_token); // Save the access token for MFA validation
            }

        } catch (error) {
            setErrorMessage(error.message);
        }
    };

    // Handle MFA validation
    const handleMfaValidation = async (e) => {
        e.preventDefault();
        setErrorMessage("");

        const body = { mfa_code: mfaCode };

        try {
            const response = await fetch("http://127.0.0.1:5000/validate_2fa", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${accessToken}` // Pass the access token for 2FA validation
                },
                body: JSON.stringify(body),
            });

            const data = await response.json();
            if (!response.ok) throw new Error(data.message || "Invalid 2FA code");
            console.log(data)
            login(data); // Save user data to context
            navigate("/main"); // Redirect to the main page
        } catch (error) {
            setErrorMessage(error.message);
        }
    };

    return (
        <div>
            <h2>Login</h2>
            {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
            {!isMfaRequired ? (
                <form onSubmit={handleLogin}>
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <button type="submit">Login</button>
                </form>
            ) : (
                <form onSubmit={handleMfaValidation}>
                    <input
                        type="text"
                        placeholder="Enter 2FA Code"
                        value={mfaCode}
                        onChange={(e) => setMfaCode(e.target.value)}
                        required
                    />
                    <button type="submit">Verify 2FA Code</button>
                </form>
            )}
        </div>
    );
};

export default MFAPage;
