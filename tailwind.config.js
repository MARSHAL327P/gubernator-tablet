/** @type {(tailwindConfig: object) => object} */
const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
    content: ["./src/**/*.{html,js,jsx}"],
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
            gridTemplateColumns: {
                'card': 'repeat(auto-fill, minmax(340px, 1fr))',
                'review': '2fr 5fr',
                'widgets': 'repeat(auto-fill, minmax(350px, 1fr))',
            },
            keyframes: {
                translateY: {
                    '0%': {
                        opacity: 0,
                        transform: 'translateY(-20px)'
                    },
                    '100%': {
                        opacity: 1,
                        transform: 'translateY(0)'
                    },
                }
            },
            boxShadow: {
                'top': '0px -4px 15px -3px rgba(0, 0, 0, 0.10)',
            }
        },
        transitionDuration: {
            DEFAULT: '300ms',
        },
        screens: {
            'sm': {'max': '640px'},
            // => @media (max-width: 640px) { ... }

            'md': {'max': '768px'},
            // => @media (max-width: 768px) { ... }

            'lg': {'max': '1024px'},
            // => @media (max-width: 1024px) { ... }

            'xl': {'max': '1280px'},
            // => @media (max-width: 1280px) { ... }

            '2xl': {'max': '1536px'},
            // => @media (max-width: 1536px) { ... }
        }
    },
    plugins: [],
})
