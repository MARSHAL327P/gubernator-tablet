import {observer} from "mobx-react-lite";
import cc from "classcat";
import BeachMarkerDescription from "./BeachMarkerDescription";
import {ReactComponent as MarkerIcon} from "../../../assets/icons/Marker.svg";
import {ReactComponent as MarkerPointIcon} from "../../../assets/icons/MarkerPoint.svg";
import MapStore from "../../Map/store/map.store";

const BeachPlacemarker = observer(({beach}) => {
    let iconClasses = {
        "fill-warning": beach.isOpen,
        "fill-danger": !beach.isOpen,
    }

    return (
        <div className={"relative inline-flex hover-marker"}>
            <MarkerIcon className={cc(["w-14 h-14 transition scale-marker", iconClasses])}/>
            <MarkerPointIcon className={cc(["absolute left-[-1px] top-[-10px]", iconClasses])}/>
            <div className={MapStore.markerTextClasses}>
                {beach.name}
            </div>
            <BeachMarkerDescription beach={beach}/>
        </div>
    )
})

export default BeachPlacemarker