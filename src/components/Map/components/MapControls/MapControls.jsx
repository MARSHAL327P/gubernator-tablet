import {observer} from "mobx-react-lite";
import AdditionalLayerBtns from "./AdditionalLayerBtns";
import LockScaleNotification from "./LockScaleNotification";
import BathingComfortGradeBlock from "./BathingComfortGradeBlock";
import HeatmapGradeBlock from "../Layers/HeatmapGradeBlock";
import {Fragment} from "react";

const MapControls = observer((
    {
        components = [
            <BathingComfortGradeBlock/>,
            <HeatmapGradeBlock/>,
            <LockScaleNotification/>,
            <AdditionalLayerBtns/>
        ]
    }
) => {
    return (
        <div className={"absolute bottom-5 lg:bottom-40 right-5 z-10 grid gap-5 justify-items-end"}>
            {
                components.map((component, idx) => <Fragment key={idx}>{component}</Fragment>)
            }
        </div>
    )
})

export default MapControls