export default {
  darkMode: "class",
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
};

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: "#C69C2C",
        dark: "#141414",
        muted: "#818898",
        line: "#EBEBEB",
        soft: "#F9FAFB",
      },
    },
  },
  plugins: [],
};