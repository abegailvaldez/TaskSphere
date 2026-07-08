import { Link } from "react-router-dom";

function Navbar() {
  return (
    <header className="navbar">
      <div className="logo">TaskSphere</div>

      <nav>
        <Link to="/login">Login</Link>
        <Link className="nav-button" to="/register">
          Register
        </Link>
      </nav>
    </header>
  );
}

export default Navbar;