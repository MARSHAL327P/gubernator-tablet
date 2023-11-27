import {observer} from "mobx-react-lite";
import {Transition} from "@headlessui/react";
import HeatmapTimelineStore from "../../store/heatmapTimeline.store";
import UiStore from "../../../../stores/ui.store";
import {Button, Tooltip} from "@material-tailwind/react";
import {ReactComponent as Play} from "../../../../assets/icons/Play.svg";
import {ReactComponent as Pause} from "../../../../assets/icons/Pause.svg";
import {ReactComponent as Return} from "../../../../assets/icons/Return.svg";
import dayjs from "dayjs";

const TimelineButtons = observer(() => {
    return (
        <div className={"grid justify-items-center gap-2"}>
            <Transition
                show={HeatmapTimelineStore.differentHourFromNow !== 0}
                {...UiStore.transitionTransformY}
            >
                <Tooltip content={"Вернуться к текущему часу"}>
                    <Button
                        color={"blue"}
                        variant={"filled"}
                        className={"outline-none whitespace-nowrap w-10 h-10 p-0 rounded-full !absolute left-[-19px]"}
                        onClick={HeatmapTimelineStore.goToDate.bind(HeatmapTimelineStore, dayjs())}
                    >
                        <Return className={"fill-white w-3 h-3"}/>
                    </Button>
                </Tooltip>
            </Transition>

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
        </div>
    )
})

export default TimelineButtons