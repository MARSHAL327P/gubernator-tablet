import {observer} from "mobx-react-lite";
import {Map, useYMaps, ZoomControl} from "@pbe/react-yandex-maps";
import useWindowSize from "../../../hooks/useWindowSize";
import MapStore from "../store/map.store";
import {useLocation} from "react-router-dom";

const MapTemplate = observer(() => {
    const [width, height] = useWindowSize() // Следим за изменением высоты
    const location = useLocation();
    const mapDefaultState = {
        center: [44.556972, 33.526402],
        zoom: 12,
        controls: [],
    }

    MapStore.ymaps = useYMaps()

    return (
        <>
            <Map
                width={width}
                height={height}
                defaultState={mapDefaultState}
            >
                <ZoomControl options={{float: "right"}}/>
                {MapStore.mapItems[location.pathname]}
            </Map>
        </>
    )
})

export default MapTemplate