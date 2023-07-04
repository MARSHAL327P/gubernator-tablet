import {observer} from "mobx-react-lite";
import ActivePlacemark from "../../ActivePlacemark/ActivePlacemark";
import BeachLocalStore from "../../BeachCard/store/beachLocal.store";
import {Placemark, Polygon} from "@pbe/react-yandex-maps";
import {ReactComponent as MarkerIcon} from "../../../assets/icons/Marker.svg";
import {ReactComponent as MarkerPointIcon} from "../../../assets/icons/MarkerPoint.svg";
import cc from "classcat";
import {useNavigate} from "react-router-dom";
import SelectedClassInfoStore from "../../../stores/selectedClassInfo.store";
import {useEffect, useRef, useState} from "react";
import MapStore from "../store/map.store";
import {Transition} from "@headlessui/react";
import BeachMarkerDescription from "./BeachMarkerDescription";

const BeachMap = observer(() => {
    let navigate = useNavigate()
    let numFilteredCards = SelectedClassInfoStore.filteredCards.length
    let initialValues = new Array(numFilteredCards).fill(false)
    let [showMarkerDescription, setShowMarkerDescription] = useState(initialValues)

    useEffect(() => {
        setShowMarkerDescription(initialValues)
    }, [numFilteredCards])

    function changeMarkerDescriptionVisibility(id, newValue) {
        setShowMarkerDescription(
            showMarkerDescription.map((item, idx) => idx === id ? newValue : item)
        )
    }

    return SelectedClassInfoStore.filteredCards.map((beach, idx) => {
        let iconClasses = {
            "fill-warning": beach.isOpen,
            "fill-danger": !beach.isOpen,
        }

        return (
            <div key={beach.id}>
                <Polygon
                    geometry={beach.polygon[0]}
                    options={{
                        fillColor: beach.isOpen === true ? "#FCC33F" : "#FF4C28",
                        opacity: 0.8,
                        strokeWidth: 0,
                    }}
                />
                <ActivePlacemark
                    geometry={beach.coord}
                    onClick={() => {
                        navigate(`/beach/${beach.code}`)
                    }}
                    // onMouseEnter={(e) => {
                    //     changeMarkerDescriptionVisibility(idx, true)
                    // }}
                    // onMouseLeave={(e) => {
                    //     changeMarkerDescriptionVisibility(idx, false)
                    // }}
                    options={{
                        iconImageSize: [40, 55],
                        iconImageOffset: [-20, -50],
                        iconContentOffset: [-8, -2],
                    }}
                    component={
                        <div
                            className={"relative inline-flex beach-marker font-sans"}
                        >
                            <MarkerIcon className={cc(["w-14 h-14 transition scale-marker", iconClasses])}/>
                            <MarkerPointIcon className={cc(["absolute left-[-1px] top-[-10px]", iconClasses])}/>
                            <div
                                className={"absolute left-[-23px] top-[60px] w-[100px] font-bold text-xs drop-shadow-md shadow-black"}>
                                {beach.name}
                            </div>
                            <BeachMarkerDescription beach={beach} />
                        </div>
                    }
                />
            </div>
        )
    })

})

export default BeachMap