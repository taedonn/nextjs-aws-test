/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            screens: {
                "txl": { "max": "1280px" },
                "tlg": { "max": "1024px" },
                "tmd": { "max": "768px" },
                "tsm": { "max": "640px" },
            },
            colors: {
                "transparent": "transparent",
                "theme-1": "#FFFFFF",
                "theme-2": "#EFF2F5",
                "theme-3": "#DCE0E4",
                "theme-4": "#CCD1D7",
                "theme-5": "#B7BDC3",
                "theme-6": "#9FA4AA",
                "theme-7": "#878B90",
                "theme-8": "#63666A",
                "theme-9": "#3A3A3A",
                "theme-10": "#202020",
                "theme-blue-1": "#9ABDDC",
                "theme-blue-2": "#648BC0"
            },
            width: {
                "content": "max-content",
            },
        },
    },
    plugins: [],
}