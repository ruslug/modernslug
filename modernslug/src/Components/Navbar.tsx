import { useState } from "react";
import { Link } from "react-router";

import { navigationItems } from "../Config/Navigation";
import NavButton from "./NavButton";
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
                <Link
                    to="/"
                    className="navbar__brand"
                    onClick={closeMenu}
                >
                    RUSLUG
                </Link>

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
                    className={menuOpen ? "navbar__links navbar__links--open" : "navbar__links"}
                >
                    {navigationItems.map((item) => (
                        <li className="navbar__item" key={item.path}>
                            <NavButton
                                item={item}
                                onNavigate={closeMenu}
                            />
                        </li>
                    ))}
                </ul>

            </nav>
        </header>
    );
}