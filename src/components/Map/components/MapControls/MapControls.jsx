import {observer} from "mobx-react-lite";
import AdditionalLayerBtns from "./AdditionalLayerBtns";
import LockScaleNotification from "./LockScaleNotification";
import BathingComfortGradeBlock from "./BathingComfortGradeBlock";
import HeatmapGradeBlock from "../Layers/HeatmapGradeBlock";
import {Fragment} from "react";
import useWindowSize from "../../../../hooks/useWindowSize";
import cc from "classcat";
import DashboardStore from "../../../Dashboard/store/dashboard.store";

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
        <div className={cc(["absolute bottom-5 right-5 z-10 grid gap-5 justify-items-end", {
            "lg:bottom-40": !DashboardStore.isDashboard(),
        }])}>
            {
                components.map((component, idx) => <Fragment key={idx}>{component}</Fragment>)
            }
        </div>
    )
})

export default MapControls