import React, { useState } from "react";
import styles from "./Login.module.css";

const Login = () => {
    const [credentials, setCredentials] = useState({ email: "", password: "" });
    const [error, setError] = useState("");

    // Handle input change
    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    // Handle Login Submission
    const handleLogin = (e) => {
        e.preventDefault();
        setError(""); // Clear previous errors

        // Simple Validation
        if (!credentials.email || !credentials.password) {
            setError("⚠ Please fill in all fields.");
            return;
        }

        // Sample Hardcoded Credentials (Replace with API Call)
        const dummyUser = {
            email: "rahul.bharti232@gmail.com",
            password: "12345",
        };

        if (credentials.email === dummyUser.email && credentials.password === dummyUser.password) {
            alert("✅ Login Successful!");
            // Redirect to Dashboard (Can be replaced with useNavigate or history.push)
            window.location.href = "/dashboard";
        } else {
            setError("❌ Invalid email or password.");
        }
    };

    return (
        <div className={styles.loginContainer}>
            <form className={styles.loginForm} onSubmit={handleLogin}>
                <h2>🔑 Admin Login</h2>

                {error && <p className={styles.error}>{error}</p>}

                <input
                    type="email"
                    name="email"
                    placeholder="Enter Email"
                    value={credentials.email}
                    onChange={handleChange}
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Enter Password"
                    value={credentials.password}
                    onChange={handleChange}
                />

                <button type="submit" className={styles.loginBtn}>Login</button>
            </form>
        </div>
    );
};

export default Login;
