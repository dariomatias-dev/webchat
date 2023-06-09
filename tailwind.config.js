/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'background-chat': "url('/images/background-chat.jpg')",
        'background-screen': "url('/images/wallpaper.jpg')",
        'background-welcome': "url('/images/welcome.jpg')",
      },
    },
  },
  plugins: [],
};
