import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-inner">

        <Link to="/" className="logo">
          Poet’s Inn
        </Link>

        <div className={`nav-links ${menuOpen ? "active" : ""}`}>
          <Link 
            to="/" 
            className={location.pathname === "/" ? "active-link" : ""}
          >
            Home
          </Link>

          <Link 
            to="/gallery"
            className={location.pathname === "/gallery" ? "active-link" : ""}
          >
            Gallery
          </Link>
        </div>

        <div className="mobile-toggle" onClick={toggleMenu}>
          ☰
        </div>

      </div>
    </nav>
  );
}

export default Navbar;
