import {observer} from "mobx-react-lite";
import MapStore from "../../Map/store/map.store";
import GlobalStore from "../../../stores/global.store";
import React, {useEffect, useRef} from "react";
import {Spinner} from "@material-tailwind/react";
import HeatmapStore from "../store/heatmap.store";

const HeatmapLayers = observer(() => {
    const {
        YMapListener,
        YMapTileDataSource,
        YMapLayer,
        YMapMarker,
    } = MapStore.mapData

    let currentValueMarker = useRef(null)

    useEffect(() => {
        if (currentValueMarker.current)
            HeatmapStore.findCurrentValue("marker", currentValueMarker.current)
    }, [HeatmapStore.indicationData]);

    return HeatmapStore.selectedAdditionalLayer && (
        <>
            <YMapTileDataSource
                id={"tileGeneratorSource"}
                raster={{
                    type: "tileGeneratorSource",
                    fetchTile: GlobalStore.generateNewHeatmap ? HeatmapStore.fetchTile.bind(HeatmapStore) : HeatmapStore.fetchTile,
                }}
            />
            <YMapLayer
                zIndex={1300}
                id={"tileGeneratorSource"}
                source={"tileGeneratorSource"}
                type={"tileGeneratorSource"}
            />
            <YMapListener layer={"any"} onFastClick={HeatmapStore.findCurrentValue.bind(HeatmapStore)}/>
            {
                HeatmapStore.currentValue && (
                    <YMapMarker ref={currentValueMarker} draggable mapFollowsOnDrag
                                coordinates={HeatmapStore.currentValue?.coord}>
                        <div
                            onMouseMove={() => {
                                HeatmapStore.findCurrentValue("marker", currentValueMarker.current)
                            }}
                            className={"grid cursor-move justify-items-center absolute top-[-42px] -translate-x-2/4"}
                        >
                            <div className={"bg-white rounded-full px-3 py-1 whitespace-nowrap shadow-lg"}>
                                {
                                    HeatmapStore.currentValue.value === undefined ?
                                        "Нет результатов" :
                                        HeatmapStore.currentValue.value === null ?
                                            <Spinner/> :
                                            HeatmapStore.currentValueText

                                }
                            </div>
                            <div className="w-fit overflow-hidden inline-block relative top-[-2px]">
                                <div className="shadow-lg z-50 h-3 w-[18px] bg-white
                                                -rotate-45 transform origin-top-left"></div>
                            </div>
                        </div>

                    </YMapMarker>
                )
            }
        </>
    )
})

export default HeatmapLayers