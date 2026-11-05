// This is the information each navbar button needs
export type NavItem = {
    label: string;
    path: string;
};

// List of buttons that will show up in the navbar
export const navigationItems: NavItem[] = [
    { label: "Home", path: "/" },
    { label: "Meetings", path: "/meetings" },
    { label: "Members", path: "/members" },
    { label: "Links", path: "/links" },
];
