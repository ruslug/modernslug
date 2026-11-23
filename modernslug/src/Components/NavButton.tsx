import { NavLink } from "react-router";
import type { NavItem } from "../Config/Navigation";
import "./Styles/NavButton.css";

// Information needed for each navbar button
type NavButtonProps = {
    item: NavItem;
    onNavigate?: () => void;
};

// Creates a button using the label and path from Navigation.ts
export default function NavButton({ item, onNavigate }: NavButtonProps) {
    return (
        <NavLink
            to={item.path}
            end={item.path === "/"}
            onClick={onNavigate}
            className={({ isActive }) => {
                if (isActive) {
                    return "nav-button nav-button--active";
                }

                return "nav-button";
            }}
        >
            {item.label}
        </NavLink>
    );
}
