import React, {useContext, useRef} from 'react';
import MapStore from "../../store/map.store";
import cc from "classcat";
import {runInAction} from "mobx";
import {observer} from "mobx-react-lite";
import {MyContext} from "../../../MyContext";

const ActivePlacemark = observer((props) => {
    const { mapComponents } = useContext(MyContext);
    const {YMapMarker} = mapComponents

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
        ...props.wrapper.events
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