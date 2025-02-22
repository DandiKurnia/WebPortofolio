import defaultTheme from "tailwindcss/defaultTheme";
import forms from "@tailwindcss/forms";

/** @type {import('tailwindcss').Config} */
export default {
    darkMode: "class",
    content: [
        "./vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php",
        "./storage/framework/views/*.php",
        "./resources/views/**/*.blade.php",
        "./resources/js/**/*.jsx",
    ],

    theme: {
        extend: {
            fontFamily: {
                sans: ["Figtree", ...defaultTheme.fontFamily.sans],
            },
            colors: {
                gray: {
                    1000: "#171716",
                    2000: "#252424",
                },
                white: {
                    100: "#D9D9D9",
                },
                green: {
                    1000: "#DDF663",
                },
            },
            screens: {
                xs: "390px",
                xxl: "1300px",
            },
            animation: {
                "fade-up": "fadeUp 0.7s ease-out forwards",
                "fade-in": "fadeIn 0.7s ease-out forwards",
                "scale-up": "scaleUp 0.7s ease-out forwards",
                "slide-left": "slideLeft 0.7s ease-out forwards",
                "slide-right": "slideRight 0.7s ease-out forwards",
                "card-pop": "cardPop 0.5s ease-out forwards",
                "slide-down": "slideDown 0.7s ease-out forwards",
            },
            keyframes: {
                fadeUp: {
                    "0%": { opacity: "0", transform: "translateY(40px)" },
                    "100%": { opacity: "1", transform: "translateY(0)" },
                },
                fadeIn: {
                    "0%": { opacity: "0" },
                    "100%": { opacity: "1" },
                },
                scaleUp: {
                    "0%": { opacity: "0", transform: "scale(0.95)" },
                    "100%": { opacity: "1", transform: "scale(1)" },
                },
                slideLeft: {
                    "0%": {
                        opacity: "0",
                        transform: "translateX(50px)",
                    },
                    "100%": {
                        opacity: "1",
                        transform: "translateX(0)",
                    },
                },
                slideRight: {
                    "0%": {
                        opacity: "0",
                        transform: "translateX(-50px)",
                    },
                    "100%": {
                        opacity: "1",
                        transform: "translateX(0)",
                    },
                },
                cardPop: {
                    "0%": {
                        opacity: "0",
                        transform: "scale(0.8) translateY(40px)",
                    },
                    "100%": {
                        opacity: "1",
                        transform: "scale(1) translateY(0)",
                    },
                },
                slideDown: {
                    "0%": { opacity: "0", transform: "translateY(-100px)" },
                    "100%": { opacity: "1", transform: "translateY(0)" },
                },
            },
        },
    },

    plugins: [forms],
};
