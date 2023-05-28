import './App.css';
import {Route, Routes, useLocation} from "react-router-dom";
import HomePage from "./pages/HomePage";
import {YMaps} from "@pbe/react-yandex-maps";
import BeachPage from "./pages/BeachPage";
import MapTemplate from "./components/Map/components/MapTemplate";
import {useEffect, useState} from "react";
import {useStores} from "./stores/global.store";
import Card from "./components/Card/components/Card";
import BeachLocalStore from "./components/BeachCard/store/beachLocal.store";
import BeachCard from "./components/BeachCard/components/BeachCard";
import RealObjectStore from "./components/RealObjects/store/realObject.store";
import RealObjectCard from "./components/RealObjects/components/RealObjectCard";

function App() {
    const location = useLocation()

    const [displayLocation, setDisplayLocation] = useState(location);
    const [transitionStage, setTransitionStage] = useState("fadeIn");

    useEffect(() => {
        if (location !== displayLocation) setTransitionStage("fadeOut");
    }, [location, displayLocation]);

    let tabItems = [
        {
            title: "Пляжи",
            loadingText: "Загрузка пляжей",
            data: BeachLocalStore,
            component: BeachCard,
            link: "/",
        },
        {
            title: "Объекты",
            loadingText: "Загрузка объектов",
            data: RealObjectStore,
            component: RealObjectCard,
            link: "/object",
        },
        {
            title: "Архитектура",
            loadingText: "Загрузка архитектуры",
            data: BeachLocalStore,
            component: BeachCard,
            link: "/architecture",
        },
    ]

    return (
        <YMaps>
            <MapTemplate/>
            <Routes>
                <Route path={"/beach"}>
                    <Route path={":beachCode"} element={<BeachPage/>}/>
                </Route>
                <Route path={"/"} element={<HomePage tabItems={tabItems}/>}>
                    <Route path={"object"}/>
                    <Route path={"architecture"}/>
                </Route>
            </Routes>
        </YMaps>
    );
}

export default App;
