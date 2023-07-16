import {observer} from "mobx-react-lite";
import AdditionalLayerBtns from "./AdditionalLayerBtns";
import LockScaleNotification from "./LockScaleNotification";
import BathingComfortGradeBlock from "./BathingComfortGradeBlock";
import HeatmapGradeBlock from "./HeatmapGradeBlock";
import {Fragment} from "react";
import useWindowSize from "../../../../hooks/useWindowSize";
import cc from "classcat";
import DashboardStore from "../../../Dashboard/store/dashboard.store";
import BathingComfortModal from "./BathingComfortModal";
import SidebarStore from "../../../Sidebar/store/sidebar.store";

const MapControls = observer((
    {
        components = [
            <BathingComfortGradeBlock/>,
            <HeatmapGradeBlock/>,
            <LockScaleNotification/>,
            <AdditionalLayerBtns/>
        ],
        classes = ""
    }
) => {

    return (
        <div className={cc([classes, "absolute bottom-5 right-5 lg:right-2  grid gap-5 lg:gap-2 justify-items-end", {
            "lg:bottom-[160px]": !DashboardStore.isDashboard(),
            "z-30": SidebarStore.mobileHideCards,
            "z-10": !SidebarStore.mobileHideCards,
        }])}>
            {
                components.map((component, idx) => <Fragment key={idx}>{component}</Fragment>)
            }
        </div>
    )
})

export default MapControls