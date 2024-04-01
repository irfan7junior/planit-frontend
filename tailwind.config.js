module.exports = {
    theme: {
        extend: {
            fontFamily: {
                langar: ["Langar", "cursive"],
                pacifico: ["Pacifico", "cursive"],
                roboto: ["Roboto", "sans-serif"],
            },
        },
    },
    variants: {
        extend: {
            backgroundColor: ["active"],
        },
    },
    plugins: [],
    purge: {
        // Filenames to scan for classes
        content: [
            "./src/**/*.html",
            "./src/**/*.js",
            "./src/**/*.jsx",
            "./src/**/*.ts",
            "./src/**/*.tsx",
            "./public/index.html",
        ],
        // Options passed to PurgeCSS
        options: {
            // Whitelist specific selectors by name
            // safelist: [],
        },
    },
}
