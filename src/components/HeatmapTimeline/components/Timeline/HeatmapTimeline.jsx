import {observer} from "mobx-react-lite";

import MapStore from "../../../Map/store/map.store";
import cc from "classcat";
import {capitalizeFirstLetter} from "../../../../Utils";
import HeatmapTimelineStore from "../../store/heatmapTimeline.store";
import {runInAction} from "mobx";
import HeatmapStore from "../../store/heatmap.store";
import UiStore from "../../../../stores/ui.store";
import {Transition} from "@headlessui/react";
import {useEffect, useRef, useState} from "react";
import TimelineButtons from "./TimelineButtons";

const HeatmapTimeline = observer(() => {
    let dateRef = useRef(null)
    let dateHoveredRef = useRef(null)
    let [dateTooltipLeftOffset, setDateTooltipLeftOffset] = useState(0)

    useEffect(() => {
        setDateTooltipLeftOffset(dateRef.current?.clientWidth / 2)
    }, [dateRef.current]);

    return HeatmapStore.selectedAdditionalLayer && (
        <div className={"flex items-end gap-5"}>
            <TimelineButtons/>

            <div className={"grid relative w-[990px] shadow-lg rounded-xl select-none"}
                 ref={ref => runInAction(() => {
                     if (ref)
                         HeatmapTimelineStore.lineWidthRef = ref
                 })}
            >
                <div
                    ref={dateRef}
                    className={cc([MapStore.blurBackgroundClasses,
                        "py-2 px-3 text-sm absolute top-[-50px] whitespace-nowrap shadow-none"
                    ])}
                    style={{left: HeatmapTimelineStore.widthElapsedTime - dateTooltipLeftOffset + "px"}}
                >
                    <div className={cc(["absolute top-[37px] left-[calc(50%-5px)] " +
                    "w-0 h-0 " +
                    "border-l-[7px] border-l-transparent " +
                    "border-t-[10px] border-t-white " +
                    "border-r-[7px] border-r-transparent"])}></div>
                    {HeatmapTimelineStore.formattedDate}
                </div>

                <Transition
                    show={HeatmapTimelineStore.isHovered}
                    {...UiStore.transitionOpacity}
                >
                    <div
                        ref={dateHoveredRef}
                        className={cc(["py-2 px-3 text-sm absolute top-[-50px] whitespace-nowrap shadow-none " +
                        "z-20 bg-warning shadow-lg rounded-xl border-2 border-warning"])}
                        style={{left: (HeatmapTimelineStore.hoverDistance - (dateHoveredRef.current?.clientWidth / 2)) + "px"}}
                    >
                        <div className={cc(["absolute top-[37px] left-[calc(50%-5px)] " +
                        "w-0 h-0 " +
                        "border-l-[7px] border-l-transparent " +
                        "border-t-[10px] border-t-warning " +
                        "border-r-[7px] border-r-transparent"])}></div>
                        {HeatmapTimelineStore.formattedHoveredDate}
                    </div>
                </Transition>

                <div className={"flex h-[60px] overflow-hidden rounded-xl relative hover:cursor-pointer"}
                     onMouseEnter={HeatmapTimelineStore.onTimelineMouseEnter.bind(HeatmapTimelineStore)}
                     onMouseLeave={HeatmapTimelineStore.onTimelineMouseLeave.bind(HeatmapTimelineStore)}
                     onMouseMove={HeatmapTimelineStore.onTimelineMouseMove.bind(HeatmapTimelineStore)}
                     onClick={HeatmapTimelineStore.goToDate.bind(HeatmapTimelineStore, HeatmapTimelineStore.hoveredDate)}
                     onMouseDown={HeatmapTimelineStore.onTimelineMouseDown.bind(HeatmapTimelineStore)}
                     onMouseUp={HeatmapTimelineStore.onTimelineMouseUp.bind(HeatmapTimelineStore)}
                >
                    <div className={"absolute top-0 left-0 h-full flex"}>
                        <div
                            className={"bg-primary h-full transition"}
                            style={{width: (HeatmapTimelineStore.draggableWidthElapsedTime ?? HeatmapTimelineStore.widthElapsedTime) + "px"}}
                        ></div>
                        <div className={"bg-warning w-[4px] h-full"}></div>
                        <div
                            className={"bg-danger w-[4px] h-full absolute"}
                            style={{left: (HeatmapTimelineStore.leftOffsetToNowHours) + "px"}}
                        ></div>
                        <Transition
                            show={HeatmapTimelineStore.isHovered}
                            {...UiStore.transitionOpacity}
                        >
                            <div className={"bg-warning w-[4px] h-full absolute"}
                                 style={{left: (HeatmapTimelineStore.hoverDistance) + "px"}}
                            ></div>
                        </Transition>

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