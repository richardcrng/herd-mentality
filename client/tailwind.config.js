/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      padding: {
        app: "var(--app-padding)",
      },
      height: {
        viewport: "var(--100vh)",
        app: "var(--app-h)",
        nav: "var(--nav-h)",
        appMinusNav: "var(--app-minus-nav-h)",
        appMinusNavAndPadding: "var(--app-minus-nav-and-padding-h)",
      },
      maxHeight: {
        viewport: "var(--100vh)",
        app: "var(--app-h)",
        nav: "var(--nav-h)",
        appMinusNav: "var(--app-minus-nav-h)",
        appMinusNavAndPadding: "var(--app-minus-nav-and-padding-h)",
      },
      width: {
        app: "var(--app-w)",
        appMinusPadding: "var(--app-minus-nav-and-padding-w)",
      },
    },
  },
  daisyui: {
    themes: [
      {
        herdMentality: {
          primary: "#376DD5",

          secondary: "#FA9BCE",

          accent: "#38C8B4",

          neutral: "#191D24",

          "base-100": "#FFF",

          info: "#3ABFF8",

          success: "#36D399",

          warning: "#FBBD23",

          error: "#F87272",
        },
      },
    ],
  },
  plugins: [require("@tailwindcss/typography"), require("daisyui")],
};
