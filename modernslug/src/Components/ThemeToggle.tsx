import { useEffect, useState } from "react";
import "./Styles/ThemeToggle.css";

type Theme = "light" | "dark";

const STORAGE_KEY = "theme";
const darkQuery = window.matchMedia("(prefers-color-scheme: dark)");

// Reads the theme the user picked before (null if they never picked one)
function getSavedTheme(): Theme | null {
    try {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved === "light" || saved === "dark") {
            return saved;
        }
    } catch {
        // Storage can be blocked (private mode etc.)
    }
    return null;
}

// The device's light/dark setting
function getSystemTheme(): Theme {
    return darkQuery.matches ? "dark" : "light";
}

const options: { value: Theme; label: string; icon: React.ReactNode }[] = [
    {
        value: "light",
        label: "Light theme",
        icon: (
            <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
                <circle cx="12" cy="12" r="4" fill="currentColor" />
                <g stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
                </g>
            </svg>
        ),
    },
    {
        value: "dark",
        label: "Dark theme",
        icon: (
            <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
                <path fill="currentColor" d="M20 14.5A8.5 8.5 0 0 1 9.5 4a8.5 8.5 0 1 0 10.5 10.5Z" />
            </svg>
        ),
    },
];

export default function ThemeToggle() {
    // Starts from the saved choice, or the device setting if there is none
    const [theme, setTheme] = useState<Theme>(() => getSavedTheme() ?? getSystemTheme());

    // Puts the theme on <html data-theme="..."> so index.css can switch colors
    useEffect(() => {
        document.documentElement.dataset.theme = theme;
    }, [theme]);

    // Until the user picks a theme, keep following the device if it changes
    useEffect(() => {
        const onChange = () => {
            if (getSavedTheme() === null) {
                setTheme(getSystemTheme());
            }
        };
        darkQuery.addEventListener("change", onChange);
        return () => darkQuery.removeEventListener("change", onChange);
    }, []);

    // Switches the theme and remembers the choice
    function chooseTheme(next: Theme) {
        setTheme(next);
        try {
            localStorage.setItem(STORAGE_KEY, next);
        } catch {
            // Ignore storage errors – the theme still applies for this visit
        }
    }

    return (
        <div className="theme-toggle" role="radiogroup" aria-label="Color theme">
            {options.map((option) => (
                <button
                    key={option.value}
                    type="button"
                    role="radio"
                    aria-checked={theme === option.value}
                    aria-label={option.label}
                    title={option.label}
                    className={
                        theme === option.value
                            ? "theme-toggle__option theme-toggle__option--active"
                            : "theme-toggle__option"
                    }
                    onClick={() => chooseTheme(option.value)}
                >
                    {option.icon}
                </button>
            ))}
        </div>
    );
}
