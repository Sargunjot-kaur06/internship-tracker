import { NavLink } from "react-router-dom";

function NavBar() {
  return (
    <nav className="navbar">
      <h2>Internship Tracker 🚀</h2>

      <div className="nav-links">
        <NavLink to="/">Dashboard</NavLink>
        <NavLink to="/login">Login</NavLink>
        <NavLink to="/register">Register</NavLink>
      </div>
    </nav>
  );
}

export default NavBar;