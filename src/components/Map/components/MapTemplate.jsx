import {observer} from "mobx-react-lite";
import useWindowSize from "../../../hooks/useWindowSize";
import MapStore from "../store/map.store";
import {useCallback, useEffect, useRef, useState} from "react";
import React from 'react';
import DashboardStore from "../../Dashboard/store/dashboard.store";
import SelectedClassInfoStore from "../../../stores/selectedClassInfo.store";
import MapControls from "./MapControls/MapControls";

const MapTemplate = observer(() => {
    const [width, height] = useWindowSize() // Следим за изменением высоты

    let controlsRef = useRef(null)
    let [mapHeight, setMapHeight] = useState("100vh")

    useEffect(() => {
        let mobileDashboardOffset = width > 1024 ? 436 : 300
        let dashboardOffset = DashboardStore.isDashboard() && DashboardStore.isOpen ? mobileDashboardOffset : 0

        setMapHeight(`calc(100vh - ${dashboardOffset}px)`)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [height, width, window.location.pathname, DashboardStore.isOpen])

    const {
        YMap,
        YMapDefaultSchemeLayer,
        YMapControls,
        YMapZoomControl,
        YMapGeolocationControl,
        YMapDefaultFeaturesLayer,
        YMapListener,
    } = MapStore.mapData

    useEffect(() => {
        MapStore.initLocation()
    }, [])

    const onActionEnd = useCallback(({location, type}) => {
        const resizeEventTypes = ["drag", "scrollZoom", "oneFingerZoom", "dblClick", "pinchZoom", "magnifier"]

        if (resizeEventTypes.includes(type))
            MapStore.setLocationParams(location)
    }, []);

    useEffect(() => {
        controlsRef.current && controlsRef.current._element.addEventListener("click", (e) => {
            if (!MapStore.mapRef) return false

            let target = e.target.querySelector(".ymaps3x0--zoom-control__in") ?? e.target.querySelector(".ymaps3x0--zoom-control__out") ?? e.target
            let zoomRange = MapStore.mapRef.zoomRange
            let currentZoom = parseFloat(MapStore.location.zoom)
            let isGeoLocation = target.classList.contains("ymaps3x0--geolocation-control")
            let isPlusBtn = target.classList.contains("ymaps3x0--zoom-control__in")
            let isMinusBtn = target.classList.contains("ymaps3x0--zoom-control__out")

            if (isGeoLocation)
                setTimeout(() => {
                    MapStore.location = {
                        center: MapStore.mapRef.center,
                        zoom: currentZoom
                    }
                    MapStore.setLocationParams(MapStore.location)
                    MapStore.saveGeoLocation(MapStore.location.center)
                }, 500)

            if (isPlusBtn && currentZoom < zoomRange.max)
                MapStore.location.zoom = (currentZoom + 1 > zoomRange.max) ? zoomRange.max : currentZoom + 1

            if (isMinusBtn && currentZoom > zoomRange.min)
                MapStore.location.zoom = (currentZoom - 1 < zoomRange.min) ? zoomRange.min : currentZoom - 1

            MapStore.location.zoom = parseFloat(MapStore.location.zoom)
            if( !isGeoLocation )
                MapStore.setLocationParams(MapStore.location)
        })
    }, [MapStore.mapRef])

    return MapStore.mapData && MapStore.location &&
        <div style={{
            width: "100vw",
            height: mapHeight,
            transition: "height .2s"
        }}>
            <YMap
                zoomRange={{
                    min: 11,
                    max: 21
                }}
                location={MapStore.location}
                ref={map => MapStore.mapRef = map}
            >
                <YMapListener onActionEnd={onActionEnd}/>
                <YMapDefaultSchemeLayer/>
                <YMapDefaultFeaturesLayer/>
                <YMapControls position="right" ref={controlsRef}>
                    <YMapZoomControl/>
                    <YMapGeolocationControl/>
                </YMapControls>
                {SelectedClassInfoStore.currentClass?.mapLayer}
            </YMap>
            {
                !DashboardStore.isDashboard() &&
                <MapControls/>
            }
        </div>
})

export default MapTemplate