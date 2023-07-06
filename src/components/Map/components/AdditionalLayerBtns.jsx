import {observer} from "mobx-react-lite";
import {Button, Spinner} from "@material-tailwind/react";
import cc from "classcat";
import MapStore from "../store/map.store";

const AdditionalLayerBtns = observer(() => {
    if( !MapStore.ymaps ) return

    return (
        <div className={"flex gap-5 absolute bottom-5 right-5 z-10"}>
            {
                Object.values(MapStore.additionalLayers).map((additionalLayer) => {
                    let indication = additionalLayer.indicationData
                    let Icon = indication.icon
                    let isSelected = MapStore.additionalLayers[indication.indicationName].selected

                    return (
                        <Button
                            key={indication.id}
                            color={isSelected ? "blue" : "white"}
                            variant={"filled"}
                            className={
                                cc({
                                    "outline-none whitespace-nowrap": true,
                                })
                            }
                            onClick={() => {
                                MapStore.selectAdditionalLayer(indication.indicationName)
                            }}
                        >
                            {
                                additionalLayer.isLoading ?
                                    <Spinner className={"spinner_white"} /> :
                                    <Icon className={cc({
                                        "fill-black": !isSelected,
                                        "fill-white": isSelected,
                                    })}/>
                            }

                            {indication.name}
                        </Button>
                    )
                })
            }
        </div>
    )
})

export default AdditionalLayerBtns