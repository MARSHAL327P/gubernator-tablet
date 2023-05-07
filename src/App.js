import './App.css';
import { Route, Routes, useLocation } from "react-router-dom";
import HomePage from "./pages/HomePage";
import { YMaps } from "@pbe/react-yandex-maps";
import BeachPage from "./pages/BeachPage";
import MapTemplate from "./templates/MapTemplate";
import { useEffect, useState } from "react";

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
            <div
                className={`absolute top-0 left-0 h-full ${transitionStage}`}
                onAnimationEnd={() => {
                    if (transitionStage === "fadeOut") {
                        setTransitionStage("fadeIn");
                        setDisplayLocation(location);
                    }
                }}
            >
                <Routes location={displayLocation}>
                    <Route path={"/beach"}>
                        <Route path={":beachCode"} element={<BeachPage/>}/>
                    </Route>
                    <Route path={"/"} element={<HomePage/>}/>
                </Routes>
            </div>
        </YMaps>
    );
}

export default App;
