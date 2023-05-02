import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "@material-tailwind/react";

const root = ReactDOM.createRoot(document.getElementById('root'));
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
