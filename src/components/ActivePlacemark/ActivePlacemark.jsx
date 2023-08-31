import React, {useRef} from 'react';
import MapStore from "../Map/store/map.store";
import {useNavigate, useSearchParams} from "react-router-dom";
import cc from "classcat";
import useWindowSize from "../../hooks/useWindowSize";
import {runInAction} from "mobx";
import {observer} from "mobx-react-lite";

const ActivePlacemark = observer((props) => {
    const {YMapMarker} = MapStore.mapData
    const navigate = useNavigate()
    const [queryParameters] = useSearchParams()
    const [width] = useWindowSize()

    let wrapper = props.wrapper
    let nowClick = wrapper.nowClick !== undefined ? wrapper.nowClick : true
    let markerRef = useRef(null)
    let triggers = {
        onMouseEnter: () => {
            markerRef.current.element.parentNode.style.zIndex = 5
            runInAction(() => {
                if (wrapper.data)
                    wrapper.data.markerDescriptionIsOpen = true
            })
        },
        onMouseLeave: () => {
            markerRef.current.element.parentNode.style.zIndex = 0
            runInAction(() => {
                if (wrapper.data)
                    wrapper.data.markerDescriptionIsOpen = false
            })
        },
    };

    function toPage() {
        let urlPath = `${window.location.origin}${wrapper.link}`
        let urlTo = new URL(urlPath)
        let url = new URL(`${urlPath}?${queryParameters.toString()}`)

        if (urlTo.searchParams.get("tab"))
            url.searchParams.set("tab", urlTo.searchParams.get("tab"))

        navigate(url.pathname + url.search)
    }

    return (
        <YMapMarker ref={markerRef} {...props}>
            <div
                style={wrapper?.style}
                className={cc([wrapper?.classes, "absolute marker_beach fadeIn opacity-0"])}
                {...triggers}
                onClick={((width > 1024 && wrapper?.link) || nowClick) ? toPage : null}
            >
                {props.children(triggers)}
            </div>
        </YMapMarker>
    )
})

export default ActivePlacemark;