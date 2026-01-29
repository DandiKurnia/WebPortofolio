import js from "@eslint/js";
import globals from "globals";
import pluginReact from "eslint-plugin-react";
import { defineConfig } from "eslint/config";

export default defineConfig([
    {
        files: ["**/*.{js,mjs,cjs,jsx}"],
        plugins: { js },
        extends: ["js/recommended"],
        languageOptions: {
            globals: {
                ...globals.browser,
                route: "readonly",
                setMenu: "readonly",
            },
        },
    },
    pluginReact.configs.flat.recommended,
    {
        rules: {
            "react/prop-types": "off", // Disable prop-types validation
            "react/react-in-jsx-scope": "off", // React 17+ tidak perlu import React untuk JSX
        },
    },
]);
