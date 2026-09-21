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
    <nav>
      <h2>My Todo App</h2>

      <div>
        <Link to="/login">Login</Link>
        {" | "}
        <Link to="/register">Register</Link>
        {" | "}
        <Link to="/dashboard">Dashboard</Link>

        {token && (
          <>
            {" | "}
            <button onClick={handleLogout}>Logout</button>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;