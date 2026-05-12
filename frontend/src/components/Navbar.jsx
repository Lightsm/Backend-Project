import { Link, NavLink } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Navbar() {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    document.body.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <nav className="nav">
      <Link to="/" className="brand">
        <div className="brand-mark">MM</div>
        <div>
          <h2>MM Art Gallery</h2>
          <span>Aboriginal Arts & Culture</span>
        </div>
      </Link>

      <div className="nav-links">
        <NavLink to="/">Home</NavLink>

        {!token && <NavLink to="/signup">Signup</NavLink>}
        {!token && <NavLink to="/login">Login</NavLink>}

        {token && <NavLink to="/artifacts">Artifacts</NavLink>}
        {token && <NavLink to="/symbols">Symbols</NavLink>}
        {token && <NavLink to="/pins">Pins</NavLink>}
        {token && <NavLink to="/profile">Profile</NavLink>}

        {role === "admin" && <NavLink to="/admin">Admin</NavLink>}

        <button className="theme-btn" onClick={toggleTheme}>
          {theme === "light" ? "Dark" : "Light"}
        </button>
      </div>
    </nav>
  );
}