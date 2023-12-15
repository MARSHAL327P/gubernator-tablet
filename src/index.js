import React, {useEffect} from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {BrowserRouter} from "react-router-dom";
import {ThemeProvider} from "@material-tailwind/react";
import MapStore from "./components/Map/store/map.store";
import {MyContextProvider} from "./components/MyContext";

const root = ReactDOM.createRoot(document.getElementById('root'));
const defaultBtnParams = {
    text: "text-md font-normal normal-case",
    other: "overflow-hidden flex gap-2 justify-center items-center overflow-hidden relative outline-0 rounded-xl",
    hover: "",
    focus: "",
    active: "",
    shadow: "shadow-none",
}
const defaultInputStyles = {
    className: "focus:!border-t-blue-500 focus:!border-blue-500 ring-4 ring-transparent focus:ring-blue-500/20 " +
        "!border !border-blue-gray-50 bg-white shadow-lg shadow-blue-gray-900/5 placeholder:text-blue-gray-200 text-blue-gray-500",
    labelProps: {
        className: "hidden"
    },
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
                    hover: "hover:bg-gray-200"
                }
            },
            text: {
                white: {
                    ...defaultBtnParams,
                    hover: "hover:bg-gray-200",
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
        defaultProps: defaultInputStyles
    },
    textarea: {
        defaultProps: defaultInputStyles
    },
    button: defaultBtnStyles,
    iconButton: defaultBtnStyles,
    badge: {
        defaultProps: {
            className: "bg-danger"
        }
    },
    chip: {
        styles: {
            variants: {
                filled: {
                    blue: {
                        background: "bg-primary"
                    }
                }
            }
        }
    },
    spinner: {
        defaultProps: {
            className: "spinner_primary"
        }
    },
    drawer: {
        styles: {
            base: {
                overlay: {
                    position: "fixed",
                },
            },
        },
    },
}

// main();
//
// async function main() {
//     await MapStore.loadMap()
// }

root.render(
    <React.StrictMode>
        <ThemeProvider value={theme}>
            <BrowserRouter>
                <MyContextProvider>
                    <App/>
                </MyContextProvider>
            </BrowserRouter>
        </ThemeProvider>
    </React.StrictMode>
);