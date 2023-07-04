import {observer} from "mobx-react-lite";
import cc from "classcat";
import BeachMarkerDescription from "./BeachMarkerDescription";
import {ReactComponent as MarkerIcon} from "../../../assets/icons/Marker.svg";
import {ReactComponent as MarkerPointIcon} from "../../../assets/icons/MarkerPoint.svg";
import MapStore from "../../Map/store/map.store";
import BeachLocalStore from "../store/beachLocal.store";

const BeachPlacemarker = observer(({beach}) => {
    let markerColor = BeachLocalStore.bathingComfortMapColors(beach).marker

    return (
        <div className={"relative inline-flex hover-marker"}>
            <MarkerIcon className={cc(["w-14 h-14 transition scale-marker", markerColor])}/>
            <MarkerPointIcon className={cc(["absolute left-[-1px] top-[-10px]", markerColor])}/>
            <div className={MapStore.markerTextClasses}>
                {beach.name}
            </div>
            <BeachMarkerDescription beach={beach}/>
        </div>
    )
})

export default BeachPlacemarker