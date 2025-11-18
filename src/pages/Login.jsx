import React, { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { toast } from "react-toastify";
import "../styles/auth.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const API_URL = import.meta.env.VITE_API_URL;

  const handleLogin = async (e) => {
    e.preventDefault();

    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();

    if (!trimmedEmail || !trimmedPassword) {
      toast.warning("⚠ Please fill in all fields");
      return;
    }

    try {
      const res = await fetch(`${API_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: trimmedEmail,
          password: trimmedPassword,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Login failed");

      localStorage.setItem("user", JSON.stringify(data));
      toast.success("✅ Login successful!");
      navigate(location.state?.from?.pathname || "/");
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div className="auth-wrapper d-flex justify-content-center align-items-center">
      <form
        onSubmit={handleLogin}
        className="auth-form p-4 rounded shadow d-flex flex-column gap-3"
      >
        <h2 className="text-center fw-bold mb-2 text-gradient">Login</h2>

        <input
          type="email"
          className="form-control"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          className="form-control"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit" className="btn btn-gradient w-100 fw-bold">
          Login
        </button>

        <p className="text-center text-light mb-0">
          Don't have an account?{" "}
          <Link to="/signup" className="signup-link">
            Signup
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;