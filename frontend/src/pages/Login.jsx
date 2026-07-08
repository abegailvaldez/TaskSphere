import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function Login() {
  return (
    <>
      <Navbar />

      <main className="form-page">
        <section className="form-card">
          <h1>Welcome Back</h1>

          <p>Sign in to access your TaskSphere account.</p>

          <form>
            <label>
              Email
              <input
                type="email"
                placeholder="Enter your email"
              />
            </label>

            <label>
              Password
              <input
                type="password"
                placeholder="Enter your password"
              />
            </label>

            <button type="submit">Login</button>
          </form>

          <p className="form-link">
            Don't have an account?{" "}
            <Link to="/register">Register here</Link>
          </p>
        </section>
      </main>

      <Footer />
    </>
  );
}

export default Login;