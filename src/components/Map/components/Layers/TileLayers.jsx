import {observer} from "mobx-react-lite";
import MapStore from "../../store/map.store";
import GlobalStore from "../../../../stores/global.store";
import React, {useRef} from "react";

const TileLayers = observer(() => {
    const {
        YMapListener,
        YMapTileDataSource,
        YMapLayer,
        YMapMarker,
    } = MapStore.mapData

    let currentValueMarker = useRef(null)

    return MapStore.selectedAdditionalLayer && (
        <>
            <YMapTileDataSource
                id={"tileGeneratorSource"}
                raster={{
                    type: "tileGeneratorSource",
                    fetchTile: GlobalStore.generateNewHeatmap ? MapStore.fetchTile.bind(MapStore) : MapStore.fetchTile,
                }}
            />
            <YMapLayer
                zIndex={1300}
                id={"tileGeneratorSource"}
                source={"tileGeneratorSource"}
                type={"tileGeneratorSource"}
            />
            <YMapListener layer={"any"} onFastClick={MapStore.findCurrentValue.bind(MapStore)}/>
            {/*{*/}
            {/*    MapStore.currentValue && (*/}
            {/*        <YMapMarker ref={currentValueMarker} draggable mapFollowsOnDrag coordinates={MapStore.currentValue.coord}>*/}
            {/*            <div*/}
            {/*                onMouseEnter={() => {*/}
            {/*                    console.log("enter")*/}
            {/*                }}*/}
            {/*                onMouseMove={(e) => {*/}
            {/*                    MapStore.findCurrentValue("marker", currentValueMarker.current)*/}
            {/*                    // console.log(e)*/}
            {/*                    // console.log(MapStore.currentValue.coord)*/}
            {/*                    // console.log(currentValueMarker.current.coordinates)*/}
            {/*                    // console.log("move")*/}
            {/*                }}*/}
            {/*                onMouseLeave={() => {*/}
            {/*                    console.log("leave")*/}
            {/*                }}*/}
            {/*                className={"grid justify-items-center absolute top-[-42px] -translate-x-2/4"}*/}
            {/*            >*/}
            {/*                <div className={"bg-white rounded-full px-3 py-1 whitespace-nowrap shadow-lg"}>*/}
            {/*                    {MapStore.currentValueText}*/}
            {/*                </div>*/}
            {/*                <div className="w-fit overflow-hidden inline-block relative top-[-2px]">*/}
            {/*                    <div className="shadow-lg z-50 h-3 w-[18px] bg-white*/}
            {/*                                    -rotate-45 transform origin-top-left"></div>*/}
            {/*                </div>*/}
            {/*            </div>*/}

            {/*        </YMapMarker>*/}
            {/*    )*/}
            {/*}*/}
        </>
    )
})

export default TileLayers