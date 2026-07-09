import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const API_URL = import.meta.env.VITE_API_URL;

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
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
      const response = await fetch(`${API_URL}/register/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage("Registration successful. Redirecting to login...");
        setTimeout(() => {
          navigate("/login");
        }, 1000);
      } else {
        setMessage(data.username?.[0] || data.email?.[0] || "Registration failed.");
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
          <h1>Create an account</h1>
          <p>Register to start managing your tasks in TaskSphere.</p>

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
              Email
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
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

            <button type="submit">Register</button>
          </form>

          <p className="form-link">
            Already have an account? <Link to="/login">Login here</Link>
          </p>
        </section>
      </main>

      <Footer />
    </>
  );
}

export default Register;