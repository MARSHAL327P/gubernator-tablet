import { Map, YMaps, ZoomControl } from "@pbe/react-yandex-maps";
import Header from "../components/Sidebar/components/Header";
import Sidebar from "../components/Sidebar/components/Sidebar";
import useWindowSize from "../hooks/useWindowSize";
import Button, { WHITE } from "../components/RedefinedTags/components/Button";
import { ReactComponent as Human } from "../assets/icons/Human.svg";
import Filter from "../components/Filter/components/Filter";
import FilterStore from "../components/Filter/store/filterStore";
import { observer } from "mobx-react-lite";

const HomePage = observer(() => {
    const [, height] = useWindowSize() // Следим за изменением высоты
    const mapDefaultState = {
        center: [44.556972, 33.526402],
        zoom: 12,
        controls: [],
    }

    return (
        <YMaps>
            <Map
                width={"100%"}
                height={height}
                defaultState={mapDefaultState}
            >
                <ZoomControl options={{ float: "right" }}/>
                {/*<RouteButton options={{ float: "right" }} />*/}
            </Map>

            <Header/>
            <Button
                classes={"absolute top-7 right-5"}
                type={WHITE}
                text={"Профиль"}
                icon={Human}
                numNotify={2}
            />
            <div className="absolute top-0 left-0 flex drop-shadow-xl h-full">
                { FilterStore.isOpen && <Filter classes={"transition bg-white"}/> }
                <Sidebar classes={"bg-white"}/>
            </div>

        </YMaps>
    )
})

export default HomePage