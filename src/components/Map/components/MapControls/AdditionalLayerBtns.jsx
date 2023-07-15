import {observer} from "mobx-react-lite";
import {
    Button,
    Spinner,
    Tooltip
} from "@material-tailwind/react";
import cc from "classcat";
import MapStore from "../../store/map.store";
import useWindowSize from "../../../../hooks/useWindowSize";
import MobileAdditionalLayerBtns from "./MobileAdditionalLayerBtns";

const AdditionalLayerBtns = observer(() => {
    if (!MapStore.ymaps) return
    let [width] = useWindowSize()

    return (
        width > 1024 ?
            <div className={"flex gap-5"}>
                {
                    Object.values(MapStore.additionalLayers).map((additionalLayer) => {
                        let indication = additionalLayer.indicationData
                        let Icon = indication.icon
                        let isSelected = MapStore.additionalLayers[indication.indicationName].selected

                        return (
                            <Tooltip key={indication.id} content={indication.name}>
                                <Button
                                    color={isSelected ? "blue" : "white"}
                                    variant={"filled"}
                                    className={"outline-none whitespace-nowrap w-14 h-14 p-4"}
                                    onClick={() => {
                                        MapStore.selectAdditionalLayer(indication.indicationName)
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
            <MobileAdditionalLayerBtns/>
    )
})

export default AdditionalLayerBtns