import {observer} from "mobx-react-lite";
import cc from "classcat";
import BeachMarkerDescription from "./BeachMarkerDescription";
import {ReactComponent as MarkerIcon} from "../../../assets/icons/Marker.svg";
import {ReactComponent as MarkerPointIcon} from "../../../assets/icons/MarkerPoint.svg";
import MapStore from "../../Map/store/map.store";
import {Popover, PopoverContent, PopoverHandler} from "@material-tailwind/react";

const BeachPlacemarker = observer(({beach}) => {
    let markerColor = beach.bathingComfortMapColors.marker

    return (
        <Popover open={beach.markerDescriptionIsOpen} offset={15} animate={{
            mount: { y: 0 },
            unmount: { y: 25 },
        }}>
            <PopoverHandler>
                <div>
                    <div className={"relative grid justify-items-center"}>
                        <MarkerIcon className={cc(["w-12 h-12 transition scale-marker", markerColor])}/>
                        <MarkerPointIcon className={cc(["w-2 h-2 relative right-[1px]", markerColor])}/>
                    </div>
                    <div className={MapStore.markerTextClasses}>
                        {beach.name}
                    </div>
                </div>
            </PopoverHandler>
            <PopoverContent className={"z-50 p-0 shadow-none border-0 bg-none pointer-events-none lg:pointer-events-auto"}>
                <BeachMarkerDescription beach={beach}/>
            </PopoverContent>
        </Popover>
    )
})

export default BeachPlacemarker