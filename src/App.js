import './App.css';
import {Route, Routes} from "react-router-dom";
import HomePage from "./pages/HomePage";
import {YMaps} from "@pbe/react-yandex-maps";
import BeachPage from "./pages/BeachPage";
import MapTemplate from "./components/Map/components/MapTemplate";
// import {useEffect, useState} from "react";
import BeachLocalStore from "./components/BeachCard/store/beachLocal.store";
import RealObjectStore from "./components/RealObjects/store/realObject.store";
import RealObjectPage from "./pages/RealObjectPage";
import {Toaster} from "react-hot-toast";

function App() {
    // const location = useLocation()
    // const [displayLocation, setDisplayLocation] = useState(location);
    // const [transitionStage, setTransitionStage] = useState("fadeIn");

    // useEffect(() => {
    //     if (location !== displayLocation) setTransitionStage("fadeOut");
    // }, [location, displayLocation]);

    let tabItems = [
        {
            title: "Пляжи",
            data: BeachLocalStore,
            link: "/",
        },
        {
            title: "Объекты",
            data: RealObjectStore,
            link: "/object",
        },
        // {
        //     title: "Архитектура",
        //     loadingText: "Загрузка архитектуры",
        //     data: BeachLocalStore,
        //     component: BeachCard,
        //     link: "/architecture",
        // },
    ]

    return (
        <YMaps query={{
            load: "package.full",
            apikey: "6701facf-e92e-4104-965a-471884673190",
        }}
        >
            <MapTemplate/>
            {/*<div*/}
            {/*    className={`absolute top-0 left-0 h-full ${transitionStage}`}*/}
            {/*    onAnimationEnd={() => {*/}
            {/*        if (transitionStage === "fadeOut") {*/}
            {/*            setTransitionStage("fadeIn");*/}
            {/*            setDisplayLocation(location);*/}
            {/*        }*/}
            {/*    }}*/}
            {/*>*/}
            <Routes>
                <Route path={"/beach"}>
                    <Route path={":beachCode"} element={<BeachPage/>}/>
                </Route>
                <Route path={"/"} element={<HomePage tabItems={tabItems}/>}>
                    <Route path={"object"} element={null}/>
                </Route>
                <Route path={"/object"}>
                    <Route path={":objectType/:objectId"} element={<RealObjectPage/>}/>
                </Route>
            </Routes>
            {/*</div>*/}
            <Toaster position={"bottom-center"} />
        </YMaps>
    );
}

export default App;
