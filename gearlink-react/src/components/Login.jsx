import React, { useState } from "react";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        try {
            const res = await axios.post("http://localhost:5000/api/auth/login", { email, password });
            localStorage.setItem("token", res.data.token);
            localStorage.setItem("role", res.data.role);
            // Fetch user profile to store name
            const profileRes = await axios.get("http://localhost:5000/api/auth/profile", {
                headers: { Authorization: `Bearer ${res.data.token}` },
            });
            localStorage.setItem("userName", profileRes.data.name);
            localStorage.setItem("userEmail", profileRes.data.email || email);
            if (res.data.role === "admin") {
                navigate("/admin-dashboard");
            } else {
                navigate("/dashboard");
            }
        } catch (err) {
            const serverMessage = err.response?.data?.error;
            setError(serverMessage || "Login failed. Make sure the backend server is running.");
        }
    };

    return (
        <div className="login-container">
            <div className="login-box">
                <div className="logo">GearLink</div>
                <h2>Login</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type="email"
                        placeholder="Enter Email Address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Enter Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <button type="submit">Login</button>
                    {error && <p style={{ color: "red" }}>{error}</p>}
                    <p>
                        <a href="#">Forgot Password?</a>
                    </p>
                    <p>
                        Don't have an account? <Link to="/register">Register</Link>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default Login;