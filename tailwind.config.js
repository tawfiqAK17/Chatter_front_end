/** @type {import('tailwindcss').Config} */
export default {
    darkMode: 'class',
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: {
                    light: '#6B7280',      // Slightly lighter gray
                    DEFAULT: '#4B5563',    // Medium gray
                    dark: '#374151',       // Darker gray
                },
                secondary: {
                    light: '#93C5FD',      // Lighter blue
                    DEFAULT: '#60A5FA',    // Medium blue
                    dark: '#3B82F6',       // Darker blue
                },
                dark: {
                    primary: '#0F172A',    // Darker background
                    secondary: '#1E293B',  // Slightly lighter background
                    tertiary: '#334155',   // Even lighter background
                },
                darkText: {
                    primary: '#F8FAFC',    // Almost white
                    secondary: '#E2E8F0',  // Light gray
                    muted: '#94A3B8',      // Medium gray
                },
                darkBorder: {
                    primary: '#334155',    // Medium dark border
                    secondary: '#475569',  // Lighter dark border
                },
                darkAccent: {
                    primary: '#2563EB',    // Primary blue
                    secondary: '#3B82F6',  // Lighter blue
                    hover: '#1D4ED8',      // Darker blue for hover
                },
                darkInput: {
                    background: '#1E293B', // Dark input background
                    border: '#475569',     // Input border
                    ring: '#3B82F6',       // Focus ring
                },
                darkMessage: {
                    user: '#2563EB',       // User message bubble (blue)
                    contact: '#334155',    // Contact message bubble
                },
                darkChat: {
                    active: '#1E40AF',     // Active chat item background (deeper blue)
                    hover: '#1E3A8A',      // Hover state for chat items
                },
                darkSidebar: {
                    background: '#0B1120', // Even darker background for sidebar
                    border: '#1E293B',     // Sidebar border color
                    activeItem: '#1E40AF', // Active sidebar item
                },
                darkIcon: {
                    default: '#94A3B8',    // Default icon color (medium gray)
                    active: '#60A5FA',     // Active icon color (medium blue)
                    hover: '#BAE6FD',      // Hover icon color (light blue)
                }
            }
        },
    },
    plugins: [],
}
