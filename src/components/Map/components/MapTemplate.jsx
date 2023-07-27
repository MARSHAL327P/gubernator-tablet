import {observer} from "mobx-react-lite";
import {Map, RulerControl, useYMaps, ZoomControl} from "@pbe/react-yandex-maps";
import useWindowSize from "../../../hooks/useWindowSize";
import MapStore from "../store/map.store";
import {useLocation, useNavigate, useSearchParams} from "react-router-dom";
import {useCallback, useEffect, useMemo, useRef, useState} from "react";
import React from 'react';
import ReactDOM from 'react-dom'
import {action, runInAction} from "mobx";
import SelectedClassInfoStore from "../../../stores/selectedClassInfo.store";
import DashboardStore from "../../Dashboard/store/dashboard.store";
import MapControls from "./MapControls/MapControls";
import GeoLocationControl from "./MapControls/GeoLocationControl";

const MapTemplate = observer(() => {
    const [width, height] = useWindowSize() // Следим за изменением высоты
    const location = useLocation();
    const [queryParameters] = useSearchParams()
    const navigate = useNavigate()
    const mapDefaultState = useMemo(() => {
        let data = MapStore.queryParam || queryParameters

        return {
            center: data.get("ll") ? data.get("ll").split(",") : [33.526402, 44.556972],
            zoom: data.get("zoom") ?? 12,
        }
    }, [queryParameters])

    let [mapHeight, setMapHeight] = useState(height)
    //
    // let setMapCoords = useCallback((mapStates) => {
    //     let center = mapStates.center
    //     let zoom = mapStates.zoom
    //
    //     if (mapStates.originalEvent) {
    //         center = mapStates.originalEvent.newCenter
    //         zoom = mapStates.originalEvent.newZoom
    //     }
    //
    //     queryParameters.set("ll", center)
    //     queryParameters.set("zoom", zoom)
    //
    //     runInAction(() => {
    //         MapStore.queryParam = queryParameters
    //     })
    //
    //     navigate(location.pathname + "?" + queryParameters.toString())
    // }, [location.pathname, navigate, queryParameters])
    //
    // useEffect(() => {
    //     setMapCoords(mapDefaultState)
    // }, [mapDefaultState, setMapCoords])
    //
    // runInAction(() => {
    //     // MapStore.ymaps = useYMaps()
    //     MapStore.mapRef = useRef(null);
    // })

    useEffect(() => {
        let dashboardOffset = width > 1024 ? 436 : 300
        setMapHeight(window.innerHeight - (DashboardStore.isDashboard() && DashboardStore.isOpen ? dashboardOffset : 0))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [height, width, window.location.pathname, DashboardStore.isOpen])


    // let YMap = null
    // let YMapDefaultSchemeLayer = null
    // let YMapControls = null
    //
    //
    // MapStore.loadMap().then((mapData) => {
    //     YMap = mapData.YMap
    //     YMapDefaultSchemeLayer = mapData.YMapDefaultSchemeLayer
    //     YMapControls = mapData.YMapControls
    //     console.log(YMap)
    // })
    //
    // if (MapStore.mapIsReady) {
    //     console.log(YMap)
    // }
    // console.log(MapStore.mapIsReady)

    const {
        YMap,
        YMapDefaultSchemeLayer,
        YMapControls,
        YMapZoomControl
    } = MapStore.mapData

    return MapStore.mapData &&
        <div style={{
            width: "100vw",
            height: "100vh"
        }}>
            <YMap location={mapDefaultState} ref={MapStore.mapRef}>
                <YMapDefaultSchemeLayer/>
                <YMapControls position="right">
                    <YMapZoomControl />
                </YMapControls>
            </YMap>
        </div>
})

export default MapTemplate