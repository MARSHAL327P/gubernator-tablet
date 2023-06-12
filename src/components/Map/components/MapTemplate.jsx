import {observer} from "mobx-react-lite";
import useWindowSize from "../../../hooks/useWindowSize";
import MapStore from "../store/map.store";
import {useLocation, useNavigate, useParams, useSearchParams} from "react-router-dom";
import {useCallback, useEffect, useMemo, useRef} from "react";
import {action, runInAction} from "mobx";
import SidebarStore from "../../Sidebar/store/sidebar.store";
import {load} from "@2gis/mapgl";
import BeachLocalStore from "../../BeachCard/store/beachLocal.store";
import cc from "classcat";
import {ReactComponent as Marker} from "../../../assets/icons/Marker.svg";
import ReactDOMServer from "react-dom/server";


const MapTemplate = observer((callback, deps) => {
    const [width, height] = useWindowSize() // Следим за изменением высоты и ширины
    const location = useLocation();
    const [queryParameters] = useSearchParams()
    const navigate = useNavigate()

    // load().then((mapgl) => {
    //     if( MapStore.map === null ){
    //         MapStore.map = new mapgl.Map('container', {
    //             center: [33.526402, 44.556972],
    //             zoom: 12,
    //             key: '4475786d-b986-4255-997e-e1333b03f53a',
    //         });
    //
    //         MapStore.mapgl = mapgl
    //     }
    // });

    // useEffect(() => {
    //     BeachLocalStore.list.length > 0 && BeachLocalStore.list.forEach((beach) => {
    //         let markerComponent = <div className={"inline-flex relative"}>
    //             <Marker className={cc(["w-14 h-14", {
    //                 "fill-warning": beach.isOpen,
    //                 "fill-danger": !beach.isOpen,
    //             }])}/>
    //         </div>
    //
    //         new MapStore.mapgl.HtmlMarker(MapStore.map, {
    //             coordinates: [beach.coord[1], beach.coord[0]],
    //             html: ReactDOMServer.renderToStaticMarkup(markerComponent),
    //         });
    //     })
    // }, [BeachLocalStore.list, MapStore.mapgl])

    // const mapDefaultState = useMemo(() => {
    //     let data = MapStore.queryParam || queryParameters
    //
    //     return {
    //         center: data.get("ll") ? data.get("ll").split(",") : [44.556972, 33.526402],
    //         zoom: data.get("zoom") ?? 12,
    //         controls: [],
    //     }
    // }, [queryParameters])
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

    runInAction(() => {
        MapStore.mapRef = useRef(null);
    })

    return (
        // <div id="container" style={ !beachCode && {
        //     width: width,
        //     height: height,
        // }}>
        //
        // </div>
    <img className={cc({
        "h-[500px] w-screen object-cover": true
    })} src="https://skr.sh/i/110623/btou9TMO.jpg?download=1&name=Скриншот%2011-06-2023%2015:58:31.jpg" alt=""/>
    )
})

export default MapTemplate