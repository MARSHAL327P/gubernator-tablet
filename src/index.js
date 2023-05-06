import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "@material-tailwind/react";

const root = ReactDOM.createRoot(document.getElementById('root'));
const defaultBtnParams = {
    text: "text-md font-normal normal-case",
    other: "overflow-hidden flex gap-2 justify-center items-center overflow-hidden relative outline-0 rounded-xl",
    hover: "",
    focus: "",
    active: "",
    shadow: "shadow-none",
}

const defaultBtnStyles = {
    styles: {
        variants: {
            filled: {
                blue: {
                    ...defaultBtnParams,
                    background: "bg-primary",
                    hover: "hover:bg-primary-600",
                },
                white: {
                    ...defaultBtnParams,
                    shadow: "shadow-lg",
                    hover: "hover:bg-gray-100"
                }
            },
            text: {
                white: {
                    ...defaultBtnParams,
                    hover: "hover:bg-gray-100",
                    other: "text-black"
                },
            }
        }
    }
}

const theme = {
    input: {
        styles: {
            base: {
                container: {
                    minWidth: "min-w-0",
                },
            },
        },
    },
    button: defaultBtnStyles,
    iconButton: defaultBtnStyles,
    badge: {
        defaultProps: {
            className: "bg-danger"
        }
    }
}

root.render(
    <React.StrictMode>
        <ThemeProvider value={theme}>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </ThemeProvider>
    </React.StrictMode>
);
