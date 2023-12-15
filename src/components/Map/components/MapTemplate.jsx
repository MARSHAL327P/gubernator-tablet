import {observer} from "mobx-react-lite";
import useWindowSize from "../../../hooks/useWindowSize";
import MapStore from "../store/map.store";
import {useCallback, useContext, useEffect, useRef, useState} from "react";
import React from 'react';
import DashboardStore from "../../Dashboard/store/dashboard.store";
import SelectedClassInfoStore from "../../../stores/selectedClassInfo.store";
import {runInAction} from "mobx";
import MapControls from "./MapControls/MapControls";
import HeatmapLayers from "../../Heatmap/components/HeatmapLayers";
import HeatmapStore from "../../Heatmap/store/heatmap.store";
import {MyContext} from "../../MyContext";
import mapControls from "./MapControls/MapControls";

const MapError = () => (
    <div style={{
        width: "100%",
        height: "100vh",
    }}>
        <div id={"no-map"}></div>
    </div>
)
/* global ymaps3 */
const MapTemplate = observer(() => {
    const {mapComponents} = useContext(MyContext);
    if (!mapComponents)
        return MapError()

    let controlsRef = useRef(null)
    let [mapHeight, setMapHeight] = useState("100vh")
    const [width, height] = useWindowSize() // Следим за изменением высоты

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
    } = mapComponents

    useEffect(() => {
        MapStore.initLocation()
    }, [])

    const onActionEnd = useCallback(({location, type}) => {
        const resizeEventTypes = ["drag", "scrollZoom", "oneFingerZoom", "dblClick", "pinchZoom", "magnifier"]

        if (resizeEventTypes.includes(type))
            MapStore.setLocationParams(location)
    }, []);


    // useEffect(() => {
    //     if (!controlsRef.current) return false
    //     console.log(controlsRef.current)
    //
    //     controlsRef.current._element.style.zIndex = 0
    //     controlsRef.current && controlsRef.current._element.addEventListener("click", (e) => {
    //         if (!MapStore.mapRef) return false
    //
    //         let target = e.target.querySelector(".ymaps3x0--zoom-control__in") ?? e.target.querySelector(".ymaps3x0--zoom-control__out") ?? e.target
    //         let zoomRange = MapStore.mapRef.zoomRange
    //         let currentZoom = parseFloat(MapStore.location.zoom)
    //         let isGeoLocation = target.classList.contains("ymaps3x0--geolocation-control")
    //         let isPlusBtn = target.classList.contains("ymaps3x0--zoom-control__in")
    //         let isMinusBtn = target.classList.contains("ymaps3x0--zoom-control__out")
    //
    //         if (isGeoLocation)
    //             setTimeout(() => {
    //                 MapStore.location = {
    //                     center: MapStore.mapRef.center,
    //                     zoom: currentZoom
    //                 }
    //                 MapStore.setLocationParams(MapStore.location)
    //                 MapStore.saveGeoLocation(MapStore.location.center)
    //             }, 500)
    //
    //         if (isPlusBtn && currentZoom < zoomRange.max)
    //             MapStore.location.zoom = (currentZoom + 1 > zoomRange.max) ? zoomRange.max : currentZoom + 1
    //
    //         if (isMinusBtn && currentZoom > zoomRange.min)
    //             MapStore.location.zoom = (currentZoom - 1 < zoomRange.min) ? zoomRange.min : currentZoom - 1
    //
    //         MapStore.location.zoom = parseFloat(MapStore.location.zoom)
    //         if (!isGeoLocation)
    //             MapStore.setLocationParams(MapStore.location)
    //     })
    //     // eslint-disable-next-line
    // }, [MapStore.mapRef])

    return mapComponents && YMap && MapStore.location &&
        <div style={{
            width: "100vw",
            height: mapHeight,
            transition: "height .2s"
        }}>
            <YMap
                zoomRange={{
                    min: 8,
                    max: HeatmapStore.selectedAdditionalLayer ? 13 : 21
                }}
                location={MapStore.location}
                ref={map => runInAction(() => {
                    MapStore.mapRef = map
                })}
            >
                <YMapDefaultSchemeLayer/>
                <YMapDefaultFeaturesLayer/>
                <YMapListener onActionEnd={onActionEnd}/>
                {
                    width > 1024 ?
                        <YMapControls position="right" ref={controlsRef}>
                            <YMapZoomControl/>
                            <YMapGeolocationControl/>
                        </YMapControls> :
                        <YMapControls position="left" ref={controlsRef}>
                            <YMapGeolocationControl/>
                        </YMapControls>
                }

                {SelectedClassInfoStore.currentClass?.mapLayer}
                <HeatmapLayers/>
                {
                    !DashboardStore.isDashboard() &&
                    <MapControls/>
                }
            </YMap>

        </div>
})

export default MapTemplate