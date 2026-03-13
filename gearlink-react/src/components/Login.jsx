import React from "react";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        // Later you can add API login validation here
        console.log("Login button clicked");

        // Redirect to Dashboard
        navigate("/dashboard");
    };

    return (
        <div className="login-container">
            <div className="login-box">

                <div className="logo">GearLink</div>

                <h2>Customer Login</h2>

                <form onSubmit={handleSubmit}>

                    <input
                        type="email"
                        placeholder="Enter Email Address"
                        required
                    />

                    <input
                        type="password"
                        placeholder="Enter Password"
                        required
                    />

                    <button type="submit">Login</button>

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