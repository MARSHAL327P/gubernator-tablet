import {observer} from "mobx-react-lite";
import {
    IconButton,
    SpeedDial, SpeedDialAction,
    SpeedDialContent,
    SpeedDialHandler,
    Spinner,
    Typography
} from "@material-tailwind/react";
import cc from "classcat";
import MapStore from "../../Map/store/map.store";
import {ReactComponent as Layer} from '../../../assets/icons/Layer.svg'
import {useState} from "react";
import {XMarkIcon} from "@heroicons/react/24/solid";
import HeatmapStore from "../store/heatmap.store";

const MobileHeatmapLayerBtns = observer(() => {
    const [open, setOpen] = useState(false);

    let additionalLayers = Object.values(HeatmapStore.additionalLayers)
    let isLoading = additionalLayers.filter(item => item.isLoading)

    return (
        <SpeedDial placement={"top"} open={open}>
            <SpeedDialHandler onClick={() => {
                setOpen(open => !open)
            }} className={"shadow-lg"}>
                <IconButton size="lg" color={"white"} className="rounded-full">
                    {
                        isLoading.length > 0 ?
                            <Spinner/> :
                            open ?
                                <XMarkIcon className={"w-5 h-5"}/> :
                                <Layer className="h-5 w-5 transition-transform"/>
                    }
                </IconButton>
            </SpeedDialHandler>
            <SpeedDialContent>
                {
                    Object.values(HeatmapStore.additionalLayers).map((additionalLayer) => {
                        let indication = additionalLayer.indicationData
                        let Icon = indication.icon
                        let isSelected = HeatmapStore.additionalLayers[indication.indicationName].selected

                        return (
                            <SpeedDialAction key={indication.id} className={cc({
                                "bg-primary": isSelected,
                                "bg-white": !isSelected,
                                "p-3 shadow-lg": true
                            })}>
                                <div onClick={() => {
                                    HeatmapStore.selectAdditionalLayer(indication.indicationName)
                                    setOpen(false)
                                }}>
                                    <Icon className={cc({
                                        "w-7 h-7": true,
                                        "fill-black": !isSelected,
                                        "fill-white": isSelected,
                                    })}/>
                                    <Typography
                                        variant={"small"}
                                        className={cc({
                                            "p-2 shadow-lg whitespace-nowrap rounded-md absolute top-2/4 -translate-y-2/4 right-16 font-normal": true,
                                            "bg-primary text-white": isSelected,
                                            "bg-white": !isSelected,
                                        })}
                                    >
                                        {indication.name}
                                    </Typography>
                                </div>

                            </SpeedDialAction>
                        )
                    })
                }
            </SpeedDialContent>
        </SpeedDial>
    )
})

export default MobileHeatmapLayerBtns