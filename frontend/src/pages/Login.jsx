import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const API_URL = import.meta.env.VITE_API_URL;

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [message, setMessage] = useState("");

  function handleChange(event) {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      const response = await fetch(`${API_URL}/login/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("username", data.username);
        localStorage.setItem("token", data.token);
        setMessage("Login successful.");
        navigate("/dashboard");
      } else {
        setMessage(data.error || "Login failed.");
      }
    } catch {
      setMessage("Unable to connect to the backend API.");
    }
  }

  return (
    <>
      <Navbar />

      <main className="form-page">
        <section className="form-card">
          <h1>Welcome Back</h1>
          <p>Sign in to access your TaskSphere account.</p>

          {message && <p className="form-message">{message}</p>}

          <form onSubmit={handleSubmit}>
            <label>
              Username
              <input
                type="text"
                name="username"
                placeholder="Enter your username"
                value={formData.username}
                onChange={handleChange}
                required
              />
            </label>

            <label>
              Password
              <input
                type="password"
                name="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </label>

            <button type="submit">Login</button>
          </form>

          <p className="form-link">
            Don&apos;t have an account? <Link to="/register">Register here</Link>
          </p>
        </section>
      </main>

      <Footer />
    </>
  );
}

export default Login;