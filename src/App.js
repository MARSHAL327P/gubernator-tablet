import './App.css';
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import { YMaps } from "@pbe/react-yandex-maps";
import BeachPage from "./pages/BeachPage";
import MapTemplate from "./templates/MapTemplate";

function App() {
    return (
        <YMaps>
            <MapTemplate/>
            <Routes>
                <Route path={"/beach"}>
                    <Route path={":beachCode"} element={<BeachPage/>}/>
                </Route>
                <Route path={"/"} element={<HomePage/>}/>
            </Routes>
        </YMaps>
    );
}

export default App;
