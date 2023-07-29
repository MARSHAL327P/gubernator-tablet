import './App.css';
import {Route, Routes} from "react-router-dom";
import HomePage from "./pages/HomePage";
import BeachPage from "./pages/BeachPage";
import MapTemplate from "./components/Map/components/MapTemplate";
import BeachLocalStore from "./components/BeachCard/store/beachLocal.store";
import RealObjectStore from "./components/RealObjects/store/realObject.store";
import RealObjectPage from "./pages/RealObjectPage";
import {Toaster} from "react-hot-toast";
import SidebarStore from "./components/Sidebar/store/sidebar.store";
import SelectedClassInfoStore from "./stores/selectedClassInfo.store";

function onTabClick(isSelected, e) {
    if (SelectedClassInfoStore.currentClass.isLoading)
        e.preventDefault()
    if (isSelected)
        SidebarStore.toggleMobileHideCards(false)
}

function App() {
    let tabItems = [
        {
            title: "Пляжи",
            data: BeachLocalStore,
            selected: true,
            link: "/",
            onClick: onTabClick
        },
        {
            title: "Объекты",
            data: RealObjectStore,
            selected: false,
            link: "/object",
            onClick: onTabClick
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
        <>
            <MapTemplate/>
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
            <Toaster position={"bottom-center"}/>
        </>
    );
}

export default App;
