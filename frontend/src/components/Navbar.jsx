import { Link } from "react-router-dom";

function Navbar({ isAuthenticated = false, username = "", onLogout }) {
  return (
    <header className="navbar">
      {isAuthenticated ? (
        <div className="logo">TaskSphere</div>
      ) : (
        <Link className="logo" to="/">
          TaskSphere
        </Link>
      )}

      <nav>
        {isAuthenticated ? (
          <>
            <span className="nav-user">👤 {username}</span>
            <button className="logout-button" type="button" onClick={onLogout}>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link className="nav-button" to="/register">
              Register
            </Link>
          </>
        )}
      </nav>
    </header>
  );
}

export default Navbar;