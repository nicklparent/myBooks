// tailwind.config.js
module.exports = {
    content: [
      "./src/**/*.{html,js,jsx,ts,tsx}", // Make sure this points to your project files
    ],
    theme: {
      extend: {
        colors: {
            light: {
                background: "f0f0f0",
                text: "#333333",
            },
            dark: {
                background: "#333333",
                text: "f0f0f0",
            },
            blue: {
                background: "#1E3AA8A",
                text: "E0F2F3"
            },
            // continue as I come up with more themes
        },
      },
    },
    plugins: [],
}
  