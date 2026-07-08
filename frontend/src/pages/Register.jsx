import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";

function Register() {
  return (
    <>
      <Navbar />

      <main className="form-page">
        <section className="form-card">
          <h1>Create an account</h1>
          <p>Register to start managing your tasks in TaskSphere.</p>

          <form>
            <label>
              Full Name
              <input type="text" placeholder="Enter your full name" />
            </label>

            <label>
              Email
              <input type="email" placeholder="Enter your email" />
            </label>

            <label>
              Password
              <input type="password" placeholder="Enter your password" />
            </label>

            <button type="submit">Register</button>
          </form>

          <p className="form-link">
            Already have an account?{" "}
            <Link to="/login">Login here</Link>
          </p>
        </section>
      </main>

      <Footer />
    </>
  );
}

export default Register;