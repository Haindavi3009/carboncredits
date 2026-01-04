/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                nature: {
                    50: '#f2fbf5',
                    100: '#e1f7e8',
                    500: '#22c55e',
                    900: '#14532d',
                }
            }
        },
    },
    plugins: [],
}
