import {observer} from "mobx-react-lite";
import {Map, useYMaps, ZoomControl} from "@pbe/react-yandex-maps";
import useWindowSize from "../../../hooks/useWindowSize";
import MapStore from "../store/map.store";
import {useLocation, useNavigate, useSearchParams} from "react-router-dom";
import {useCallback, useEffect, useMemo, useRef} from "react";
import {action, runInAction} from "mobx";


const MapTemplate = observer((callback, deps) => {
    const [width, height] = useWindowSize() // Следим за изменением высоты
    const location = useLocation();
    const [queryParameters] = useSearchParams()
    const navigate = useNavigate()

    const mapDefaultState = useMemo(() => {
        let data = MapStore.queryParam || queryParameters

        return {
            center: data.get("ll") ? data.get("ll").split(",") : [44.556972, 33.526402],
            zoom: data.get("zoom") ?? 12,
            controls: [],
        }
    }, [queryParameters])

    let setMapCoords = useCallback((mapStates) => {
        let center = mapStates.center
        let zoom = mapStates.zoom

        if (mapStates.originalEvent) {
            center = mapStates.originalEvent.newCenter
            zoom = mapStates.originalEvent.newZoom
        }

        queryParameters.set("ll", center)
        queryParameters.set("zoom", zoom)

        runInAction(() => {
            MapStore.queryParam = queryParameters
        })

        navigate(location.pathname + "?" + queryParameters.toString())
    }, [location.pathname, navigate, queryParameters])

    useEffect(() => {setMapCoords(mapDefaultState)}, [mapDefaultState, setMapCoords])

    MapStore.ymaps = useYMaps()
    runInAction(() => {
        MapStore.mapRef = useRef(null);
    })

    return (
        <>
            <Map
                instanceRef={MapStore.mapRef}
                width={width}
                height={height}
                defaultState={mapDefaultState}
                onBoundsChange={(e) => {setMapCoords(e)}}
            >
                <ZoomControl options={{float: "right"}}/>
                {MapStore.mapItems[location.pathname]}
            </Map>
        </>
    )
})

export default MapTemplate