import { useState } from "react";
import { Link } from "react-router";

import { navigationItems } from "../Config/Navigation";
import NavButton from "./NavButton";
import ThemeToggle from "./ThemeToggle";
import Tux from "../assets/tux.svg";
import "./Styles/Navbar.css";

export default function Navbar() {
    // Keeps track of whether the mobile menu is open
    const [menuOpen, setMenuOpen] = useState(false);

    // Closes the mobile menu
    function closeMenu() {
        setMenuOpen(false);
    }

    // Opens or closes the mobile menu
    function toggleMenu() {
        setMenuOpen(!menuOpen);
    }

    return (
      <header className="site-header">
        <nav className="navbar" aria-label="Main navigation">
          {/* Website name that links to the home page */}
          <Link to="/" className="navbar__brand" onClick={closeMenu}>
            <svg viewBox="-4 -4 25 25" width="48" height="48" aria-label="Logo" className="navbar__logo">
              <use xlinkHref={Tux} />
            </svg>
            RUSLUG
          </Link>

          {/* Light / system / dark switch (right side of the navbar) */}
          <div className="navbar__actions">
            <ThemeToggle />
          </div>

          {/* Button to open the menu on mobile */}
          <button
            className="navbar__toggle"
            type="button"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="primary-navigation"
            onClick={toggleMenu}
          >
            <span className="navbar__toggle-icon" aria-hidden="true">
              <span></span>
              <span></span>
              <span></span>
            </span>
          </button>

          {/* List of navigation buttons */}
          <ul
            id="primary-navigation"
            className={
              menuOpen ? "navbar__links navbar__links--open" : "navbar__links"
            }
          >
            {navigationItems.map((item) => (
              <li className="navbar__item" key={item.path}>
                <NavButton item={item} onNavigate={closeMenu} />
              </li>
            ))}
          </ul>
        </nav>
      </header>
    );
}
