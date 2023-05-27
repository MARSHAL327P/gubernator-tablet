import './App.css';
import {Route, Routes, useLocation} from "react-router-dom";
import HomePage from "./pages/HomePage";
import {YMaps} from "@pbe/react-yandex-maps";
import BeachPage from "./pages/BeachPage";
import MapTemplate from "./components/Map/components/MapTemplate";
import {useEffect, useState} from "react";

function App() {
    const location = useLocation()

    const [displayLocation, setDisplayLocation] = useState(location);
    const [transitionStage, setTransitionStage] = useState("fadeIn");

    useEffect(() => {
        if (location !== displayLocation) setTransitionStage("fadeOut");
    }, [location, displayLocation]);

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
