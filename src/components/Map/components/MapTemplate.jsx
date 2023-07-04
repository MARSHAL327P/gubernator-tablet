import {observer} from "mobx-react-lite";
import {Map, RulerControl, useYMaps, ZoomControl} from "@pbe/react-yandex-maps";
import useWindowSize from "../../../hooks/useWindowSize";
import MapStore from "../store/map.store";
import {useLocation, useNavigate, useSearchParams} from "react-router-dom";
import {useCallback, useEffect, useMemo, useRef, useState} from "react";
import {runInAction} from "mobx";
import SelectedClassInfoStore from "../../../stores/selectedClassInfo.store";
import AdditionalLayerBtns from "./AdditionalLayerBtns";
import BathingComfortGradeBlock from "./BathingComfortGradeBlock";
import DashboardStore from "../../Dashboard/store/dashboard.store";
import LockScaleNotification from "./LockScaleNotification";


const MapTemplate = observer(() => {
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

    let [mapHeight, setMapHeight] = useState(height)

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

    useEffect(() => {
        setMapCoords(mapDefaultState)
    }, [mapDefaultState, setMapCoords])

    runInAction(() => {
        MapStore.ymaps = useYMaps()
        MapStore.mapRef = useRef(null);
    })

    useEffect(() => {
        setMapHeight(height - (DashboardStore.isDashboard() && DashboardStore.isOpen ? 500 : 0))
    }, [height, window.location.pathname, DashboardStore.isOpen])


    return (
        <Map
            instanceRef={MapStore.mapRef}
            width={width}
            height={mapHeight}
            defaultState={mapDefaultState}
            onBoundsChange={(e) => {
                setMapCoords(e)
            }}
        >
            <RulerControl options={{float: "right"}}/>
            <ZoomControl options={{float: "right"}}/>
            {SelectedClassInfoStore.currentClass?.mapLayer}
            {
                !DashboardStore.isDashboard() &&
                <>
                    <AdditionalLayerBtns/>
                    <LockScaleNotification/>
                    <BathingComfortGradeBlock/>
                </>
            }

        </Map>
    )
})

export default MapTemplate