import {observer} from "mobx-react-lite";
import useWindowSize from "../../../hooks/useWindowSize";
import MapStore from "../store/map.store";
import {useLocation, useNavigate} from "react-router-dom";
import {useCallback, useEffect, useRef, useState} from "react";
import React from 'react';
import DashboardStore from "../../Dashboard/store/dashboard.store";
import SelectedClassInfoStore from "../../../stores/selectedClassInfo.store";
import MapControls from "./MapControls/MapControls";

const MapTemplate = observer(() => {
    const [width, height] = useWindowSize() // Следим за изменением высоты
    const navigate = useNavigate()
    const location = useLocation()

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
        YMapFeature,
    } = MapStore.mapData

    useEffect(() => {
        MapStore.initLocation()
    }, [])

    const onActionEnd = useCallback(({location, type}) => {
        const resizeEventTypes = ["drag", "scrollZoom", "oneFingerZoom", "dblClick", "pinchZoom", "magnifier"]

        if (resizeEventTypes.includes(type))
            MapStore.setLocationParams(location)
    }, []);



    // let [controlClicked, setControlClicked] = useState(false)
    //
    // useEffect(() => {
    //     controlsRef.current && controlsRef.current._element.addEventListener("click", () => {
    //         console.log("ok")
    //         setControlClicked(true)
    //     })
    // }, [controlsRef.current])
    //
    // const onUpdate = useCallback(({location}) => {
    //     if( controlClicked )
    //         MapStore.setLocation(navigate, location)
    //
    //     setControlClicked(false)
    // }, [controlClicked, navigate]);

    return MapStore.mapData && MapStore.location &&
        <div style={{
            width: "100vw",
            height: mapHeight,
            transition: "height .2s"
        }}>
            <YMap location={MapStore.location} ref={map => MapStore.mapRef = map}>
                <YMapListener onActionEnd={onActionEnd} />
                <YMapDefaultSchemeLayer/>
                <YMapDefaultFeaturesLayer/>
                <YMapControls position="right">
                    {/*<YMapZoomControl ref={controlsRef} />*/}
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