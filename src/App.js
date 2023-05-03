import './App.css';
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import { YMaps } from "@pbe/react-yandex-maps";

function App() {
    return (
        <YMaps>
            <Routes>
                <Route path={"/"} element={<HomePage />}/>
            </Routes>
        </YMaps>
    );
}

export default App;
