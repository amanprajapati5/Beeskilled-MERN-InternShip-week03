import { Link, useNavigate } from "react-router-dom";
import { logoutUser } from "../services/authService";

function Navbar() {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const handleLogout = () => {
    logoutUser();
    navigate("/login");
  };

  return (
    <header className="navbar">

      <div className="navbar-inner">

        <Link to="/dashboard" className="brand">
          <span className="brand-mark">✓</span>

          <span className="brand-name">
            TaskFlow
          </span>
        </Link>

        <nav className="nav-links">

          {token && (
            <Link
              to="/dashboard"
              className="nav-link active"
            >
              Dashboard
            </Link>
          )}

          {!token && (
            <>
              <Link
                to="/login"
                className="nav-link"
              >
                Login
              </Link>

              <Link
                to="/register"
                className="nav-link nav-register"
              >
                Create account
              </Link>
            </>
          )}

          {token && (
            <button
              type="button"
              className="logout-button"
              onClick={handleLogout}
            >
              Logout
            </button>
          )}

        </nav>

      </div>

    </header>
  );
}

export default Navbar;