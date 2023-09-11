import './App.css';
import {Route, Routes, useNavigate} from "react-router-dom";
import MapTemplate from "./components/Map/components/MapTemplate";
import {Toaster} from "react-hot-toast";
import {lazy} from "react";
import SuspenseWrapper from "./components/SuspenseWrapper/SuspenseWrapper";

const HomePage = lazy(() => import("./pages/HomePage"))
const BeachPage = lazy(() => import("./pages/BeachPage"))
const RealObjectPage = lazy(() => import("./pages/RealObjectPage"))

function App() {
    // let navigate = useNavigate()

    // window.onpopstate = (e) => {
    //     e.preventDefault()
    //     navigate(-1);
    // }

    return (
        <>
            <MapTemplate/>
            <SuspenseWrapper>
                <Routes>
                    <Route path={"/beach"}>
                        <Route path={":beachCode"} element={<BeachPage/>}/>
                    </Route>
                    <Route path={"/"} element={<HomePage/>}>
                        <Route path={"object"} element={null}/>
                    </Route>
                    <Route path={"/object"}>
                        <Route path={":objectType/:objectId"} element={<RealObjectPage/>}/>
                    </Route>
                </Routes>
            </SuspenseWrapper>
            <Toaster position={"bottom-center"}/>
        </>
    );
}

export default App;
