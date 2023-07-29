import {observer} from "mobx-react-lite";
import cc from "classcat";
import BeachMarkerDescription from "./BeachMarkerDescription";
import {ReactComponent as MarkerIcon} from "../../../assets/icons/Marker.svg";
import {ReactComponent as MarkerPointIcon} from "../../../assets/icons/MarkerPoint.svg";
import MapStore from "../../Map/store/map.store";
import {useNavigate, useSearchParams} from "react-router-dom";
import {useState} from "react";
import {Popover, PopoverContent, PopoverHandler} from "@material-tailwind/react";

const BeachPlacemarker = observer(({beach}) => {
    const navigate = useNavigate()
    const [queryParameters] = useSearchParams()

    let [descriptionIsOpen, setDescriptionIsOpen] = useState(false)
    let markerColor = beach.bathingComfortMapColors.marker

    const triggers = {
        onMouseEnter: () => setDescriptionIsOpen(true),
        onMouseLeave: () => setDescriptionIsOpen(false),
    };

    function toBeachPage(){
        navigate(`/beach/${beach.code}?${queryParameters.toString()}`)
    }

    return (
        <div
            className={"relative grid h-[57px] marker_beach cursor-pointer"}
            onClick={toBeachPage}
        >
            <Popover open={descriptionIsOpen} handler={setDescriptionIsOpen} offset={15} animate={{
                mount: { y: 0 },
                unmount: { y: 25 },
            }}>
                <PopoverHandler {...triggers}>
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
                <PopoverContent className={"p-0 shadow-none border-0 bg-none"}>
                    <BeachMarkerDescription beach={beach}/>
                </PopoverContent>
            </Popover>
        </div>
    )
})

export default BeachPlacemarker