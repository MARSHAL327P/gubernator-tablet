import {observer} from "mobx-react-lite";
import {
    Button,
    Spinner,
    Tooltip
} from "@material-tailwind/react";
import cc from "classcat";
import MobileHeatmapLayerBtns from "./MobileHeatmapLayerBtns";
import HeatmapTimeline from "./HeatmapTimeline";
import HeatmapStore from "../store/heatmap.store";

const HeatmapLayerBtns = observer(() => {
    return (
        window.outerWidth > 1024 ?
            <div className={"flex gap-5"}>
                <HeatmapTimeline/>
                {
                    Object.values(HeatmapStore.additionalLayers).map((additionalLayer) => {
                        let indication = additionalLayer.indicationData
                        let Icon = indication.icon
                        let isSelected = additionalLayer.selected

                        return (
                            <Tooltip key={indication.id} content={indication.name}>
                                <Button
                                    color={isSelected ? "blue" : "white"}
                                    variant={"filled"}
                                    className={"outline-none whitespace-nowrap w-14 h-14 p-4"}
                                    onClick={() => {
                                        HeatmapStore.selectAdditionalLayer(indication.indicationName)
                                    }}
                                >
                                    {
                                        additionalLayer.isLoading ?
                                            <Spinner className={"spinner_white"}/> :
                                            <Icon className={cc({
                                                "fill-black": !isSelected,
                                                "fill-white": isSelected,
                                            })}/>
                                    }
                                </Button>
                            </Tooltip>
                        )
                    })
                }
            </div> :
            <MobileHeatmapLayerBtns/>
    )
})

export default HeatmapLayerBtns