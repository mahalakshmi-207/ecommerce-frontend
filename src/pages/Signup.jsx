import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "../styles/auth.css";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_API_URL;

  const handleSignup = async (e) => {
    e.preventDefault();

    const trimmedName = name.trim();
    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();

    if (!trimmedName || !trimmedEmail || !trimmedPassword) {
      toast.warning("⚠ Please fill in all fields");
      return;
    }

    try {
      const res = await fetch(`${API_URL}/api/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: trimmedName,
          email: trimmedEmail,
          password: trimmedPassword,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Signup failed");

      toast.success("✅ Signup successful!");
      navigate("/login");
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div className="auth-container mt-5 d-flex justify-content-center align-items-center gap-3">
      <form onSubmit={handleSignup} className="auth-form p-4 rounded shadow">
        <h2 className="text-center fw-bold mb-4 text-gradient ">Sign Up</h2>

        <input
          type="text"
          className="form-control mb-3 "
          placeholder="Name "
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <input
          type="email"
          className="form-control mb-3"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          className="form-control mb-3"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit" className="btn btn-gradient w-100 fw-bold">
          Sign Up
        </button>

        <p className="mt-3 text-center text-light">
          Already have an account?{" "}
          <a href="/login" className="login-link">
            Login
          </a>
        </p>
      </form>
    </div>
  );
};

export default Signup;