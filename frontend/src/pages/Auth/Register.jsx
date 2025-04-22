import React, { useState } from "react";
import styles from "./Register.module.css";

const Register = () => {
    const [user, setUser] = useState({
        name: "",
        email: "",
        password: "",
        role: "student",
        department: "",
    });

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    // Handle input change
    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    // Handle Registration Submission
    const handleRegister = (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        // Simple Validation
        if (!user.name || !user.email || !user.password || !user.department) {
            setError("⚠ Please fill in all fields.");
            return;
        }

        // Simulated Registration Success
        setSuccess("✅ Registration Successful! You can now login.");
        setUser({ name: "", email: "", password: "", role: "student", department: "" });
    };

    return (
        <div className={styles.registerContainer}>
            <form className={styles.registerForm} onSubmit={handleRegister}>
                <h2>📝 Register</h2>

                {error && <p className={styles.error}>{error}</p>}
                {success && <p className={styles.success}>{success}</p>}

                <input
                    type="text"
                    name="name"
                    placeholder="Full Name"
                    value={user.name}
                    onChange={handleChange}
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={user.email}
                    onChange={handleChange}
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={user.password}
                    onChange={handleChange}
                />
                <select name="role" value={user.role} onChange={handleChange}>
                    <option value="student">Student</option>
                    <option value="teacher">Teacher</option>
                    <option value="admin">Admin</option>
                </select>
                <input
                    type="text"
                    name="department"
                    placeholder="Department"
                    value={user.department}
                    onChange={handleChange}
                />

                <button type="submit" className={styles.registerBtn}>Register</button>
            </form>
        </div>
    );
};

export default Register;
