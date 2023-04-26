/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        'primary': {
          DEFAULT: "#3366FF",
          100: "#D6E4FF",
          200: "#ADC8FF",
          300: "#84A9FF",
          400: "#6690FF",
          600: "#254EDB",
          700: "#1939B7",
          800: "#102693",
          900: "#091A7A",
        },
        'success': '#87E827',
        'info': '#36CFF9',
        'warning': '#FCC33F',
        'danger': '#FF4C28',
      },
    },
    fontFamily: {
      sans: ['"Roboto"', 'sans-serif']
    },
    transitionDuration: {
      DEFAULT: '300ms',
    }
  },
  plugins: [],
}

