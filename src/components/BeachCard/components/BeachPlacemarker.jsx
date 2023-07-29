import {observer} from "mobx-react-lite";
import cc from "classcat";
import BeachMarkerDescription from "./BeachMarkerDescription";
import {ReactComponent as MarkerIcon} from "../../../assets/icons/Marker.svg";
import {ReactComponent as MarkerPointIcon} from "../../../assets/icons/MarkerPoint.svg";
import MapStore from "../../Map/store/map.store";
import {useNavigate, useSearchParams} from "react-router-dom";

const BeachPlacemarker = observer(({beach}) => {
    const navigate = useNavigate()
    const [queryParameters] = useSearchParams()

    let markerColor = beach.bathingComfortMapColors.marker

    return (
        <div
            className={"relative grid h-[57px] marker_beach cursor-pointer"}
            onClick={() => {navigate(`/beach/${beach.code}?${queryParameters.toString()}`)}}
        >
            <div className={"relative grid justify-items-center"}>
                <MarkerIcon className={cc(["w-12 h-12 transition scale-marker", markerColor])}/>
                <MarkerPointIcon className={cc(["w-2 h-2 relative right-[1px]", markerColor])}/>
            </div>
            <div className={MapStore.markerTextClasses}>
                {beach.name}
            </div>
            {/*<BeachMarkerDescription beach={beach}/>*/}
        </div>
    )
})

export default BeachPlacemarker