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
    const navigate = useNavigate()

    let [mapHeight, setMapHeight] = useState(height)

    useEffect(() => {
        let dashboardOffset = width > 1024 ? 436 : 300
        setMapHeight(window.innerHeight - (DashboardStore.isDashboard() && DashboardStore.isOpen ? dashboardOffset : 0))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [height, width, window.location.pathname, DashboardStore.isOpen])

    const {
        YMap,
        YMapDefaultSchemeLayer,
        YMapControls,
        YMapZoomControl,
        YMapGeolocationControl,
        YMapListener,
    } = MapStore.mapData

    useEffect(() => {
        MapStore.setLocation(navigate)
    }, [navigate])

    const onActionEnd = useCallback(({location, type}) => {
        if (type === "drag" || type === "scrollZoom")
            MapStore.setLocation(navigate, location)
    }, [navigate]);

    return MapStore.mapData && MapStore.location &&
        <div style={{
            width: "100vw",
            height: "100vh"
        }}>
            <YMap location={MapStore.location} ref={MapStore.mapRef}>
                <YMapListener onActionEnd={onActionEnd} />
                <YMapDefaultSchemeLayer/>
                <YMapControls position="right">
                    <YMapZoomControl />
                    <YMapGeolocationControl/>
                </YMapControls>
            </YMap>
        </div>
})

export default MapTemplate