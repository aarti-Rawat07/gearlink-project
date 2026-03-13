import React from "react";
import "./register.css";
import { Link } from "react-router-dom";

const Register = () => {

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Register button clicked");
  };

  return (
    <div className="register-container">

      <div className="register-box">

        <div className="logo">GearLink</div>

        <h2>Create Account</h2>

        <form onSubmit={handleSubmit}>

          <input
            type="text"
            placeholder="Full Name"
            required
          />

          <input
            type="email"
            placeholder="Email Address"
            required
          />

          <input
            type="tel"
            placeholder="Mobile Number"
            required
          />

          <input
            type="password"
            placeholder="Password"
            required
          />

          <input
            type="password"
            placeholder="Confirm Password"
            required
          />

          <button type="submit">Register</button>

          <p>
            Already have an account? <Link to="/login">Login</Link>
          </p>

        </form>

      </div>

    </div>
  );
};

export default Register;