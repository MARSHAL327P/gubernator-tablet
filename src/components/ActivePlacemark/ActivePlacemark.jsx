import React, {useRef} from 'react';
import MapStore from "../Map/store/map.store";
import cc from "classcat";
import {runInAction} from "mobx";
import {observer} from "mobx-react-lite";

const ActivePlacemark = observer((props) => {
    const {YMapMarker} = MapStore.mapData

    let wrapper = props.wrapper
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
        onClick: props.wrapper.onClick
    };

    return (
        <YMapMarker ref={markerRef} {...props}>
            <div
                style={wrapper?.style}
                className={cc([wrapper?.classes, "absolute marker_beach fadeIn opacity-0"])}
                {...triggers}
            >
                {props.children(triggers)}
            </div>
        </YMapMarker>
    )
})

export default ActivePlacemark;