import {observer} from "mobx-react-lite";
import {ReactComponent as Play} from "../../../assets/icons/Play.svg";
import {ReactComponent as Pause} from "../../../assets/icons/Pause.svg";
import {Button} from "@material-tailwind/react";
import MapStore from "../../Map/store/map.store";
import cc from "classcat";
import {capitalizeFirstLetter} from "../../../Utils";
import HeatmapTimelineStore from "../store/heatmapTimeline.store";
import {runInAction} from "mobx";

const HeatmapTimeline = observer(() => {
    return MapStore.selectedAdditionalLayer && (
        <div className={"flex items-center gap-5"}>
            <Button
                color={"white"}
                variant={"filled"}
                className={"outline-none whitespace-nowrap w-14 h-14 p-4 rounded-full"}
                onClick={HeatmapTimelineStore.toggleTimelineAnimation.bind(HeatmapTimelineStore)}
            >
                {
                    HeatmapTimelineStore.animationStarted ?
                        <Pause/> :
                        <Play className={"ml-[2px]"}/>
                }
            </Button>
            <div className={"grid relative w-[990px] shadow-lg rounded-xl"}
                 ref={ref => runInAction(() => {
                     if (ref)
                         HeatmapTimelineStore.lineWidthRef = ref
                 })}>
                <div
                    className={cc([MapStore.blurBackgroundClasses,
                        "py-2 px-3 text-sm absolute top-[-50px] whitespace-nowrap shadow-none"
                    ])}
                    style={{left: (HeatmapTimelineStore.widthElapsedTime - 88) + "px"}}
                >
                    <div className={cc(["absolute top-[37px] left-[calc(50%-5px)] " +
                    "w-0 h-0 " +
                    "border-l-[7px] border-l-transparent " +
                    "border-t-[10px] border-t-white " +
                    "border-r-[7px] border-r-transparent"])}></div>
                    {HeatmapTimelineStore.formattedData}
                </div>
                <div className={"flex h-[60px] overflow-hidden rounded-xl relative"}>
                    <div className={"absolute top-0 left-0 h-full flex"}>
                        <div
                            className={"bg-primary h-full transition"}
                            style={{width: HeatmapTimelineStore.widthElapsedTime + "px"}}
                        ></div>
                        <div className={"bg-warning w-[4px] h-full right-0"}></div>
                        <div
                            className={"bg-danger w-[4px] h-full absolute"}
                            style={{left: (HeatmapTimelineStore.widthElapsedTime) + "px"}}
                        ></div>
                    </div>
                    <div className={"bg-gray-200 w-full h-full"}></div>
                    <div
                        className={"absolute bottom-0 flex [&>*:last-child]:border-r-0 " +
                            "w-full h-[calc(100%-7px)] bg-white/50 backdrop-blur"}>
                        {
                            HeatmapTimelineStore.days.map(day => (
                                <div key={day}
                                     className={"flex-1 flex justify-center items-center h-full self-center text-center border-r-2 border-gray-200"}>
                                    {capitalizeFirstLetter(day)}
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
    )
})

export default HeatmapTimeline