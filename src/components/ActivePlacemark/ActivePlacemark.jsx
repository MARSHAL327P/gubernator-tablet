import React, {useRef, useState} from 'react';
import MapStore from "../Map/store/map.store";
import {useNavigate, useSearchParams} from "react-router-dom";
import cc from "classcat";

const ActivePlacemark = (props) => {
    const {YMapMarker} = MapStore.mapData
    const navigate = useNavigate()
    const [queryParameters] = useSearchParams()

    let markerRef = useRef(null)
    let [isHovered, setIsHovered] = useState(false)
    let triggers = {
        onMouseEnter: () => {
            markerRef.current.element.parentNode.style.zIndex = 5
            setIsHovered(true)
        },
        onMouseLeave: () => {
            markerRef.current.element.parentNode.style.zIndex = 0
            setIsHovered(false)
        },
    };

    function toPage() {
        let urlPath = `${window.location.origin}${props.wrapper.link}`
        let urlTo = new URL(urlPath)
        let url = new URL(`${urlPath}?${queryParameters.toString()}`)

        if (urlTo.searchParams.get("tab"))
            url.searchParams.set("tab", urlTo.searchParams.get("tab"))

        navigate(url.pathname + url.search)
    }

    return (
        <YMapMarker ref={markerRef} {...props}>
            <div
                style={props.wrapper?.style}
                className={cc([props.wrapper?.classes, "absolute marker_beach fadeIn opacity-0"])}
                {...triggers}
                onClick={props.wrapper?.link && toPage}
            >
                {props.children(isHovered, triggers)}
            </div>
        </YMapMarker>
    )
}

export default ActivePlacemark;