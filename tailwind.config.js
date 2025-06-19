/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './pages/**/*.{js,ts,jsx,tsx}',
        './components/**/*.{js,ts,jsx,tsx}',
        './app/**/*.{js,ts,jsx,tsx}', // if using app directory
    ],
    theme: {
        extend: {
            transform: ['hover'],
        },
        fontFamily: {
            ar: ['Tajawal', 'sans-serif'],
            en: ['Poppins', 'sans-serif'],
          },
    },
    plugins: [],
}
